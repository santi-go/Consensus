export var Invited = {
  container: null,
  EMAIL_PATTERN: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  initialize: function(containerId) {
    this.container = document.getElementById(containerId);
    this.prepareEvents();
  },

  prepareEvents: function() {
    var input = this.container.querySelector('input');
    input.addEventListener('blur', this.extractMail.bind(this));
  },

  extractMail: function() {
    var emailsList = this.parseMail();
    for (var i = 0; i < emailsList.length; i++){
      this.createEmailBox(emailsList[i]);
    }
    this.cleanInput();
  },

  createEmailBox: function(emailElement){
    var box = document.createElement('div');
    this.container.querySelector('div').appendChild(box);
    box.innerText = emailElement.email;
    var theClass = "invalidBox";
    if(emailElement.valid){
      theClass = "validBox";
    }
    box.classList.add(theClass);
    this.createRemoveButton(box);
  },

  cleanInput: function(){
    var input = this.container.querySelector('input');
    input.value = "";
  },

  validateEmail: function(email){
    return this.EMAIL_PATTERN.test(email);
  },

  parseMail: function() {
    var text = this.container.querySelector('input').value;
    if(text.trim() == '') return [];

    var emails = this.tokenize(text);
    var result = [];
    for(var i = 0; i < emails.length; i++){
      result.push({
        email: emails[i],
        valid: this.validateEmail(emails[i])
      });
    }
    return result;
  },

  tokenize: function(text) {
    var tokens = text.split(",");
    var result = [];
    for (let token of tokens) {
      let trimmed = token.trim();
      if (trimmed != "") {result.push(trimmed);}
    }
    return result;
  },

  removeEmailBox: function(event) {
    var emailBox = event.target.parentElement;
    emailBox.parentElement.removeChild(emailBox);
  },

  createRemoveButton: function(emailBox) {
    var removeButton = document.createElement('div');
    emailBox.appendChild(removeButton);
    removeButton.classList.add("close");
    removeButton.textContent = "x";
    removeButton.addEventListener("click", this.removeEmailBox);
  },

};
