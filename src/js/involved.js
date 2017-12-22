export let Involved = {
  container: null,
  panel: null,
  circle: [],
  EMAIL_PATTERN: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  initialize: function (containerId) {
    this.container = document.getElementById(containerId)
    this.prepareEvents()
  },

  prepareEvents: function () {
    let input = this.getInputContainer()
    input.addEventListener('blur', this.extractMail.bind(this))
    input.addEventListener('keypress', this.acceptKeysPress.bind(this))
    this.container.addEventListener('click', this.putFocusOnInput.bind(this))
  },

  acceptKeysPress: function (e) {
    if (e.keyCode === 13 || e.keyCode === 44) {
      this.extractMail()
      e.preventDefault()
    }
  },

  getInputContainer: function () {
    let input = this.container.querySelector('input')
    return input
  },

  putFocusOnInput: function () {
    let input = this.getInputContainer()
    input.focus()
  },

  extractMail: function () {
    let emailsList = this.parseMail()
    for (let i = 0; i < emailsList.length; i++) {
      this.createEmailBox(emailsList[i])
      this.addEmailToCircle(emailsList[i])
    }
    this.cleanInput()
  },

  addEmailToCircle: function (email) {
    this.circle.push(email)
  },

  createEmailBox: function (emailElement) {
    let box = document.createElement('div')
    let input = this.getInputContainer()
    this.container.querySelector('div').insertBefore(box, input)
    box.innerText = emailElement.email
    let theClass = 'invalidBox'
    if (emailElement.valid) {
      theClass = 'validBox'
    }
    box.classList.add(theClass)
    this.createRemoveButton(box)
  },

  cleanInput: function () {
    let input = this.getInputContainer()
    input.value = ''
  },

  validateEmail: function (email) {
    return this.EMAIL_PATTERN.test(email)
  },

  parseMail: function () {
    let text = this.getInputContainer().value
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

  removeEmail: function (event) {
    let email = event.target.parentElement.innerText
    this.removeEmailFromCircle(email)
    this.removeEmailBox(event)
  },

  removeEmailFromCircle: function (email) {
    let index = this.circle.indexOf(email)
    if (index > -1) {
      this.circle.splice(index, 1)
    }
  },

  removeEmailBox: function (event) {
    let emailBox = event.target.parentElement
    emailBox.parentElement.removeChild(emailBox)
  },

  createRemoveButton: function (emailBox) {
    let removeButton = document.createElement('button')
    emailBox.appendChild(removeButton)
    removeButton.classList.add('close')
    removeButton.innerHTML = '<span>Delete</span>'
    removeButton.addEventListener('click', this.removeEmail.bind(this))
  },

  putCircle: function () {
    let circleEmail = this.container
    let validMails = circleEmail.querySelectorAll('.validBox')
    let result = []
    validMails.forEach((mail) => {
      result.push(mail.innerText)
    })
    this.circle = result
    circleEmail.dataset.circle = this.circle.toString()
  }

}
