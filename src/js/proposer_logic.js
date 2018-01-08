import {Proposer} from "./proposer"
import {SendPropose} from './send_propose'

export let ProposerLogic = {
  container: null,
  proposerEmail: null,
  EMAIL_PATTERN: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  initialize: function (containerId) {
    Proposer.initialize('proposer-email')
    this.listen()
  },

  listen: function () {
    let visualComponent = document.getElementById('proposer-email')
    visualComponent.addEventListener('proposer.check', this.checkForMail.bind(this))
  },

  checkForMail: function (data) {
    let text = data.detail
    let isValid = this.validateEmail(text)
    Proposer.setValidity(isValid)
  },

  validateEmail: function (email) {
    if (email.trim() === '') return true
    let validated = this.EMAIL_PATTERN.test(email)
    if (validated) {
      this.proposerEmail = email
    }
    SendPropose.validateField("proposer", validated)
    return validated
  },

  matches: function (pattern, character) {
    let matcher = new RegExp(pattern)
    let result = matcher.exec(character)
    return result
  },

  selectPattern: function (text, position) {
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
