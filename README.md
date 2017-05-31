# Realex JS Library
You can sign up for a Realex account at https://developer.realexpayments.com

## Hosted Payment Page (HPP) JS Library

### Usage
The Javascript required to initialise the library is below. This code must only be executed when the DOM is fully loaded.
```javascript
RealexHpp.init(payButtonId, merchantUrl, jsonFromServerSdk);
```
* payButtonId - The ID of the button used to launch the lightbox.
* merchantUrl - The URL to which the JSON response from Realex will be posted.
* jsonFromServerSdk - The JSON output from the Realex HPP Server SDK.

### Consuming the resulting POST
Once the payment has completed the Realex JSON response will be posted within to the supplied merchantUrl. The name of the field containing the JSON response is hppResponse.

## Remote JS Library

### Validation functions
* validateCardNumber - validates card number format and performs a Luhn check
* validateCardHolderName - validates card holder name is made up from ISO/IEC 8859-1:1998 characters
* validateCvn - validates non-Amex CVN
* validateAmexCvn - validates Amex CVN
* validateExpiryDateFormat - validates expiry date format
* validateExpiryDateNotInPast - validates expiry date is not in past

### Usage
```javascript
RealexRemote.validateCardNumber(cardNumber);
RealexRemote.validateCardHolderName(cardHolderName);
RealexRemote.validateCvn(cvn);
RealexRemote.validateAmexCvn(amexCvn);
RealexRemote.validateExpiryDateFormat(expiryDate);
RealexRemote.validateExpiryDateNotInPast(expiryDate);
```

## License
See the LICENSE file.
