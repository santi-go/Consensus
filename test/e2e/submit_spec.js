var expect = require('chai').expect
let Propose = require('./page-object/propose')

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
