/**
 * Call any FTX REST API
 * Docs: https://docs.ftx.com/#authentication
 */

const axios = require('axios').default;
const crypto = require('crypto');
const urlJoin = require('url-join');


class FTXApiClient {
    /**
     * FTX Credential
     * @param {Object} options
     * @param {String} options.api_key api key
     * @param {String} options.api_secret api secret
     * @param {String=} options.subaccount  ftx sub account
     * @returns {FTXApi<>}
     */
    constructor({api_key, api_secret, subaccount = null}) {
        this.api_key = api_key;
        this.api_secret = api_secret;
        this.subaccount = subaccount;
        this.baseAPIUrl = "https://ftx.com/api"
    }

    /**
     * call ftx rest api
     * @param {Object} options
     * @param {String} options.method Rest Api Method (GET POST DELETE PUT)
     * @param {Object=} options.data data to send to remote server (For POST/PUT)
     * @param {Object} options.resource resource to call
     */
    call({method, data = null, resource}) {
      let ts = Date.now();
      let resource_with_api_prefix = urlJoin("/api", resource);

      // making signature data for auth
      let signature_data = `${ts}${method}${resource_with_api_prefix}`;
      if (data) {
        signature_data += JSON.stringify(data);
      }
      console.log(signature_data)
      let signature = crypto.createHmac('sha256', this.api_secret).update(signature_data).digest('hex');

      // auth header 
      const headers = {
        "FTX-KEY": this.api_key,
        "FTX-TS": ts,
        "FTX-SIGN": signature
      }

      if (this.subaccount) {
          headers["FTX-SUBACCOUNT"] = this.subaccount
      }

      return axios({
        method,
        data,
        url: urlJoin(this.baseAPIUrl, resource),
        headers
      })
    } 
}


module.exports = FTXApiClient;


