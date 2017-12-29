import {Involved} from "./involved"

export let Circle = {
  circle: [],
  EMAIL_PATTERN: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  initialize: function () {
    Involved.initialize('circle-email')
    this.listen()
  },

  involved: function () {
    let result = []
    this.circle.forEach((email) => {
      if (email.valid) { result.push(email.email) }
    })
    return result
  },

  listen: function () {
    let visualComponent = document.getElementById('circle-email')
    visualComponent.addEventListener('circle.set', this.extractMails.bind(this))
    visualComponent.addEventListener('remove.from.circle', this.removeEmailFromCircle.bind(this))
  },

  extractMails: function (data) {
    let emailsList = this.parseMail(data.detail)
    emailsList.forEach((email) => {
      this.addEmailToCircle(email)
    })
    Involved.render(this.circle)
  },

  parseMail: function (text) {
    let result = []
    if (text.trim() === '') return result
    let emails = this.tokenize(text)
    emails.forEach((email) => {
      result.push({
        'email': email,
        'valid': this.validateEmail(email)
      })
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
      if (involved.email !== email) {
        result.push(involved)
      }
    })
    this.circle = result
  },

  addEmailToCircle: function (email) {
    this.circle.push(email)
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
