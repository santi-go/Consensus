export let Proposer = {
  container: null,
  EMAIL_PATTERN: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  initialize: function(containerId) {
    this.container = document.getElementById(containerId);
    this.prepareEvents();
  },

  prepareEvents: function(){
    let input = this.container.querySelector('input');
    input.addEventListener('blur', this.checkForMail.bind(this));
    input.addEventListener('keypress', this.maskInput.bind(this));
  },

  checkForMail: function(event) {
    let text = event.target.value;
    let isValid = this.validateEmail(text);
    this.markValidity(isValid);
  },

  maskInput: function(event) {
    let text = event.target.value
    let pressedKeyCode = event.which
    let position = event.target.selectionStart
    let character = String.fromCharCode(pressedKeyCode)
    let isAllowed = this.isAllowedIn(text, character, position)
    if(!isAllowed) {
      event.preventDefault()
    }
  },

  isAllowedIn: function(text, character, position){
    if (text.includes('@') && character == '@') return null
    let thePattern = this.selectPattern(text, position)
    return this.matches(thePattern, character)
  },

  markValidity: function(isValid) {
    let mark = 'invalid';
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
    let matcher = new RegExp(pattern);
    let result = matcher.exec(character);
    return result;
  },

  selectPattern: function(text, position) {
    let patterns = {
      local: /[@!#$%&'*+/=?^_`{|}~.-]|[a-z]|[0-9]/ig,
      domain: /[.-]|[a-z]|[0-9]/ig
    }
    let result = patterns.local;
    let positionOfAt = text.indexOf('@')
    if(text.includes('@') && positionOfAt < position) result = patterns.domain
    return result
  },
};
