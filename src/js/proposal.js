import {ProposalView} from "./proposal_view"


export var Proposal = {
  proposalContent: null,

  initialize: function () {
    ProposalView.initialize()
    this.listen()
  },

  listen: function () {
    let visualComponent = ProposalView.container
    visualComponent.addEventListener('send.text', this.formatText.bind(this))
  },

  formatText: function (pastedText) {
    let text = this.sanitize(pastedText.detail)
    let newBlock = this.addBlockTags(text)
    ProposalView.render(newBlock)
<<<<<<< HEAD
    SendPropose.toggleSubmitButton("proposal", true)
=======
>>>>>>> 3703aa41002cd418712fb27c6034474f18d20ecf
  },

  sanitize: function (text) {
    let result = text.replace(/<(?:.|\n)*?>/gm, '')
    return result
  },

  addBlockTags: function (text) {
    let newBlock = ''
    let lines = text.split('\n')
    for (let line of lines) {
      newBlock += this.addTag(line)
    }
    this.proposalContent = newBlock
    return newBlock
  },

  addTag: function (line) {
    let convertedLine = ''
    let lineInProcess = line.trim()
    if (lineInProcess === '') {
      convertedLine = this.addBrTag()
    } else {
      convertedLine = this.addParagraphTag(lineInProcess)
    }
    return convertedLine
  },

  addBrTag: () => {
    return '<br>\n'
  },

  addParagraphTag: (lineInProcess) => {
    return '<p>' + lineInProcess + '</p>\n'
  }
}
