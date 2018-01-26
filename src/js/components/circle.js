export default class Circle {
  constructor () {
    this.EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.circle = []
    this.counter = 0
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
      'id': this.counter++
    }
  }

  extractMails (text) {
    let emailsList = this.parseEmail(text)
    this.addListEmailsToCircle(emailsList)
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
