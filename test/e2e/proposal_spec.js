var expect = require('chai').expect
let Propose = require('./page-object/propose')

describe('The proposal', () => {

  it('does not remove boxes when click enter on proposal', () => {
    let validMail = 'valid@mail.com'
    let page = new Propose()

    page.inviteWithComponent(page.involved,validMail)
    page.pressTab()

    page.pressEnterWithComponent(page.proposal)

    expect(page.firstValidInvitation()).to.include(validMail)
  })

  it('has a visual clue when you hoover on top in order to paste', () => {
    let page = new Propose()

    expect(page.proposalIsMarkedForPaste()).to.not.equal(null)
  })

  it('once it is pasted, allows HTML tags but appears without them', () => {
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
