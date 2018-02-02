const request = require('request');

let AmpUrl = function (apiKey) {
    this.API_URL = 'https://acceleratedmobilepageurl.googleapis.com/v1/ampUrls:batchGet';
    this.MAX_URLS = 50;
    this.requestData = {
        url: this.API_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey
        },
        json: {
            'urls': []
        }
    };
    this.queue = [];
};

AmpUrl.prototype = {
    /**
     * toCdnAmpUrl
     * @param {string} url - Target original Url.
     * @return {Promise}
     */
    toCdnAmpUrl: function (url) {
        return new Promise((resolve, reject) => {
            this.get(url).then((result) => {
                if (result.hasOwnProperty('urlErrors')) {
                    throw new Error(result.urlErrors[0].errorMessage);
                }

                resolve(result.ampUrls[0].cdnAmpUrl);
            }).catch((error) => {
                reject(error);
            });
        });
    },

    /**
     * get
     * @param {array|string} urls - Target URL.
     * @return {Promise}
     */
    get: function (urls) {
        return new Promise((resolve, reject) => {
            if (typeof urls === 'string') {
                urls = [urls];
            }

            this._setQueue(urls);

            Promise.all(this.queue).then((result) => {
                result = this._mergeResult(result);

                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    },

    /**
     * _mergeResult
     * @param {array} apiData - All values returned from api.
     * @return {array} - Merged result array.
     */
    _mergeResult: function (apiData) {
        let result = {};
        let label = '';

        apiData.forEach((selfData) => {
            for (label in selfData) {
                if (!selfData.hasOwnProperty(label)) {
                    continue;
                }

                result[label] = result[label] || [];

                Array.prototype.push.apply(result[label], selfData[label]);
            }
        });

        return result;
    },

    /**
     * _setQueue
     * @param {array} urls - Target URL.
     * @return {void}
     */
    _setQueue: function (urls) {
        let urlsSet = this._splitUrls(urls);

        this.queue = [];

        urlsSet.forEach((selfUrlsSet) => {
            this.queue.push(new Promise((resolve) => {
                this.requestData.json.urls = selfUrlsSet;

                request(this.requestData, (error, response, body) => {
                    resolve(body);
                });
            }));
        });
    },

    /**
     * _splitUrls
     * @param {array} urls - Target URL.
     * @return {array} - An array of divided URLs for each upper limit number of API.
     */
    _splitUrls: function (urls) {
        let urlLeng = urls.length;
        let leng = Math.ceil(urlLeng / this.MAX_URLS);
        let idx = 0;
        let result = [];

        for (idx; idx < leng; idx++) {
            let startIdx = idx * this.MAX_URLS;

            result.push(urls.slice(startIdx, startIdx + this.MAX_URLS));
        }

        return result;
    }
};

module.exports = AmpUrl;
