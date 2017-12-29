
export var ProposalView = {
  inputContainer: null,
  outputContainer: null,
  proposalContent: null,
  container: null,

  initialize: function () {
    this.container = document.getElementById('proposal')
    this.inputContainer = this.container.querySelector('input')
    this.outputContainer = this.container.querySelector('output')
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
    let signal = new CustomEvent('send.text', {'detail': pastedText})
    this.container.dispatchEvent(signal)
    event.preventDefault()
  },

  render: function (newBlock) {
    this.outputContainer.innerHTML = newBlock
    this.addSeparator()
  },

  addSeparator: function () {
    this.inputContainer.classList.add('separator')
  }
}
