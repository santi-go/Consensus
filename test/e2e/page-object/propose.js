class Propose {
  constructor () {
    browser.url('/')
    this.proposer = '#proposer'
    this.involved = '#involved'
    this.proposal = '#proposal'
    this.submit = '#submit'
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

  putCharacterInComponent (componentId,character) {
    let component = $(componentId)
    let input = component.$('input')
    let anyKey = character
    input.keys(anyKey)
  }

  contentOfComponent (componentId) {
    let component = $(componentId)
    let input = component.$('input')
    return input.getValue()
  }

  outputOfComponent (componentId) {
    let component = $(componentId)
    let input = component.$('output')
    return input.getValue()
  }

  confirmSuccessful () {
    let proposer = this.contentOfComponent(this.proposer)
    let proposal = this.outputOfComponent(this.proposal)
    let circle =this.contentOfComponent(this.involved )
    return (!proposer && !proposal && !circle)
  }

  pressTab () {
    let keyTab = '\u0009'
    browser.keys(keyTab)
  }

  clickSubmit () {
    browser.click(this.submit)
  }

  submitEnabledStatus (status) {
    let component = $(this.submit)
    component.disabled = status
    return component.disabled
  }

  firstValidInvitation () {
    let component = $(this.involved )
    let divValidBox = component.$('div div:not(.invalidBox)')
    return divValidBox.getText()
  }

  firstInvalidInvitation () {
    let component = $(this.involved )
    let divValidBox = component.$('div .invalidBox')
    return divValidBox.getText()
  }

  identifyProposer (mail) {
    let component = $(this.proposer)
    let input = component.$('input')
    input.setValue(mail)
    browser.click('body')
  }

  pasteProposer (mail) {
    browser.execute(() => {
      let inputElement = document.createElement('input')
      inputElement.setAttribute('id', 'paste-area')
      document.body.appendChild(inputElement)
    })
    let input = $('#paste-area')
    let proposer = $('#proposer input')
    input.setValue(mail)
    this.selectAll()
    this.copyToClipboard()
    browser.click('#proposer input')
    this.pasteFromClipboard()
    browser.click('#proposal input')
    return proposer.getText()
  }

  isProposerInvalid () {
    let classes = $(this.proposer).getAttribute('class')
    return classes.includes('invalid')
  }

  proposalIsMarkedForPaste () {
    let element = $(this.proposal).getAttribute('class')
    return element
  }

  existCloseButton () {
    let component = $(this.involved )
    let divValidBox = component.$('div div')
    return divValidBox.getHTML().includes('<button')
  }

  clickClose () {
    browser.click('.close')
  }

  existEmailValid () {
    return browser.isExisting('.involved-list div:not(.invalidBox)')
  }
  anyEmail(){
    return browser.isExisting('.involved-list div')
  }

  addAndCutFromGuestsEmail (proposal) {
    let component = $(this.involved )
    let input = component.$('input')
    input.setValue(proposal)
    browser.keys(['Control', 'ax', 'NULL'])
  }

  getTextPastedInProposal () {
    let component = $(this.proposal)
    browser.click(this.proposal)
    browser.keys(['Control', 'v', 'NULL'])
    let output = component.$('output')
    let textFromOutput = output.getText()
    return textFromOutput
  }

  pasteProposal (proposal) {
    browser.execute(() => {
      let inputElement = document.createElement('input')
      inputElement.setAttribute('id', 'paste-area')
      document.body.appendChild(inputElement)
    })
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
