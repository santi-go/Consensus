import {MailChecker} from './mail_checker'
import {KeyPressed} from './libraries/key_mapping'

export class Proposer {

  constructor(){
    this.container = null
    this.keyPressed = new KeyPressed()
  }

  initialize(containerId) {
    this.container = document.getElementById(containerId)
    this.prepareEvents()
  }

  prepareEvents() {
    let input = this.container.querySelector('input')
    input.addEventListener('blur', this.markValidity.bind(this))
    input.addEventListener('keydown', this.focusOnCircle.bind(this))
  }

  focusOnCircle(event) {
    if (this.keyPressed.isBackSpace || this.keyPressed.isTab || this.keyPressed.isDot) {
      return
    }
    this.maskInput(event)
    if (this.keyPressed.isEnter(event)) {
      this.containerCircle = document.getElementById('circle-email')
      this.containerCircle.querySelector('input').focus()
    }
  }

  markValidity(event) {
    let email = event.target.value
    let isValid = new CustomEvent('proposer.check', {'detail': email})
    this.container.dispatchEvent(isValid)
  }

  setValidity(isValid) {
    let mark = 'invalid'
    if (isValid) {
      this.container.classList.remove(mark)
    } else {
      this.container.classList.add(mark)
    }
  }

  maskInput(event) {
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
