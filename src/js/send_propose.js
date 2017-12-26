import {Involved} from './involved'
import {Proposer} from './proposer'
import {Proposal} from './proposal'
let XMLHttpRequest = require('xhr2')

export let SendPropose = {
  url: 'http://0.0.0.0:4567',

  initialize: function (containerId) {
    this.container = document.getElementById(containerId)
    this.prepareEvents()
  },

  prepareEvents: function () {
    let submitButton = this.container.querySelector('#submit')
    submitButton.addEventListener('click', this.submitProposal.bind(this))
  },

  submitProposal: function () {
    Involved.putCircle()
    let url = this.url
    let proposer = Proposer.proposerEmail.toString()
    let circle = Involved.circle
    let proposal = Proposal.proposalContent.toString()
    let packagedProposal = this.packaging(proposer, circle, proposal)
    this.post(url, packagedProposal)
  },

  post: function (url, data) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            SendPropose.browseSuccesfull(xhr.status.toString())
            resolve(xhr)
          } else {
            SendPropose.browseSuccesfull(xhr.status.toString())
            reject(new Error('Connection Error'))
          }
        }
      }
      xhr.send(JSON.stringify(data))
    })
  },

  browseSuccesfull: function (message) {
    let confirmSuccessful = this.container.querySelector('span')
    confirmSuccessful.innerHTML = message
  },

  packaging: function (proposer, circle, proposal) {
    return {
      "proposer": proposer,
      "circle": circle,
      "proposal": proposal
    }
  }
}
