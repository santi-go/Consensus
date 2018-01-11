import {KeyPressed} from "./libraries/key_mapping"

export class Involved {

  constructor(){
    this.container = null
    this.keyPressed = new KeyPressed()
  }

  initialize(containerId) {
    this.container = document.getElementById(containerId)
    this.prepareEvents()
  }

  prepareEvents() {
    let input = this.getInputContainer()
    input.addEventListener('blur', this.setCircle.bind(this))
    input.addEventListener('keydown', this.acceptKeysPress.bind(this))
    this.container.addEventListener('click', this.putFocusOnInput.bind(this))
  }

  acceptKeysPress(e) {
    if (this.keyPressed.isEnter(e) || this.keyPressed.isComma(e)) {
      this.setCircle()
      e.preventDefault()
    }
  }

  setCircle() {
    let text = this.getInputContainer().value
    if (text === '') return
    let signal = new CustomEvent('circle.set', {'detail': text})
    this.container.dispatchEvent(signal)
  }

  getInputContainer() {
    return this.container.querySelector('input')
  }

  putFocusOnInput() {
    this.getInputContainer().focus()
  }

  render(data) {
    this.cleanBoxes()
    data.forEach((email) => {
      this.createEmailBox(email)
    })
    this.cleanInput()
  }

  cleanBoxes() {
    let boxes = document.querySelectorAll('div.circle-email-list div')
    boxes.forEach((box) => {
      box.parentElement.removeChild(box)
    })
  }

  createEmailBox(emailElement) {
    let box = this.insertANewBox()
    box.innerText = emailElement.email
    box.classList.add(this.selectClass(emailElement.valid))
    box.id = emailElement.id
    this.createRemoveButton(box)
  }

  cleanInput() {
    let input = this.getInputContainer()
    input.value = ''
  }

  selectClass(valid) {
    if (valid) { return 'validBox' }
    return 'invalidBox'
  }

  insertANewBox() {
    let box = document.createElement('div')
    let input = this.getInputContainer()
    this.container.querySelector('div').insertBefore(box, input)
    return box
  }

  removeEmail(event) {
    let email = event.target.parentElement.innerText
    let emailId = event.target.parentElement.id
    let signal = new CustomEvent('remove.from.circle', {'detail': {'email': email, 'id': emailId}})
    this.container.dispatchEvent(signal)
    event.preventDefault()
  }

  createRemoveButton(emailBox) {
    let removeButton = document.createElement('button')
    emailBox.appendChild(removeButton)
    removeButton.setAttribute("tabindex", "-1")
    removeButton.classList.add('close')
    removeButton.innerHTML = '<span>Delete</span>'
    removeButton.addEventListener('click', this.removeEmail.bind(this))
  }

}
