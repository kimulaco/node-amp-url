# node-amp-url

[Accelerated Mobile Pages (AMP) URL API](https://developers.google.com/amp/cache/reference/acceleratedmobilepageurl/rest/) node.js library.
It is necessary to enable API on [Google Cloud Platform](https://cloud.google.com/) and obtain API key.

## Install

```shell
npm install --save amp-url
```

## Use

```js
const AmpUrl = require('amp-url');
const ampUrl = new AmpUrl(GOOGLE_API_KEY);

ampUrl.batchGet('https://example.com/01.html').then((cdnAmpUrl) => {
    // cdnAmpUrl
});
```

## Method

### batchGet(urls)

- urls `array|string` - Target URL.

```js
const AmpUrl = require('amp-url');
const ampUrl = new AmpUrl(GOOGLE_API_KEY);

ampUrl.batchGet([
    'https://example.com/01.html',
    'https://example.com/02.html',
    'https://example.com/03.html'
]).then((cdnAmpUrl) => {
    /* Example
    {
      "ampUrls": [
        [
          {
            "originalUrl": "https://example.com/01.html",
            "ampUrl": "https://example.com/amp/01.html",
            "cdnAmpUrl": "https://example-com.cdn.ampproject.org/c/s/example.com/amp/01.html"
          },
          {
            "originalUrl": "https://example.com/02.html",
            "ampUrl": "https://example.com/amp/02.html",
            "cdnAmpUrl": "https://example-com.cdn.ampproject.org/c/s/example.com/amp/02.htmls"
          }
        ]
      ],
      "urlErrors": [
        {
          "errorCode": "URL_IS_INVALID_AMP",
          "errorMessage": "Request URL is an invalid AMP URL.",
          "originalUrl": "https://example.com/03.html"
        }
      ]
    }
    */
});
```

## License

[MIT License](https://github.com/kimulaco/node-amp-url/blob/master/LICENSE).
