import {Involved} from "./involved"

export let Circle = {
  circle: [],
  EMAIL_PATTERN: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  initialize: function () {
    Involved.initialize('circle-email')
    this.listen()
  },

  listen: function () {
    let visualComponent = document.getElementById('circle-email')
    visualComponent.addEventListener('circle.set', this.extractMails.bind(this))
    visualComponent.addEventListener('remove.from.circle', this.removeEmailFromCircle.bind(this))
  },

  involved: function () {
    let result = []
    this.circle.forEach((email) => {
      if (email.valid) {
        result.push(email.email)
      }
    })
    return result
  },

  eMail: function (email) {
    return {
      'email': email,
      'valid': this.validateEmail(email),
      'id': this.circle.length
    }
  },

  extractMails: function (data) {
    let emailsList = this.parseEmail(data.detail)
    this.addListEmailsToCircle(emailsList)
    Involved.render(this.circle)
  },

  addListEmailsToCircle: function (emailsList) {
    emailsList.forEach((email) => {
      this.addEmailToCircle(email)
    })
  },

  addEmailToCircle: function (email) {
    this.circle.push(this.eMail(email.email))
  },

  parseEmail: function (text) {
    if (text.trim() === '') return []
    let emails = this.tokenize(text)
    let result = this.constructMail(emails)
    return result
  },

  constructMail: function (emails) {
    let result = []
    emails.forEach((email) => {
      result.push(this.eMail(email))
    })
    return result
  },

  removeEmailFromCircle: function (data) {
    this.removeEmail(data.detail)
    Involved.render(this.circle)
  },

  removeEmail: function (email) {
    let result = []
    this.circle.forEach((involved) => {
      if (involved.id !== parseInt(email.id)) {
        result.push(involved)
      }
    })
    this.circle = result
  },

  validateEmail: function (email) {
    return this.EMAIL_PATTERN.test(email)
  },

  tokenize: function (text) {
    let tokens = text.split(',')
    let result = []
    for (let token of tokens) {
      let trimmed = token.trim()
      if (trimmed !== '') { result.push(trimmed) }
    }
    return result
  }
}
