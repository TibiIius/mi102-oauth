interface TokenPair {
  token: string
  idToken: string
  refreshToken: string
}

export interface LocalStorageOptions {
  tokens: TokenPair | undefined
  timeSkew: number | undefined
}

export class LocalStorageHelper {
  private static TOKENS_ITEM = 'tokens'
  private static TIME_SKEW_ITEM = 'timeSkew'

  public static fromLocalStorage(): LocalStorageOptions {
    const tokens = localStorage.getItem(this.TOKENS_ITEM)
    const timeSkew = localStorage.getItem(this.TIME_SKEW_ITEM)

    return {
      timeSkew: 0,
      tokens: JSON.parse(tokens!) || undefined
    }
  }

  public static toLocalStorage(payload: LocalStorageOptions) {
    localStorage.setItem(this.TOKENS_ITEM, JSON.stringify(payload.tokens))
    localStorage.setItem(this.TIME_SKEW_ITEM, payload.timeSkew!.toString())
  }
}
