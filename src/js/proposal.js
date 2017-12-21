export var Proposal = {
  inputContainer: null,
  outputContainer: null,
  proposalContent: null,

  initialize: function (inputContainerId) {
    let container = document.getElementById(inputContainerId)
    this.inputContainer = container.querySelector('input')
    this.outputContainer = container.querySelector('output')
    this.prepareEvents()
  },

  prepareEvents: function () {
    this.inputContainer.addEventListener('paste', this.pasteProposal.bind(this))
    this.inputContainer.addEventListener('keypress', this.preventCharRender.bind(this))
  },

  preventCharRender: function (event) {
    let notCtrlV = !event.ctrlKey && event.keyCode !== 86
    if (notCtrlV) {
      event.preventDefault()
    }
  },

  pasteProposal: function (event) {
    let pastedText = event.clipboardData.getData('text')
    let text = this.sanitize(pastedText)
    let newBlock = this.addBlockTags(text)
    this.outputContainer.innerHTML = newBlock
    this.addSeparator()
    event.preventDefault()
  },

  addSeparator: function () {
    this.inputContainer.classList.add('separator')
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
    return this.proposalContent
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
