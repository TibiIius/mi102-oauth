import axios from 'axios'
import Keycloak from 'keycloak-js'
import { LocalStorageHelper } from './localStorage'

export type TOKEN_TYPE = 'access' | 'refresh'

/**
 * Wrapper class for API calls using axios
 */
export class Api {
  private static CONTENT_TYPE = 'application/json'
  private static BASE_URL = import.meta.env.API_BASE_URL

  /**
   * Used to fetch an API endpoint that requires authorization
   *
   * Tries fetching the token required for authorization from the user store
   *
   * @param {Keycloak} keycloak Keycloak instance used to access tokens
   * @param {string} url The API's endpoint URL ("/api" is prepended)
   * @param {TOKEN_TYPE} [token_type='access'] The token to use, defaults to "access", can be "refresh" aswell, using the user's refresh token
   */
  public static async fetchApiAuthorized<T>(
    keycloak: Keycloak,
    url: string,
    token_type: TOKEN_TYPE = 'access'
  ) {
    this.handleUnauthorized(keycloak)

    return await axios.get<T>(Api.BASE_URL + url, {
      headers: {
        Authorization:
          'Bearer ' + (token_type === 'refresh' ? keycloak.refreshToken! : keycloak.token!)
      }
    })
  }

  /**
   * Fetches from the API without the need of authorization
   *
   * @param {string} url The API's endpoint URL ("/api" is prepended)
   */
  public static async fetchApi<T>(url: string) {
    return axios.get<T>(Api.BASE_URL + url)
  }

  /**
   * Post data to the API using authorization
   *
   * @param {Keycloak} keycloak Keycloak instance used to access tokens
   * @param {string} url The API's endpoint URL ("/api" is prepended)
   * @param data Body's data, needs to be JSON format
   */
  public static async postApiAuthorized<T>(keycloak: Keycloak, url: string, data: any) {
    await this.handleUnauthorized(keycloak)

    return await axios.post<T>(Api.BASE_URL + url, data, {
      headers: {
        'Content-Type': Api.CONTENT_TYPE,
        Authorization: 'Bearer ' + keycloak.token!
      }
    })
  }

  /**
   * Send DELETE request API using authorization
   *
   * @param {Keycloak} keycloak Keycloak instance used to access tokens
   * @param {string} url The API's endpoint URL ("/api" is prepended)
   */
  public static async deleteApiAuthorized<T>(keycloak: Keycloak, url: string) {
    await this.handleUnauthorized(keycloak)

    return await axios.delete<T>(Api.BASE_URL + url, {
      headers: {
        Authorization: 'Bearer ' + keycloak.token!
      }
    })
  }

  /**
   * Post data to the API without the need of authorization tokens (e.g. login/signup)
   *
   * @param {string} url The API's endpoint URL ("/api" is prepended)
   * @param data Body's data, needs to be JSON format
   */
  public static async postApi<T>(url: string, data: any) {
    return axios.post<T>(Api.BASE_URL + url, data, {
      headers: {
        'Content-Type': Api.CONTENT_TYPE
      }
    })
  }

  /**
   * Helper function to acquire a new set of tokens should the access token be invalid
   *
   * @param {Keycloak} keycloak Keycloak instance used to check validity and re-authenticate
   */
  static async handleUnauthorized(keycloak: Keycloak) {
    // If the token is only valid for 10 seconds or less, we try to refresh it, first trying with the refresh token, and checking the session afterwards.
    await keycloak.updateToken(10)

    // Set tokens to localStorage
    LocalStorageHelper.toLocalStorage({
      tokens: {
        token: keycloak.token!,
        idToken: keycloak.idToken!,
        refreshToken: keycloak.refreshToken!
      },
      timeSkew: keycloak.timeSkew!
    })
  }
}
