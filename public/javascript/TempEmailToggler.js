var TempEmailToggler = function() {
    var validEmailVisualizer;

    var initialize = function() {
        validEmailVisualizer = new ValidEmailVisualizer;
        var invalidationButton = document.getElementById('invalidation_button');
        var validationButton = document.getElementById('validation_button');
        invalidationButton.addEventListener('click', invalidate);
        validationButton.addEventListener('click', validate);
    };

    var invalidate = function() {
        validEmailVisualizer.changeToInvalid();
    };

    var validate = function() {
        validEmailVisualizer.changeToValid();
    };

    initialize();
}

new TempEmailToggler;
