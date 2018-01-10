import {Proposer} from './proposer'
import {SendPropose} from './send_propose'
export class ProposerLogic {
  constructor () {
    this.container = null
    this.proposerEmail = null
    this.EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }

  initialize (containerId) {
    Proposer.initialize('proposer-email')
    this.listen()
  }

  listen () {
    let visualComponent = document.getElementById('proposer-email')
    this.event = visualComponent.addEventListener('proposer.check', this.checkForMail.bind(this))
  }

  checkForMail (data) {
    let text = data.detail
    let isValid = this.validateEmail(text)
    Proposer.setValidity(isValid)
    SendPropose.toggleSubmitButton('proposer', isValid)
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
