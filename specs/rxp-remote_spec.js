/*
 * Unit tests for rxp-remote.js
 */
describe( 'rxp-remote library', function () {
    
    /*
     * Unit tests for validateCardNumber
     */
    describe( 'card validation (validateCardNumber)', function () {
        it('passes valid card', function () {
            expect(RealexRemote.validateCardNumber('42424242424242424242')).toBe(true);
        });

        it('fails non-numeric card', function () {
            expect(RealexRemote.validateCardNumber('a2424242424242424242')).toBe(false);
        }); 

        it('fails card with spaces', function () {
            expect(RealexRemote.validateCardNumber('4242 4242424242424242')).toBe(false);
        }); 

        it('fails empty card', function () {
            expect(RealexRemote.validateCardNumber('')).toBe(false);
        });
        
        it('fails undefined card', function () {
            expect(RealexRemote.validateCardNumber()).toBe(false);
        });
        
        it('fails white space only', function () {
            expect(RealexRemote.validateCardNumber('  ')).toBe(false);
        });
        
        it('fails length < 14', function () {
            expect(RealexRemote.validateCardNumber('1111111111112')).toBe(false);
        });
        
        it('fails length > 23', function () {
            expect(RealexRemote.validateCardNumber('242424242424242424242402')).toBe(false);
        });
        
        it('pass length = 14', function () {
            expect(RealexRemote.validateCardNumber('11111111111110')).toBe(true);
        });
        
        it('pass length = 23', function () {
            expect(RealexRemote.validateCardNumber('24242424242424242424240')).toBe(true);
        });

        it('fails luhn check', function () {
            expect(RealexRemote.validateCardNumber('42424242424242424241')).toBe(false);
        });      
    });
    
    /*
     * Unit tests for validateCardHolderName
     */
     describe( 'card holder name validation (validateCardHolderName)', function () {
        it('passes valid name', function () {
            expect(RealexRemote.validateCardHolderName('Joe Smith')).toBe(true);
        });
        
        it('fails empty name', function () {
            expect(RealexRemote.validateCardHolderName('')).toBe(false);
        });
        
        it('fails undefined name', function () {
            expect(RealexRemote.validateCardHolderName()).toBe(false);
        });
        
        it('fails white space only', function () {
            expect(RealexRemote.validateCardHolderName('  ')).toBe(false);
        });
        
        it('passes name of 100 characters', function () {
            expect(RealexRemote.validateCardHolderName('abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghij')).toBe(true);
        });
        
        it('fails name over 100 characters', function () {
            expect(RealexRemote.validateCardHolderName('abcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghijabcdefghija')).toBe(false);
        });
        
        it('passes ISO/IEC 8859-1 characters 1', function () {
            expect(RealexRemote.validateCardHolderName('!\" # $ % & \' ( ) * +  - . / 0 1 2 3 4 5 6 7 8 9 : ; < = > ? @ A B C D E F G H I J K L M N O P Q R')).toBe(true);
        });
        
        it('passes ISO/IEC 8859-1 characters 2', function () {
            expect(RealexRemote.validateCardHolderName('S T U V W X Y Z [ \ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ ¡ ¢ £ ¤ ¥')).toBe(true);
        });
        
        it('passes ISO/IEC 8859-1 characters 3', function () {
            expect(RealexRemote.validateCardHolderName('¦ § ¨ © ª « ¬ ­ ® ¯ ° ± ² ³ ´ µ ¶ · ¸ ¹ º » ¼ ½ ¾ ¿ À Á Â Ã Ä Å Æ Ç È É Ê Ë Ì Í Î Ï Ð Ñ Ò Ó Ô Õ Ö')).toBe(true);
        });
        
        it('passes ISO/IEC 8859-1 characters 4', function () {
            expect(RealexRemote.validateCardHolderName('× Ø Ù Ú Û Ü Ý Þ ß à á â ã ä å æ ç è é ê ë ì í î ï ð ñ ò ó ô õ ö ÷ ø ù ú û ü ý þ ÿ')).toBe(true);
        });
        
        it('fails non-ISO/IEC 8859-1 characters', function () {
            expect(RealexRemote.validateCardHolderName('€')).toBe(false);
        });
        
    });
    
    /*
     * Unit tests for validateAmexCvn
     */
     describe( 'CVN Amex validation (validateAmexCvn)', function () {
        it('passes valid Amex CVN', function () {
            expect(RealexRemote.validateAmexCvn('1234')).toBe(true);
        });
        
        it('fails empty CVN', function () {
            expect(RealexRemote.validateAmexCvn('')).toBe(false);
        });
        
        it('fails undefined CVN', function () {
            expect(RealexRemote.validateAmexCvn()).toBe(false);
        });
        
        it('fails white space only', function () {
            expect(RealexRemote.validateAmexCvn('   ')).toBe(false);
        });
        
        it('fails Amex CVN of 5 numbers', function () {
            expect(RealexRemote.validateAmexCvn('12345')).toBe(false);
        });
        
        it('fails Amex CVN of 3 numbers', function () {
            expect(RealexRemote.validateAmexCvn('123')).toBe(false);
        });
        
        it('fails non-numeric Amex CVN of 4 characters', function () {
            expect(RealexRemote.validateAmexCvn('123a')).toBe(false);
        });
       
    });
    
    /*
     * Unit tests for validateCvn
     */
     describe( 'CVN non-Amex validation (validateCvn)', function () {
        it('passes valid non-Amex CVN', function () {
            expect(RealexRemote.validateCvn('123')).toBe(true);
        });
        
        it('fails empty CVN', function () {
            expect(RealexRemote.validateCvn('')).toBe(false);
        });
        
        it('fails undefined CVN', function () {
            expect(RealexRemote.validateCvn()).toBe(false);
        });
        
        it('fails white space only', function () {
            expect(RealexRemote.validateCvn('   ')).toBe(false);
        });
        
        it('fails non-Amex CVN of 4 numbers', function () {
            expect(RealexRemote.validateCvn('1234')).toBe(false);
        });
        
        it('fails non-Amex CVN of 2 numbers', function () {
            expect(RealexRemote.validateCvn('12')).toBe(false);
        });
        
        it('fails non-numeric non-Amex CVN of 3 characters', function () {
            expect(RealexRemote.validateCvn('12a')).toBe(false);
        });
    });
    
    /*
     * Unit tests for validateExpiryDateFormat
     */
     describe( 'Expiry date format validation (validateExpiryDateFormat)', function () {
        
        it('passes valid date 1299', function () {
            expect(RealexRemote.validateExpiryDateFormat('1299')).toBe(true);
        });
        
        it('passes valid date 0199', function () {
            expect(RealexRemote.validateExpiryDateFormat('0199')).toBe(true);
        });
        
        it('fails non-numeric date', function () {
            expect(RealexRemote.validateExpiryDateFormat('a199')).toBe(false);
        }); 

        it('fails date with spaces', function () {
            expect(RealexRemote.validateExpiryDateFormat('1 99')).toBe(false);
        }); 

        it('fails empty date', function () {
            expect(RealexRemote.validateExpiryDateFormat('')).toBe(false);
        });
        
        it('fails undefined date', function () {
            expect(RealexRemote.validateExpiryDateFormat()).toBe(false);
        });
        
        it('fails white space only', function () {
            expect(RealexRemote.validateExpiryDateFormat('    ')).toBe(false);
        });
        
        it('fails length > 4', function () {
            expect(RealexRemote.validateExpiryDateFormat('12099')).toBe(false);
        });
        
        it('fails length < 4', function () {
            expect(RealexRemote.validateExpiryDateFormat('199')).toBe(false);
        });
        
        it('fails invalid month 00', function () {
            expect(RealexRemote.validateExpiryDateFormat('0099')).toBe(false);
        });
        
        it('fails invalid month 13', function () {
            expect(RealexRemote.validateExpiryDateFormat('1399')).toBe(false);
        });
    });
    
     /*
     * Unit tests for validateExpiryDateNotInPast
     */
     describe( 'Expiry date not in past validation (validateExpiryDateNotInPast)', function () {
        
        it('fails date in past', function () {
            expect(RealexRemote.validateExpiryDateNotInPast('0615')).toBe(false);
        });
        
        it('pass current month', function () {
            var now = new Date();
            var nowMonth = '' + (now.getMonth() + 1);
            nowMonth = nowMonth.length < 2 ? '0' + nowMonth : nowMonth;
            var nowYear = ('' + now.getFullYear()).substr(2,4);
            expect(RealexRemote.validateExpiryDateNotInPast(nowMonth + nowYear)).toBe(true);
        });
    });

});