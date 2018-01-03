var expect = require('chai').expect
let Propose = require('./page-object/propose')

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

describe('The submit button', () => {
  it('launch the proposal to system', () => {
    let page = new Propose()

    let proposal = 'A new proposal is here'
    page.addAndCutFromGuestsEmail(proposal)
    page.getTextPastedInProposal()
    let proposer = 'raul@cuchame.es'
    page.identifyProposer(proposer)
    let circle = 'raul@cuchame.es'
    page.invite(circle)
    page.lostFocusOnInvited()
    page.clickSubmit()

    expect(page.confirmSuccessful()).to.be.true
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
    page.clickClose()
    expect(page.existEmailValid()).to.be.false
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
