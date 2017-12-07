export let Invited = {
  container: null,
  EMAIL_PATTERN: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  initialize: function(containerId) {
    this.container = document.getElementById(containerId);
    this.prepareEvents();
  },

  prepareEvents: function() {
    let input = this.container.querySelector('input');
    input.addEventListener('blur', this.extractMail.bind(this));
  },

  extractMail: function() {
    let emailsList = this.parseMail();
    for (let i = 0; i < emailsList.length; i++){
      this.createEmailBox(emailsList[i]);
    }
    this.cleanInput();
  },

  createEmailBox: function(emailElement){
    let box = document.createElement('div');
    this.container.querySelector('div').appendChild(box);
    box.innerText = emailElement.email;
    let theClass = "invalidBox";
    if(emailElement.valid){
      theClass = "validBox";
    }
    box.classList.add(theClass);
    this.createRemoveButton(box);
  },

  cleanInput: function(){
    let input = this.container.querySelector('input');
    input.value = "";
  },

  validateEmail: function(email){
    return this.EMAIL_PATTERN.test(email);
  },

  parseMail: function() {
    let text = this.container.querySelector('input').value;
    if(text.trim() == '') return [];

    let emails = this.tokenize(text);
    let result = [];
    for(let i = 0; i < emails.length; i++){
      result.push({
        email: emails[i],
        valid: this.validateEmail(emails[i])
      });
    }
    return result;
  },

  tokenize: function(text) {
    let tokens = text.split(",");
    let result = [];
    for (let token of tokens) {
      let trimmed = token.trim();
      if (trimmed != "") {result.push(trimmed);}
    }
    return result;
  },

  removeEmailBox: function(event) {
    let emailBox = event.target.parentElement;
    emailBox.parentElement.removeChild(emailBox);
  },

  createRemoveButton: function(emailBox) {
    let removeButton = document.createElement('div');
    emailBox.appendChild(removeButton);
    removeButton.classList.add("close");
    removeButton.textContent = "x";
    removeButton.addEventListener("click", this.removeEmailBox);
  },

};
