var ValidEmailVisualizer = function() {
    var colorFlag;
    var message;

    var initialize = function() {
        colorFlag = document.getElementById('valid_email_visualizer');
        message = document.getElementById('invalid_email_message');
    };

    this.changeToInvalid = function() {
        colorFlag.className = 'valid_email_visualizer--invalid';
        message.className = 'valid_email_visualizer__message--invalid'
    };

    this.changeToValid = function() {
        colorFlag.className = 'valid_email_visualizer'
        message.className = 'hidden'
    }

    initialize();
}
