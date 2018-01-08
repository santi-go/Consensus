
class Propose {
  constructor () {
    browser.url('/')
  }
  inviteWithComponent (componentId, mail) {
    let component = $(componentId)
    let input = component.$('input')

    input.setValue(mail)
  }
  pressEnterWithComponent (componentId) {
    let component = $(componentId)
    let input = component.$('input')
    let keyEnter = '\uE007'
    input.keys(keyEnter)
  }
  confirmSuccessful () {
    let component = $('#panel span')
    let result = component.getText()
    return result === 'Sent'
  }
  invite (mail) {
    let component = $('#circle-email')
    let input = component.$('input')

    input.setValue(mail)
  }
  inputValue () {
    let component = $('#circle-email')
    let input = component.$('input')
    return input.getValue()
  }
  lostFocusOnInvited () {
    let keyTab = '\u0009'
    browser.keys(keyTab)
  }

  clickSubmit () {
    browser.click('#submit')
  }

  firstValidInvitation () {
    let component = $('#circle-email')
    let divValidBox = component.$('div .validBox')

    return divValidBox.getText()
  }
  firstInvalidInvitation () {
    let component = $('#circle-email')
    let divValidBox = component.$('div .invalidBox')

    return divValidBox.getText()
  }
  identifyProposer (mail) {
    let component = $('#proposer-email')
    let input = component.$('input')

    input.setValue(mail)
    browser.click('body')
  }
  isProposerInvalid () {
    let classes = $('#proposer-email').getAttribute('class')
    return classes.includes('invalid')
  }
  proposalIsMarkedForPaste () {
    let element = $('#proposal').getAttribute('class')
    return element
  }
  existCloseButton () {
    let component = $('#circle-email')
    let divValidBox = component.$('div div')

    return divValidBox.getHTML().includes('<button')
  }

  clickClose () {
    browser.click('.close')
  }

  existEmailValid () {
    return browser.isExisting('.validBox')
  }

  pressEnter () {
    let component = $('#circle-email')
    let input = component.$('input')
    let keyEnter = '\uE007'
    input.keys(keyEnter)
  }
  pressComma () {
    let component = $('#circle-email')
    let input = component.$('input')
    let keyComma = '\u002C'
    input.keys(keyComma)
  }
  addAndCutFromGuestsEmail (proposal) {
    let component = $('#circle-email')
    let input = component.$('input')
    input.setValue(proposal)
    browser.keys(['Control', 'ax', 'NULL'])
  }
  getTextPastedInProposal () {
    let component = $('#proposal')
    browser.click('#proposal')
    browser.keys(['Control', 'v', 'NULL'])
    let output = component.$('output')
    let textFromOutput = output.getText()
    return textFromOutput
  }
  pasteProposal (proposal) {
    let input = $('#paste-area')
    let output = $('#proposal output')
    input.setValue(proposal)
    this.selectAll()
    this.copyToClipboard()
    browser.click('#proposal input')
    this.pasteFromClipboard()
    return output.getText()
  }
  selectAll () {
    browser.keys(['Control', 'a', 'NULL'])
  }
  copyToClipboard () {
    browser.keys(['Control', 'c', 'NULL'])
  }
  pasteFromClipboard () {
    browser.keys(['Control', 'v', 'NULL'])
  }
}

module.exports = Propose
