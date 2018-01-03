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
