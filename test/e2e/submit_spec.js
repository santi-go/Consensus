var expect = require('chai').expect
let Propose = require('./page-object/propose')

describe('The submit button', () => {
  it('launch the proposal to system', () => {
    let page = new Propose()

    let proposal = 'A new proposal is here'
    page.addAndCutFromGuestsEmail(proposal)
    page.getTextPastedInProposal()
    page.lostFocusOnInvited()
    let proposer = 'user@user.es'
    page.identifyProposer(proposer)
    let circle = 'user@user.es'
    page.invite(circle)
    page.lostFocusOnInvited()
    page.clickSubmit()

    expect(page.confirmSuccessful()).to.be.true
  })

  it('enable when proposer is correct', () => {
    let page = new Propose()

    let email = 'hola@devscola.org'
    page.identifyProposer(email)
    let invalid = page.isProposerInvalid()


    expect(page.submitEnabledStatus(invalid)).to.be.false
  })

  it('disabled when proposer is incorrect', () => {
    let page = new Propose()

    let email = 'hola@devscola'
    page.identifyProposer(email)
    let invalid = page.isProposerInvalid()


    expect(page.submitEnabledStatus(invalid)).to.be.true
  })
})
