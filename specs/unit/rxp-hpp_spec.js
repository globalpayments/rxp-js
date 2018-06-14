/*
 * Unit tests for rxp-hpp.js
 */
describe('rxp-hpp library', function () {
    /*
     * Unit tests for createFormHiddenInput
     */
    describe('form input creation (createFormHiddenInput)', function () {
        it('creates element', function () {
            var field = RealexHpp._internal.createFormHiddenInput("name", "value");
            expect(field).not.toBe(null);
            expect(field.name).toBe("name");
            expect(field.value).toBe("value");
        });

        it('empty name', function () {
            var field = RealexHpp._internal.createFormHiddenInput("", "value");
            expect(field).not.toBe(null);
            expect(field.name).toBe("");
            expect(field.value).toBe("value");
        });

        it('empty value', function () {
            var field = RealexHpp._internal.createFormHiddenInput("name", "");
            expect(field).not.toBe(null);
            expect(field.name).toBe("name");
            expect(field.value).toBe("");
        });

        it('empty name and value', function () {
            var field = RealexHpp._internal.createFormHiddenInput("", "");
            expect(field).not.toBe(null);
            expect(field.name).toBe("");
            expect(field.value).toBe("");
        });
    });

    /*
     * Unit tests for checkDevicesOrientation
     */
    describe('device orientation (checkDevicesOrientation)', function () {
        it('0', function () {
            window.orientation = 0;
            var orientation = RealexHpp._internal.checkDevicesOrientation();
            expect(orientation).toBe(false);
        });

        it('90', function () {
            window.orientation = 90;
            var orientation = RealexHpp._internal.checkDevicesOrientation();
            expect(orientation).toBe(true);
        });

        it('180', function () {
            window.orientation = 180;
            var orientation = RealexHpp._internal.checkDevicesOrientation();
            expect(orientation).toBe(false);
        });

        it('-90', function () {
            window.orientation = -90;
            var orientation = RealexHpp._internal.checkDevicesOrientation();
            expect(orientation).toBe(true);
        });
    });

    /*
     * Unit tests for createOverlay
     */
    describe('lightbox overlay (createOverlay)', function () {
        it('creates an overlay', function () {
            var overlay = RealexHpp._internal.createOverlay();
            expect(overlay).not.toBe(null);
            expect(overlay.getAttribute('id')).toMatch(/rxp\-overlay\-/);

            var injectedOverlay = document.getElementById(overlay.getAttribute('id'));
            expect(overlay).toBe(injectedOverlay);
        });
    });

    /*
     * Unit tests for createCloseButton
     */
    describe('lightbox overlay close button (createCloseButton)', function () {
        it('creates an overlay', function () {
            var overlay = RealexHpp._internal.createOverlay();
            expect(overlay).not.toBe(null);

            var close = RealexHpp._internal.createCloseButton(overlay);
            expect(close).not.toBe(null);
            expect(close.getAttribute('id')).toMatch(/rxp\-frame\-close\-/);
        });
    });

    /*
     * Unit tests for createForm
     */
    describe('request form(createForm)', function () {
        it('creates form with no extra data', function () {
            var form = RealexHpp._internal.createForm(document, {});
            expect(form).not.toBe(null);
            expect(form.children.length).toBe(3);
        });

        it('creates redirect form with no extra data', function () {
            var form = RealexHpp._internal.createForm(document, {}, true);
            expect(form).not.toBe(null);
            expect(form.children.length).toBe(2);
        });

        it('creates form with extra data', function () {
            var form = RealexHpp._internal.createForm(document, {NAME: 'value'});
            expect(form).not.toBe(null);
            expect(form.children.length).toBe(4);
        });

        it('creates redirect form with extra data', function () {
            var form = RealexHpp._internal.createForm(document, {NAME: 'value'}, true);
            expect(form).not.toBe(null);
            expect(form.children.length).toBe(3);
        });
    });

    /*
     * Unit tests for createSpinner
     */
    describe('lightbox load indicator (createSpinner)', function () {
        it('creates an image', function () {
            var spinner = RealexHpp._internal.createSpinner();
            expect(spinner).not.toBe(null);
            expect(spinner.getAttribute('id')).toMatch(/rxp\-loader\-/);
        });
    });

    /*
     * Unit tests for getUrlParser
     */
    describe('url parsing (getUrlParser)', function () {
        var testUrl = 'http://hostname.com/path?query=true';

        it('parses url', function () {
            var url = RealexHpp._internal.getUrlParser(testUrl);
            expect(url).not.toBe(null);
            expect(url.hostname).toBe('hostname.com');
            expect(url.pathname).toBe('/path');
        });
    });

    /*
     * Unit tests for getHostnameFromUrl
     */
    describe('url parsing (getHostnameFromUrl)', function () {
        var testUrl = 'http://hostname.com/path?query=true';

        it('parses hostname', function () {
            var host = RealexHpp._internal.getHostnameFromUrl(testUrl);
            expect(host).toBe('hostname.com');
        });
    });


    /*
     * Unit tests for getHostnameFromUrl
     */
    describe('url parsing (getHostnameFromUrl)', function () {
        var testUrl = 'http://hostname.com/path?query=true';

        it('same host returns true', function () {
            var host = RealexHpp._internal.isMessageFromHpp(testUrl, testUrl);
            expect(host).toBe(true);
        });

        it('different hosts return false', function () {
            var host = RealexHpp._internal.isMessageFromHpp(testUrl, '#');
            expect(host).toBe(false);
        });
    });
});
