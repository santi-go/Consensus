export default class Send {
  constructor(){
    this.container = document.getElementById('panel')
    this.prepareEvents()
  }

  prepareEvents() {
    let submitButton = this.container.querySelector('#submit')
    submitButton.addEventListener('click', this.submitProposal.bind(this))
  }


  toggleSubmit(isValid) {
    let button = this.container.querySelector('#submit')
    button.disabled = false
    if (!isValid) {
      button.disabled = true
    }
  }

  submitProposal(event) {
    let signal = new CustomEvent('submit.proposal', {'bubbles':true})
    this.container.dispatchEvent(signal)
    location.reload(true)
    event.preventDefault()
  }

}
