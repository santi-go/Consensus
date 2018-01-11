import {Involved} from "../involved"
import {SendPropose} from '../send_propose'
import {Proposer} from '../proposer'
import {Proposal} from "../proposal"

export class ProposalLogic {

  constructor(sendPropose){
    this.content = null
    this.proposal = new Proposal()
    this.sendPropose = sendPropose
  }

  initialize() {
    this.proposal.initialize()
    this.listen()
  }

  listen() {
    let visualComponent = this.proposal.container
    visualComponent.addEventListener('send.text', this.formatText.bind(this))
  }

  formatText(pastedText) {
    let text = this.sanitize(pastedText.detail)
    let newBlock = this.addBlockTags(text)
    this.proposal.render(newBlock)
    this.sendPropose.toggleSubmitButton("proposal", true)
  }

  sanitize(text) {
    let result = text.replace(/<(?:.|\n)*?>/gm, '')
    return result
  }

  addBlockTags(text) {
    let newBlock = ''
    let lines = text.split('\n')
    for (let line of lines) {
      newBlock += this.addTag(line)
    }
    this.content = newBlock
    return newBlock
  }

  addTag(line) {
    let convertedLine = ''
    let lineInProcess = line.trim()
    if (lineInProcess === '') {
      convertedLine = this.addBrTag()
    } else {
      convertedLine = this.addParagraphTag(lineInProcess)
    }
    return convertedLine
  }

  addBrTag() {
    return '<br>\n'
  }

  addParagraphTag(lineInProcess) {
    return '<p>' + lineInProcess + '</p>\n'
  }
}


export class ProposerLogic {
  constructor (sendPropose) {
    this.container = null
    this.proposerEmail = null
    this.EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.proposer = new Proposer()
    this.sendPropose = sendPropose

  }

  initialize (containerId) {
    this.proposer.initialize('proposer-email')
    this.listen()
  }

  listen () {
    let visualComponent = document.getElementById('proposer-email')
    visualComponent.addEventListener('proposer.check', this.checkForMail.bind(this))
  }

  checkForMail (data) {
    let text = data.detail
    let isValid = this.validateEmail(text)
    this.proposer.setValidity(isValid)
    this.sendPropose.toggleSubmitButton('proposer', isValid)
  }

  validateEmail (email) {
    if (email.trim() === '') return true
    let validated = this.EMAIL_PATTERN.test(email)
    if (validated) {
      this.proposerEmail = email
    }
    return validated
  }

  matches (pattern, character) {
    let matcher = new RegExp(pattern)
    let result = matcher.exec(character)
    return result
  }

  selectPattern (text, position) {
    let patterns = {
      local: /[@!#$%&'*+/=?^_`{|}~.-]|[a-z]|[0-9]/ig,
      domain: /[.-]|[a-z]|[0-9]/ig
    }
    let result = patterns.local
    let positionOfAt = text.indexOf('@')
    if (text.includes('@') && positionOfAt < position) result = patterns.domain
    return result
  }
}

export class Circle {
  constructor (sendPropose) {
    this.EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.circle = []
    this.involvedPeople = new Involved()
    this.sendPropose = sendPropose
  }

  initialize () {
    this.involvedPeople.initialize('circle-email')
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
    this.involvedPeople.render(this.circle)
      this.sendPropose.toggleSubmitButton("circle", this.involved().length)
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
    this.involvedPeople.render(this.circle)
    this.sendPropose.toggleSubmitButton("circle", this.involved().length)
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


export class MailChecker {
  isAllowedIn(text, character, position) {
    if (text.includes('@') && character === '@') {
      return null
    }
    let thePattern = this.selectPattern(text, position)
    let isAllowed = this.matches(thePattern, character)
    return isAllowed
  }

  matches(pattern, character) {
    let matcher = new RegExp(pattern)
    let result = matcher.exec(character)
    return result
  }

  selectPattern(text, position) {
    let patterns = {
      local: /[@!#$%&'*+/=?^_`{|}~.-]|[a-z]|[0-9]/ig,
      domain: /[.-]|[a-z]|[0-9]/ig
    }
    let result = patterns.local
    let positionOfAt = text.indexOf('@')
    if (text.includes('@') && positionOfAt < position) result = patterns.domain
    return result
  }
}
