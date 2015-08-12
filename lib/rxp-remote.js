/*
 * rxp-remote.js
 * https://github.com/realexpayments/rxp-js
 *
 * Licensed under the MIT license.
 */
var RealexRemote = (function() {

    'use strict';

    /*
     * Validate Card Number. Returns true if card number valid. Only allows
     * non-empty numeric values between 12 and 19 characters. A Luhn check is
     * also run against the card number.
     */
    var validateCardNumber = function(cardNumber) {
        // test numeric and length between 12 and 19
        if (!/^\d{12,19}$/.test(cardNumber)) {
            return false;
        }

        // luhn check
        var sum = 0;
        var digit = 0;
        var addend = 0;
        var timesTwo = false;

        for (var i = cardNumber.length - 1; i >= 0; i--) {
            digit = parseInt(cardNumber.substring(i, i + 1), 10);
            if (timesTwo) {
                addend = digit * 2;
                if (addend > 9) {
                    addend -= 9;
                }
            } else {
                addend = digit;
            }
            sum += addend;
            timesTwo = !timesTwo;
        }

        var modulus = sum % 10;
        if (modulus !== 0) {
            return false;
        }

        return true;
    };

    /*
     * Validate Card Holder Name. Returns true if card holder valid. Only allows
     * non-empty ISO/IEC 8859-1 values 100 characters or less.
     */
    var validateCardHolderName = function(cardHolderName) {
        // test for undefined
        if (!cardHolderName) {
            return false;
        }

        // test white space only
        if (!cardHolderName.trim()) {
            return false;
        }

        // test ISO/IEC 8859-1 characters between 1 and 100
        if (!/^[\u0020-\u007E\u00A0-\u00FF]{1,100}$/.test(cardHolderName)) {
            return false;
        }

        return true;
    };

    /*
     * Validate CVN. Applies to non-Amex card types. Only allows 3 numeric
     * characters.
     */
    var validateCvn = function(cvn) {
        // test numeric length 3
        if (!/^\d{3}$/.test(cvn)) {
            return false;
        }

        return true;
    };

    /*
     * Validate Amex CVN. Applies to Amex card types. Only allows 4 numeric
     * characters.
     */
    var validateAmexCvn = function(cvn) {
        // test numeric length 4
        if (!/^\d{4}$/.test(cvn)) {
            return false;
        }

        return true;
    };

    /*
     * Validate Expiry Date Format. Only allows 4 numeric characters. Month must
     * be between 1 and 12.
     */
    var validateExpiryDateFormat = function(expiryDate) {

        // test numeric of length 4
        if (!/^\d{4}$/.test(expiryDate)) {
            return false;
        }

        var month = parseInt(expiryDate.substring(0, 2), 10);
        var year = parseInt(expiryDate.substring(2, 4), 10);

        // test month range is 1-12
        if (month < 1 || month > 12) {
            return false;
        }

        return true;
    };

    /*
     * Validate Expiry Date Not In Past. Also runs checks from
     * validateExpiryDateFormat.
     */
    var validateExpiryDateNotInPast = function(expiryDate) {
        // test valid format
        if (!validateExpiryDateFormat(expiryDate)) {
            return false;
        }

        var month = parseInt(expiryDate.substring(0, 2), 10);
        var year = parseInt(expiryDate.substring(2, 4), 10);

        // test date is not in the past
        var now = new Date();
        var currentMonth = now.getMonth() + 1;
        var currentYear = now.getFullYear();
        if (year < (currentYear % 100)) {
            return false;
        } else if (year === (currentYear % 100) && month < currentMonth) {
            return false;
        }

        return true;
    };

    return {
        validateCardNumber : validateCardNumber,
        validateCardHolderName : validateCardHolderName,
        validateCvn : validateCvn,
        validateAmexCvn : validateAmexCvn,
        validateExpiryDateFormat : validateExpiryDateFormat,
        validateExpiryDateNotInPast : validateExpiryDateNotInPast
    };
}());
