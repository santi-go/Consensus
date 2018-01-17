export class Proposal {

  constructor() {
    this.container = document.getElementById('proposal')
    this.inputContainer = this.container.querySelector('input')
    this.outputContainer = this.container.querySelector('output')
    this.prepareEvents()
  }

  prepareEvents() {
    this.inputContainer.addEventListener('paste', this.pasteProposal.bind(this))
  }

  pasteProposal(event) {
    let pastedText = event.clipboardData.getData('text')
    let signal = new CustomEvent('send.text', {'detail': pastedText, 'bubbles':true})
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
