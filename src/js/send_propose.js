let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

export let SendPropose = {
  get: function () {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      xhr.open('GET', 'http://consensus:80/sendPropose', true)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr)
          } else {
            reject(new Error('Connection Error'))
          }
        }
      }
      xhr.send('proposal')
    })
  }
}
