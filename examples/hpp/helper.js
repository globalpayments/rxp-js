function success(response) {
    console.log('Successful transaction. Message: ', response.MESSAGE);
}

$(document).ready(function() {
    $('#paymentMethod').on('change', function() {
        RealexHpp.setHppUrl(this.value);
    });
});
