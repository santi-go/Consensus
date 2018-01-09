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
<<<<<<< HEAD

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
=======
>>>>>>> 3703aa41002cd418712fb27c6034474f18d20ecf
})
