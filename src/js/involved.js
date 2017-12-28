
export let Involved = {
  container: null,

  initialize: function (containerId) {
    this.container = document.getElementById(containerId)
    this.prepareEvents()
  },

  prepareEvents: function () {
    let input = this.getInputContainer()
    input.addEventListener('blur', this.setCircle.bind(this))
    input.addEventListener('keypress', this.acceptKeysPress.bind(this))
    this.container.addEventListener('click', this.putFocusOnInput.bind(this))
  },

  acceptKeysPress: function (e) {
    if (e.keyCode === 13 || e.keyCode === 44) {
      this.setCircle()
      e.preventDefault()
    }
  },

  setCircle: function () {
    let text = this.getInputContainer().value
    if (text === '') return
    let signal = new CustomEvent('circle.set', {'detail': text})
    this.container.dispatchEvent(signal)
  },

  getInputContainer: function () {
    return this.container.querySelector('input')
  },

  putFocusOnInput: function () {
    this.getInputContainer().focus()
  },

  render: function (data) {
    this.cleanBoxes()
    data.forEach((email) => {
      this.createEmailBox(email)
    })
    this.cleanInput()
  },

  cleanBoxes: function () {
    let boxes = document.querySelectorAll('div.circle-email-list div')
    boxes.forEach((box) => {
      box.parentElement.removeChild(box)
    })
  },

  createEmailBox: function (emailElement) {
    let box = this.insertANewBox()
    box.innerText = emailElement.email
    box.classList.add(this.selectClass(emailElement.valid))
    this.createRemoveButton(box)
  },

  cleanInput: function () {
    let input = this.getInputContainer()
    input.value = ''
  },

  selectClass: function (valid) {
    if (valid) { return 'validBox' }
    return 'invalidBox'
  },

  insertANewBox: function () {
    let box = document.createElement('div')
    let input = this.getInputContainer()
    this.container.querySelector('div').insertBefore(box, input)
    return box
  },

  removeEmail: function (event) {
    let email = event.target.parentElement.innerText
    let signal = new CustomEvent('remove.from.circle', {'detail': email})
    this.container.dispatchEvent(signal)
    event.preventDefault()
  },

  createRemoveButton: function (emailBox) {
    let removeButton = document.createElement('button')
    emailBox.appendChild(removeButton)
    removeButton.classList.add('close')
    removeButton.innerHTML = '<span>Delete</span>'
    removeButton.addEventListener('click', this.removeEmail.bind(this))
  }

}
