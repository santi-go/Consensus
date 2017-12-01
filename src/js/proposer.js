var Proposer = {
  container: null,
  EMAIL_PATTERN: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  initialize: function(containerId) {
    this.container = document.getElementById(containerId);
    this.prepareEvents();
  },

  prepareEvents: function(){
    var input = this.container.querySelector('input');
    input.addEventListener('blur', this.checkForMail.bind(this));
    input.addEventListener('keypress', this.maskInput.bind(this));
  },

  checkForMail: function(event) {
    var text = event.target.value;
    isValid = this.validateEmail(text);
    this.markValidity(isValid);
  },

  maskInput: function(event) {
    var text = event.target.value;
    var pressedKeyCode = event.which;
    var character = String.fromCharCode(pressedKeyCode);
    var isAllowed = this.isAllowedIn(text, character);
    if(!isAllowed) {
      event.preventDefault();
    }
  },

  isAllowedIn: function(text, character){
    var thePattern = this.selectPattern(text);
    return this.matches(thePattern, character);
  },

  markValidity: function(isValid) {
    var mark = 'invalid';
    if(isValid) {
      this.container.classList.remove(mark);
    } else {
      this.container.classList.add(mark);
    }
  },

  validateEmail: function(email){
    if(email.trim()=='') return true;
    return this.EMAIL_PATTERN.test(email);
  },

  matches: function(pattern, character) {
    var matcher = new RegExp(pattern);
    var result = matcher.exec(character);
    return result;
  },

  selectPattern: function(text) {
    var patterns = {
      local: /[@!#$%&'*+/=?^_`{|}~.-]|[a-z]|[0-9]/ig,
      domain: /[.-]|[a-z]|[0-9]/ig
    };
    var result = patterns.local;
    if(text.includes('@')) result = patterns.domain;
    return result;
  },

};
