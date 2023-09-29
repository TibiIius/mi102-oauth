interface TokenPair {
  token: string
  idToken: string
  refreshToken: string
}

export interface LocalStorageOptions {
  tokens: TokenPair | undefined
  timeSkew: number | undefined
}

/**
 * Wrapper class for interacting with the browser's local storage, typing the expected values
 */
export class LocalStorageHelper {
  private static TOKENS_ITEM = 'tokens'
  private static TIME_SKEW_ITEM = 'timeSkew'

  /**
   * Loads known/expected values from the browsers local storage and typing them.
   *
   * @returns {LocalStorageOptions} object containing all the expected local storage entries
   */
  public static fromLocalStorage(): LocalStorageOptions {
    const tokens = localStorage.getItem(this.TOKENS_ITEM)
    const timeSkew = localStorage.getItem(this.TIME_SKEW_ITEM)

    return {
      timeSkew: parseInt(timeSkew!),
      tokens: JSON.parse(tokens!) || undefined
    }
  }

  /**
   * Helps settings the local storage options.
   *
   * @param {LocalStorageOptions} payload Object containing key/value pairs of the new local storage entries
   */
  public static toLocalStorage(payload: LocalStorageOptions) {
    localStorage.setItem(this.TOKENS_ITEM, JSON.stringify(payload.tokens))
    localStorage.setItem(this.TIME_SKEW_ITEM, payload.timeSkew!.toString())
  }
}
