import axios from 'axios'
import Keycloak from 'keycloak-js'

export type TOKEN_TYPE = 'access' | 'refresh'

/**
 * Wrapper class for API calls using axios
 */
export class Api {
  private static CONTENT_TYPE = 'application/json'
  private static BASE_URL = '/api'

  /**
   * Used to fetch an API endpoint that requires authorization
   *
   * Tries fetching the token required for authorization from the user store
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
   */
  public static async fetchApi<T>(url: string) {
    return axios.get<T>(Api.BASE_URL + url)
  }

  /**
   * Post data to the API using authorization
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
   */
  static async handleUnauthorized(keycloak: Keycloak) {
    await keycloak.updateToken(10)
  }
}
