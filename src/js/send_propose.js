import {SendProposeLogic} from './components/send_propose'
let sendProposeLogic = new SendProposeLogic()
sendProposeLogic.initialize()

export class SendPropose {
  constructor(){
    this.circle = null
    this.proposerLogic = null
    this.proposalLogic = null
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

  sendPropertyToSubmitButton(caller, validate){
    let button = this.container.querySelector('#submit')
    let ifItIsValid = sendProposeLogic.validateField(caller, validate)
    this.toggleSubmit(button, ifItIsValid)
  }

  toggleSubmit(button, ifItIsValid) {
    button.disabled = false
    if (!ifItIsValid) {
      button.disabled = true
    }
  }

  submitProposal() {
    let proposer = this.proposerLogic.proposerEmail.toString()
    let circle = this.circle.involved()
    let proposal = this.proposalLogic.content.toString()
    let packagedProposal = sendProposeLogic.packaging(proposer, circle, proposal)
    sendProposeLogic.post(packagedProposal)
    this.notifyRequest('Sent')
  }

  notifyRequest(message) {
    let confirmSuccessful = this.container.querySelector('span')
    confirmSuccessful.innerHTML = message
  }
}
