const request = require('request');

const splitUrls = function (urls, max) {
    let leng = Math.ceil(urls.length / max);
    let idx = 0;
    let result = [];

    for (idx; idx < leng; idx++) {
        let startIdx = idx * max;

        result.push(urls.slice(startIdx, startIdx + max));
    }

    return result;
};

const mergeResponse = function (responseList) {
    let result = {};
    let label = '';

    responseList.forEach((selfResponse) => {
        for (label in selfResponse) {
            if (!selfResponse.hasOwnProperty(label)) {
                continue;
            }

            result[label] = result[label] || [];

            Array.prototype.push.apply(result[label], selfResponse[label]);
        }
    });

    return result;
};

let AmpUrl = function (apiKey) {
    this.MAX_URLS = 50;
    this.requestData = {
        url: 'https://acceleratedmobilepageurl.googleapis.com/v1/ampUrls:batchGet',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey
        },
        json: {
            'urls': []
        }
    };
};

AmpUrl.prototype = {
    /**
     * batchGet
     * @param {array|string} urls - Target URL.
     * @return {Promise}
     */
    batchGet: function (urls) {
        if (typeof urls === 'string') {
            urls = [urls];
        }

        let urlsSet = splitUrls(urls, this.MAX_URLS);
        let queue = [];

        urlsSet.forEach((selfUrlsSet) => {
            queue.push(new Promise((resolve) => {
                let option = Object.assign(this.requestData, {
                    json: {
                        urls: selfUrlsSet
                    }
                });

                request(option, (error, response, body) => {
                    resolve(body);
                });
            }));
        });

        return Promise.all(queue).then((result) => {
            return mergeResponse(result);
        });
    }
};

module.exports = AmpUrl;
