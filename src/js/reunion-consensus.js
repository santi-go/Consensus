// eslint-disable-next-line
function parseUrl () {
  let urlParams = window.location.search
  let url = urlParams.substring(1)
  let urlJson = {'token': url}
  this.post(urlJson)
}
// eslint-disable-next-line
function post (data) {
  let xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://0.0.0.0:4567/vote-consensus', true)
  xhr.send(JSON.stringify(data))
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(xhr.responseText)
      document.querySelector(".invited").innerText = response['user']
      document.querySelector(".vote").innerText = response['vote']
      document.querySelector(".proposer").innerText = response['proposer']
      document.querySelector(".proposal-box").innerHTML = sanitizeProposal(response['proposal_text'])
      document.querySelector("#reunion-consensus").style.display = "block";
      document.querySelector("#loading-icon").style.display = "none";
    }
  }
}
// eslint-disable-next-line
function sanitizeProposal (data) {
  return data.slice(0, -1)
}
