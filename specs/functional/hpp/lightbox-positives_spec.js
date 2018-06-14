define(function (require) {
  var bdd = require('intern!bdd');
  var assert = require('intern/chai!assert');
  var successHelper = require('intern/dojo/node!../../helpers/hpp').iframeSuccessHelper;

  bdd.describe('RealexRemote - HPP Lightbox Positive Tests', function () {
    bdd.it('should process a payment successfully',
      successHelper(
        // url
        require.toUrl('http://localhost:8989/examples/hpp/process-a-payment-lightbox.html'),
        // iframe selector
        '[id^="rxp-frame-"]',
        // fields to enter
        [
          { name: 'pas_ccnum', type: 'text', value: '4111111111111111' },
          { name: 'pas_expiry', type: 'text', value: '1225' },
          { name: 'pas_cccvc', type: 'text', value: '012' },
          { name: 'pas_ccname', type: 'text', value: 'Jane Doe' },
        ],
        // callback to assert against result
        function (command) {
          return command
            .execute(() => document.body.innerText)
              .then(function (text) {
                // make our assertions on the HPP response
                var json = JSON.parse(text);
                json = JSON.parse(json.response);
                assert.isOk(json.AUTHCODE);
              })
            .end();
        }
      ).bind(this)
    );
  });
});
