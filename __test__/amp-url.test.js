describe('amp-urls', () => {
    const AmpUrl = require('amp-url');
    const ampUrl = new AmpUrl('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

    test('batchGet(urls) - single', () => {
        ampUrl.batchGet('https://www.ampproject.org/').then((cdnAmpUrl) => {
            expect(typeof cdnAmpUrl).toBe('object');
        });
    });

    test('batchGet(urls) - multi', () => {
        ampUrl.batchGet([
            'https://www.ampproject.org/',
            'https://www.ampproject.org/learn/overview/',
            'https://www.ampproject.org/docs/',
            'https://www.ampproject.org/latest/'
        ]).then((cdnAmpUrl) => {
            expect(typeof cdnAmpUrl).toBe('object');
        });
    });
});
