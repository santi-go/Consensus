let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

export let SendPropose = {
  get: function (url, data) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr)
          } else {
            reject(new Error('Connection Error'))
          }
        }
      }
      xhr.send(data)
    })
  },

  packaging: function (proposer, circle, proposal) {
    return {
      'proposer': proposer,
      'circle': circle,
      'proposal': proposal
    }
  }
}
