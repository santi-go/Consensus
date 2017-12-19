export let Involved = {
  container: null,
  circle: '',
  EMAIL_PATTERN: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  initialize: function (containerId) {
    this.container = document.getElementById(containerId)
    this.prepareEvents()
  },

  prepareEvents: function () {
    let input = this.container.querySelector('input')
    let submitButton = this.container.querySelector('#submit')
    input.addEventListener('blur', this.extractMail.bind(this))
    input.addEventListener('keypress', this.acceptKeysPress.bind(this))
    submitButton.addEventListener('click', this.putCircle.bind(this))
  },

  acceptKeysPress: function (e) {
    if (e.keyCode === 13 || e.keyCode === 44) {
      this.extractMail()
      e.preventDefault()
    }
  },

  extractMail: function () {
    let emailsList = this.parseMail()
    for (let i = 0; i < emailsList.length; i++) {
      this.createEmailBox(emailsList[i])
    }
    this.cleanInput()
  },

  createEmailBox: function (emailElement) {
    let box = document.createElement('div')
    this.container.querySelector('div').appendChild(box)
    box.innerText = emailElement.email
    let theClass = 'invalidBox'
    if (emailElement.valid) {
      theClass = 'validBox'
    }
    box.classList.add(theClass)
    this.createRemoveButton(box)
  },

  cleanInput: function () {
    let input = this.container.querySelector('input')
    input.value = ''
  },

  validateEmail: function (email) {
    return this.EMAIL_PATTERN.test(email)
  },

  parseMail: function () {
    let text = this.container.querySelector('input').value
    if (text.trim() === '') return []

    let emails = this.tokenize(text)
    let result = []
    for (let i = 0; i < emails.length; i++) {
      result.push({
        email: emails[i],
        valid: this.validateEmail(emails[i])
      })
    }
    return result
  },

  tokenize: function (text) {
    let tokens = text.split(',')
    let result = []
    for (let token of tokens) {
      let trimmed = token.trim()
      if (trimmed !== '') { result.push(trimmed) }
    }
    return result
  },

  removeEmailBox: function (event) {
    let emailBox = event.target.parentElement
    emailBox.parentElement.removeChild(emailBox)
  },

  createRemoveButton: function (emailBox) {
    let removeButton = document.createElement('div')
    emailBox.appendChild(removeButton)
    removeButton.classList.add('close')
    removeButton.textContent = 'x'
    removeButton.addEventListener('click', this.removeEmailBox)
  },

  putCircle: function () {
    let circleEmail = this.container
    let validMails = circleEmail.querySelectorAll('.validBox')
    let result = []
    validMails.forEach((mail) => {
      let clone = mail.cloneNode(mail)
      clone.removeChild(clone.firstElementChild)
      result.push(clone.innerText)
    })
    this.circle = result.toString()
    circleEmail.dataset.circle = this.circle
  }

}
