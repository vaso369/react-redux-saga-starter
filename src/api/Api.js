// @flow
import ApiCore from './ApiCore'

/**
 * All API End-points
 */
class Api {
  api: ApiCore

  constructor(baseUrl: string = '', token: string = '') {
    this.api = new ApiCore()

    if (baseUrl) {
      this.api.setBaseUrl(baseUrl)
    }

    if (token) {
      this.api.setToken(token)
    }
  }

  test = () => {
    return this.api
      .get('https://jsonplaceholder.typicode.com/users')
  }

  // PLACE ALL API CALLS HERE
}

export default Api
