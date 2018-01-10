import {Circle} from './circle'
import {ProposerLogic} from './proposer_logic'
import {Proposal} from './proposal'
let XMLHttpRequest = require('xhr2')

export let SendPropose = {
  url: 'http://0.0.0.0:4567/send-mail',
  circle: null,
  fields: {
        proposer: false,
        involved: 0,
        proposal: false
      },

  initialize: function (containerId, circle) {
    this.container = document.getElementById(containerId)
    this.circle = circle
    this.prepareEvents()
  },

  prepareEvents: function () {
    let submitButton = this.container.querySelector('#submit')
    submitButton.addEventListener('click', this.submitProposal.bind(this))
  },

  toggleSubmitButton: function (caller, validate){
    let value = this.validateField(caller, validate)
    let submitButton = this.container.querySelector('#submit')
    submitButton.disabled = value
  },

  validateField: function (caller, validate) {
        if (caller === "proposer") this.fields.proposer = validate
        if (caller === "circle") this.fields.involved = validate
        if (caller === "proposal") this.fields.proposal = validate
        if (this.fields.proposer &&  this.fields.involved > 0 && this.fields.proposal ) {
          return false
        }
          return true
      },

  submitProposal: function () {
    let url = this.url
    let proposer = ProposerLogic.proposerEmail.toString()
    let circle = this.circle.involved()
    let proposal = Proposal.proposalContent.toString()
    let packagedProposal = this.packaging(proposer, circle, proposal)
    this.post(url, packagedProposal)
    this.finishRequest('Sent')
  },

  post: function (url, data) {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.send(JSON.stringify(data))
  },

  finishRequest: function (message) {
    let confirmSuccessful = this.container.querySelector('span')
    confirmSuccessful.innerHTML = message
  },

  packaging: function (proposer, circle, proposal) {
    return {
      "proposer": proposer,
      "circle": circle,
      "proposal": proposal
    }
  },

}
