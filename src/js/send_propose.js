let XMLHttpRequest = require('xhr2')

export class SendPropose {
  constructor(){
    this.url = 'http://0.0.0.0:4567/send-mail'
    this.circle = null
    this.proposerLogic = null
    this.proposalLogic = null

    this.fields = {
          proposer: false,
          involved: false,
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
    let isValid = this.validateField(caller, validate)
    let submitButton = this.container.querySelector('#submit')
    submitButton.disabled = false
    if (!isValid) {
      submitButton.disabled = true
    }
  }

  validateField(caller, validate) {
    this.fields[caller] = validate
    for (let field in this.fields) {
      if (!this.fields[field]){
        return false
      }
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
     xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
      }
    }
    xhr.send(JSON.stringify(data))
  }

  finishRequest(message) {
    let confirmSuccessful = this.container.querySelector('span')
    confirmSuccessful.innerHTML = message
  }

  packaging(proposer, circle, proposal) {
    return {
      "proposer": proposer,
      "involved": circle,
      "proposal": proposal
    }
  }

}
