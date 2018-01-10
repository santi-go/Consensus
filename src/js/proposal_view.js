
export class ProposalView {

  constructor() {
    this.inputContainer = null
    this.outputContainer = null
    this.container = null
  }

  initialize() {
    this.container = document.getElementById('proposal')
    this.inputContainer = this.container.querySelector('input')
    this.outputContainer = this.container.querySelector('output')
    this.prepareEvents()
  }

  prepareEvents() {
    this.inputContainer.addEventListener('paste', this.pasteProposal.bind(this))
    this.inputContainer.addEventListener('keypress', this.preventCharRender.bind(this))
  }

  preventCharRender(event) {
    let notCtrlV = !event.ctrlKey && event.keyCode !== 86
    if (notCtrlV) {
      event.preventDefault()
    }
  }

  pasteProposal(event) {
    let pastedText = event.clipboardData.getData('text')
    let signal = new CustomEvent('send.text', {'detail': pastedText})
    this.container.dispatchEvent(signal)
    event.preventDefault()
  }

  render(newBlock) {
    this.outputContainer.innerHTML = newBlock
    this.addSeparator()
  }

  addSeparator() {
    this.inputContainer.classList.add('separator')
  }
}
