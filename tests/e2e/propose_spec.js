var assert = require('chai').assert
var expect = require('chai').expect

describe('Identify proposer', () => {

  it('accepts valid mails', () => {
    let page = new Propose()
    let validMail = "hola@devscola.org"

    page.identifyProposer(validMail)

    expect(page.isProposerInvalid()).to.be.false
  })

  it(`doesn't accepts invalid mails`, () => {
    page = new Propose()
    let invalidMail = "errordecorreo"

    page.identifyProposer(invalidMail)

    expect(page.isProposerInvalid()).to.be.true
  })

})

class Propose {
  constructor() {
    browser.url('/')
  }
  identifyProposer(mail) {
    let component = $('#proposer-email')
    let input = component.$('input')

    input.setValue(mail)
    browser.click('body')
  }
  isProposerInvalid() {
    let classes = $('#proposer-email').getAttribute('class')
    return classes.includes('invalid')
  }
}
