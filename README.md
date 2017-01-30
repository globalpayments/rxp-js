# Realex JS Library
You can sign up for a Realex account at https://developer.realexpayments.com

## Hosted Payment Page (HPP) JS Library

The Javascript required to initialise the library is below. This code must only be executed when the DOM is fully loaded.

The SDK offers two methods for handling HPP payments - `init()` for quick and easy set-up with the most common defaults, and `setup()` for a lower-level api that gives you a bit more control.

### init()

```javascript
RealexHpp.init(payButtonId, merchantUrl, jsonFromServerSdk);
```
* payButtonId - The ID of the button used to launch the lightbox.
* merchantUrl - The URL to which the JSON response from Realex will be posted.
* jsonFromServerSdk - The JSON output from the Realex HPP Server SDK.

`init()` adds an event listener to the button identified by `payButtonId`, so that when it is clicked/tapped, a lightbox (or popup window on mobile) will be opened inviting the user to enter their card details.

#### Consuming the resulting POST
Once the payment has completed the Realex JSON response will be posted within to the supplied merchantUrl. The name of the field containing the JSON response is hppResponse.

### setup()

```javascript
instance = RealexHpp.setup(jsonFromServerSdk, responseCallback);
```
* jsonFromServerSdk - The JSON output from the Realex HPP Server SDK.
* responseCallback - function which will handle the completed Realex JSON response.

`setup()` returns an instance for use in your own event listeners. When invoked, this instance will open a lightbox (or popup window on mobile devices) inviting the user to enter their card details.

The instance provides a `.cleanup()` method should be invoked if you wish to set up another instance using different JSON or response callback.

#### Consuming the resulting response
Once the payment has completed the Realex JSON response will passed to the `responseCallback`. If the user cancels or closes the lightbox, the `responseCallback` will be invoked without arguments.

## Remote JS SDK

### Validation functions
* validateCardNumber - validates card number format and performs a Luhn check
* validateCardHolderName - validates card holder name is made up from ISO/IEC 8859-1:1998 characters
* validateCvn - validates non-Amex CVN
* validateAmexCvn - validates Amex CVN
* validateExpiryDateFormat - validates expiry date format
* validateExpiryDateNotInPast - validates expirfy date is not in past

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
