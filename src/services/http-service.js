export class HttpService {

  /**
   * @param {string} url
   * @param {RequestInit} opts
   */
  static async jsonRequest(url, opts = {}) {
    const response = await fetch(url, opts);

    return await response.json();
  }

}
