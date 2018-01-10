import {Involved} from "./involved"
import {SendPropose} from './send_propose'

export class Circle {
  constructor () {
    this.EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.circle = []
  }

  initialize () {
    Involved.initialize('circle-email')
    this.listen()
  }

  listen () {
    let visualComponent = document.getElementById('circle-email')
    visualComponent.addEventListener('circle.set', this.extractMails.bind(this))
    visualComponent.addEventListener('remove.from.circle', this.removeEmailFromCircle.bind(this))
  }

  involved () {
    let result = []
    this.circle.forEach((email) => {
      if (email.valid) {
        result.push(email.email)
      }
    })
    return result
  }

  eMail (email) {
    return {
      'email': email,
      'valid': this.validateEmail(email),
      'id': this.circle.length
    }
  }

  extractMails (data) {
    let emailsList = this.parseEmail(data.detail)
    this.addListEmailsToCircle(emailsList)
    Involved.render(this.circle)
      SendPropose.toggleSubmitButton("circle", this.involved().length)
  }

  addListEmailsToCircle (emailsList) {
    emailsList.forEach((email) => {
      this.addEmailToCircle(email)
    })
  }

  addEmailToCircle (email) {
    this.circle.push(this.eMail(email.email))
  }

  parseEmail (text) {
    if (text.trim() === '') return []
    let emails = this.tokenize(text)
    let result = this.constructMail(emails)
    return result
  }

  constructMail (emails) {
    let result = []
    emails.forEach((email) => {
      result.push(this.eMail(email))
    })
    return result
  }

  removeEmailFromCircle (data) {
    this.removeEmail(data.detail)
    Involved.render(this.circle)
    SendPropose.toggleSubmitButton("circle", this.involved().length)
  }

  removeEmail (email) {
    let result = []
    this.circle.forEach((involved) => {
      if (involved.id !== parseInt(email.id)) {
        result.push(involved)
      }
    })
    this.circle = result
  }

  validateEmail (email) {
    return this.EMAIL_PATTERN.test(email)
  }

  tokenize (text) {
    let tokens = text.split(',')
    let result = []
    for (let token of tokens) {
      let trimmed = token.trim()
      if (trimmed !== '') { result.push(trimmed) }
    }
    return result
  }
}
