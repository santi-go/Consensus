var expect = require('chai').expect
let Propose = require('./page-object/propose')

describe('The submit button', () => {
  it('launches the proposal to system', () => {
    let page = new Propose()
    let proposal = 'A new proposal is here'
    let proposer = 'user@user.es'
    let circle = 'user@user.es'

    page.addAndCutFromGuestsEmail(proposal)
    page.getTextPastedInProposal()
    page.pressTab()
    page.identifyProposer(proposer)
    page.inviteWithComponent(page.involved,circle)
    page.pressTab()
    page.clickSubmit()

    expect(page.confirmSuccessful()).to.be.true
  })

  it('is enabled when proposer is correct', () => {
    let page = new Propose()
    let email = 'hola@devscola.org'

    page.identifyProposer(email)
    let invalid = page.isProposerInvalid()

    expect(page.submitEnabledStatus(invalid)).to.be.false
  })

  it('is disabled when proposer is incorrect', () => {
    let page = new Propose()
    let email = 'hola@devscola'

    page.identifyProposer(email)
    let invalid = page.isProposerInvalid()

    expect(page.submitEnabledStatus(invalid)).to.be.true
  })
})
