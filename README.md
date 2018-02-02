# amp-url-nodejs

Accelerated Mobile Pages (AMP) URL API node.js library.  
It is necessary to enable API on [Google Cloud Platform](https://cloud.google.com/) and obtain API key.

## Install

```
npm install --save amp-url
```

## Use

```js
const AmpUrl = require('amp-url');
const ampUrl = new AmpUrl(GOOGLE_API_KEY);

ampUrl.toCdnAmpUrl('https://example.com/01.html').then((cdnAmpUrl) => {
    console.log(cdnAmpUrl); // 'https://example-com.cdn.ampproject.org/c/s/example.com/amp/01.html'
}).catch((error) => {
    console.error(error);
});
```

## Method

### toCdnAmpUrl(url)

- url `string` - Target original URL.

```js
const AmpUrl = require('amp-url');
const ampUrl = new AmpUrl(GOOGLE_API_KEY);

ampUrl.toCdnAmpUrl('https://example.com/01.html').then((cdnAmpUrl) => {
    console.log(cdnAmpUrl); // 'https://example-com.cdn.ampproject.org/c/s/example.com/amp/01.html'
}).catch((error) => {
    console.error(error);
});
```

### get(urls)

- urls `array|string` - Target URL.

```js
const fs = require('fs');
const AmpUrl = require('amp-url');
const ampUrl = new AmpUrl(GOOGLE_API_KEY);

ampUrl.get([
    'https://example.com/01.html',
    'https://example.com/02.html',
    'https://example.com/03.html'
]).then((result) => {
    fs.writeFile('./result.json', JSON.stringify(result, null, '\t'));
}).catch((error) => {
    console.error(error);
});
```

Example of result.json.

```json
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
    ...
  ],
  "urlErrors": [
    {
      "errorCode": "URL_IS_INVALID_AMP",
      "errorMessage": "Request URL is an invalid AMP URL.",
      "originalUrl": "https://example.com/03.html"
    }
    ...
  ]
}
```

## License

[MIT License](https://github.com/kmrk/amp-url-nodejs/blob/master/LICENSE).
