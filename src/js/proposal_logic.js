import {ProposalView} from "./proposal_view"
import {SendPropose} from './send_propose'

export class ProposalLogic {

  constructor(){
    this.proposalContent = null
  }

  initialize() {
    ProposalView.initialize()
    this.listen()
  }

  listen() {
    let visualComponent = ProposalView.container
    visualComponent.addEventListener('send.text', this.formatText.bind(this))
  }

  formatText(pastedText) {
    let text = this.sanitize(pastedText.detail)
    let newBlock = this.addBlockTags(text)
    ProposalView.render(newBlock)
    SendPropose.toggleSubmitButton("proposal", true)
  }

  sanitize(text) {
    let result = text.replace(/<(?:.|\n)*?>/gm, '')
    return result
  }

  addBlockTags(text) {
    let newBlock = ''
    let lines = text.split('\n')
    for (let line of lines) {
      newBlock += this.addTag(line)
    }
    this.proposalContent = newBlock
    return newBlock
  }

  addTag(line) {
    let convertedLine = ''
    let lineInProcess = line.trim()
    if (lineInProcess === '') {
      convertedLine = this.addBrTag()
    } else {
      convertedLine = this.addParagraphTag(lineInProcess)
    }
    return convertedLine
  }

  addBrTag() {
    return '<br>\n'
  }

  addParagraphTag(lineInProcess) {
    return '<p>' + lineInProcess + '</p>\n'
  }
}
