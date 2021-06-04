// @flow
import axios from "axios";
import i18n from "i18next";
import qs from "qs";

// make ESLint and Flow happy
/* global globalConfig  */
declare var globalConfig: { token: string };

/**
 * API calls utility
 */
class ApiCore {

    baseUrl: string;
    token: ?string;

    constructor() {
        this.baseUrl = "/";
        this.token = ((typeof globalConfig !== "undefined") && globalConfig.token) ? globalConfig.token : null;
    }

    setBaseUrl(url: string) {
        this.baseUrl = url;
    }

    getBaseUrl() {
        return this.baseUrl;
    }

    setToken(token: string) {
        this.token = token;
    }

    getToken() {
        return this.token;
    }

    /**
     * Handles all errors
     * @throws  ApiError
     * @param   error   Object
     * @param   config  Object
     * @param   url string
     */
    handleErrors(error: Object, config: Object, url: string) { // eslint-disable-line

        const t = i18n.t.bind(i18n);
        let msg = "",
            code = null;

        if (error.errorCode) {
            msg = t("API call failed, application returned the error: ") + `[${error.errorCode}] "${error.message}"`;
            code = error.errorCode;

        } else if (error.response) {
            msg = t("Action failed, server returned the error:");

            if (error.response.data && error.response.data.message) {
                msg += " " + error.response.data.message;
            } else {
                msg += ` [${error.response.status}] "${error.response.statusText}"`;
            }

            code = error.response.status;

        } else if (error.request) {
            msg = i18n.t("API call failed, no reply from the server.");
            code = 0;

        } else {
            msg = t("API call failed with error: ") +  (error.message ? error.message : "No response") + ".";
            code = -1;
        }

        throw new ApiError(msg, code, error);
    }

    /**
     * Send HTTP request
     * @param   method  string
     * @param   url     string
     * @param   config  Object
     * @returns Promise
     */
    sendRequest(method: string, url: string, config: Object): Promise<any> {

        if ( ! config.headers) {
            config.headers = {};
        }

        // add CSRF Header
        // if (this.token) {
        //     if ( ! config.headers["X-CSRF-TOKEN"]) {
        //         config.headers["X-CSRF-TOKEN"] = this.token;
        //     }
        // }

        // add X-Requested-With for ajax calls
        if (config.headers["X-Requested-With"] === undefined) {
            config.headers["X-Requested-With"] = "XMLHttpRequest";
        }

        if (config.params) {
            config.params.ruid = Math.floor(Date.now() / 1000) + "" + Math.floor(Math.random() * 100000000);
        }

        return axios({
            method,
            url,
            baseURL: this.baseUrl,
            ...config,
        })
            .then(response => response.data) // return data
            .then(responseData => {

                return responseData; // return the data
            })
            .catch( error => {
                this.handleErrors(error, config, url); // handle http responses other than 2xx
            });
    }

    /**
     * GET request
     * @param   url     string
     * @param   payload Object
     * @returns {Promise<any>}
     */
    get(url: string, payload: Object = {},headers) {

        let config;
        if(headers !== undefined) {
            config = {
                data:payload,
                headers
            }
        
        }else{
            config = {
                data:payload
            }
        }

        return this.sendRequest("get", url, config);
    }

    /**
     * POST request
     * @param url
     * @param payload
     * @returns {Promise<any>}
     */
    post(url: string, payload: Object) {
        return this.sendRequest("post", url, {
            headers: {"content-type": "application/x-www-form-urlencoded"},
            data: qs.stringify(payload),
        });
    }

    /**
     * PUT request
     * @param url
     * @param payload
     * @returns {Promise<any>}
     */
    put(url: string, payload: Object) {
        return this.sendRequest("put", url, {
            headers: {"content-type": "application/x-www-form-urlencoded"},
            data: qs.stringify(payload),
        });
    }

    /**
     * POST request with JSON body
     * @param url
     * @param payload
     * @returns {Promise<any>}
     */
    jsonPost(url: string, payload: Object,headers) {
        let config;
        if(headers !== undefined) {
            config = {
                data:payload,
                headers
            }
        
        }else{
            config = {
                data:payload
            }
        }
        return this.sendRequest("post", url, config);
    }
}

export default ApiCore;

/**
 * API Error
 */
export class ApiError extends Error {

    // make flow happy by explicitly declaring the class property
    errorCode: ?number;
    errorInfo: ?Object;

    constructor(message: string = "Api Error", errorCode: ?number = null, errorObj: ?Object = null, ...params: any) {

        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(message, ...params);

        // reset the name
        this.name = "ApiError";

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }

        // Custom debugging information
        this.errorCode = errorCode;
        this.errorInfo = errorObj;
    }
}


