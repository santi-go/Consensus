import {Bus} from '../infrastructure/bus'
let XMLHttpRequest = require('xhr2')

export class Api {
  constructor(baseURL) {
    this.url= baseURL+'/create-proposal'
    Bus.subscribe('submit.proposal',this.createProposal.bind(this))
  }

  createProposal(data){
    this.post(data,'proposal.created')
  }

  post(data, topic) {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', this.url, true)
     xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        Bus.publish(topic,this.responseText)
      }
    }
    xhr.send(JSON.stringify(data))
  }

}
