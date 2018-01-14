let XMLHttpRequest = require('xhr2')

export class SendProposeLogic {
  constructor() {
    this.url = 'http://0.0.0.0:4567/create-proposal'
    this.fields = {
      proposer: false,
      involved: false,
      proposal: false
    }
  }

  initialize() {
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

  packaging(proposer, circle, proposal) {
    return {
      "proposer": proposer,
      "involved": circle,
      "proposal": proposal
    }
  }

  post(data) {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', this.url, true)
     xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
      }
    }
    xhr.send(JSON.stringify(data))
  }
}
