var expect = require('chai').expect

describe('When identifying the proposer', () => {
  it('it accepts valid emails', () => {
    let page = new Propose()
    let validMail = 'hola@devscola.org'

    page.identifyProposer(validMail)

    expect(page.isProposerInvalid()).to.be.false
  })

  it(`it doesn't accept invalid emails`, () => {
    let page = new Propose()
    let invalidMail = 'errordecorreo'

    page.identifyProposer(invalidMail)

    expect(page.isProposerInvalid()).to.be.true
  })
})

describe('The proposal', () => {
  it('has a visual clue when you hoover on top in order to paste', () => {
    let page = new Propose()
    expect(page.proposalIsMarkedForPaste()).to.not.equal(null)
  })

  it('once it is pasted, allows HTML tags but appears whitout them', () => {
    let page = new Propose()
    let proposal = '<p>textwithoutHTML</p>'
    let textWithoutHTML = 'textwithoutHTML'

    let textProposal = page.pasteProposal(proposal)

    expect(textProposal).to.equal(textWithoutHTML)
  })

  it('is shown in the box when is pasted', () => {
    let page = new Propose()
    let theText = 'A new proposal is here'

    page.addAndCutFromGuestsEmail(theText)
    let textInTheBox = page.getTextPastedInProposal()

    expect(textInTheBox).to.be.eq(theText)
  })
})

describe('When involving a circle member', () => {
  it('it allows the input of emails', () => {
    let validMail = 'valid@mail.com'
    let page = new Propose()

    page.invite(validMail)
    page.lostFocusOnInvited()

    expect(page.firstValidInvitation()).to.include(validMail)
  })

  it('it detects an invalid attempt of adding a member email', () => {
    let invalidMail = 'invalidMail'
    let page = new Propose()

    page.invite(invalidMail)
    page.lostFocusOnInvited()

    expect(page.firstInvalidInvitation()).to.include(invalidMail)
  })

  it('it parses emails separated by commas and spaces', () => {
    let validMail = 'valid@mail.com'
    let invalidMail = 'invalidMail'
    let mails = validMail + ', ' + invalidMail
    let page = new Propose()

    page.invite(mails)
    page.lostFocusOnInvited()

    expect(page.firstValidInvitation()).to.include(validMail)
    expect(page.firstInvalidInvitation()).to.include(invalidMail)
  })

  it('you can delete an inserted email by pressing the X button', () => {
    let validMail = 'valid@mail.com'
    let page = new Propose()

    page.invite(validMail)
    page.lostFocusOnInvited()

    expect(page.existCloseButton()).to.be.true
    browser.click('.close')
    expect($('div .validBox').value).to.be.null
  })

  it('you can clear the input with the enter key', () => {
    let page = new Propose()
    let email = 'hola@devscola.org'
    page.invite(email)
    page.pressEnter()
    expect(page.inputValue()).to.equal('')
  })

  it('you can clear the input with the comma key', () => {
    let page = new Propose()
    let email = 'hola@devscola.org'
    page.invite(email)
    page.pressComma()
    expect(page.inputValue()).to.equal('')
  })
})

class Propose {
  constructor () {
    browser.url('/')
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
    let element = $('#proposal').getAttribute('tabindex')
    return element
  }
  existCloseButton () {
    let component = $('#circle-email')
    let divValidBox = component.$('div div')

    return divValidBox.getHTML().includes('<button')
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
    let input = $('#circle-email input')
    let output = $('#proposal output')

    input.setValue(proposal)
    this.selectAll()
    this.copyToClipboard()
    browser.click('#proposal pre')
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
