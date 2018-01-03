import {MailChecker} from "./mail_checker"
import {Service} from "./service"

export let Proposer = {
  container: null,
  EMAIL_PATTERN: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  initialize: function (containerId) {
    this.container = document.getElementById(containerId)
    this.prepareEvents()
  },

  prepareEvents: function () {
    let input = this.container.querySelector('input')
    input.addEventListener('blur', this.markValidity.bind(this))
    input.addEventListener('keypress', this.focusOnCircle.bind(this))
  },

  focusOnCircle: function (event) {
    this.maskInput(event)
    if (Service.isEnterKey(event)) {
      this.containerCircle = document.getElementById('circle-email')
      this.containerCircle.querySelector('input').focus()
    }
  },

  markValidity: function (event) {
    let email = event.target.value
    let isValid = new CustomEvent('proposer.check', {'detail': email})
    this.container.dispatchEvent(isValid)
  },

  setValidity: function (isValid) {
    let mark = 'invalid'
    if (isValid) {
      this.container.classList.remove(mark)
    } else {
      this.container.classList.add(mark)
    }
  },

  maskInput: function (event) {
    let text = event.target.value
    let pressedKeyCode = event.which
    let position = event.target.selectionStart
    let character = String.fromCharCode(pressedKeyCode)
    let isAllowed = MailChecker.isAllowedIn(text, character, position)
    if (!isAllowed) {
      event.preventDefault()
    }
  }
}
