let XMLHttpRequest = require('xhr2')

export class SendPropose {
  constructor(){
    this.url = 'http://0.0.0.0:4567/send-mail'
    this.circle = null
    this.proposerLogic = null
    this.proposalLogic = null

    this.fields = {
          proposer: false,
          involved: 0,
          proposal: false
        }
  }

  initialize(containerId, circle, proposerLogic, proposalLogic) {
    this.container = document.getElementById(containerId)
    this.circle = circle
    this.proposerLogic = proposerLogic
    this.proposalLogic = proposalLogic
    this.prepareEvents()
  }

  prepareEvents() {
    let submitButton = this.container.querySelector('#submit')
    submitButton.addEventListener('click', this.submitProposal.bind(this))
  }

  toggleSubmitButton(caller, validate){
    let value = this.validateField(caller, validate)
    let submitButton = this.container.querySelector('#submit')
    submitButton.disabled = value
  }

  validateField(caller, validate) {
        if (caller === "proposer") this.fields.proposer = validate
        if (caller === "circle") this.fields.involved = validate
        if (caller === "proposal") this.fields.proposal = validate
        if (this.fields.proposer &&  this.fields.involved > 0 && this.fields.proposal ) {
          return false
        }
          return true
      }

  submitProposal() {

    let proposer = this.proposerLogic.proposerEmail.toString()
    let circle = this.circle.involved()
    let proposal = this.proposalLogic.content.toString()
    let packagedProposal = this.packaging(proposer, circle, proposal)
    this.post(this.url, packagedProposal)
    this.finishRequest('Sent')
  }

  post(url, data) {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.send(JSON.stringify(data))
  }

  finishRequest(message) {
    let confirmSuccessful = this.container.querySelector('span')
    confirmSuccessful.innerHTML = message
  }

  packaging(proposer, circle, proposal) {
    return {
      "proposer": proposer,
      "circle": circle,
      "proposal": proposal
    }
  }

}
