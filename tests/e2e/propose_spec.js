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

describe('Proposal',()=>{
  it ('has a visual clue when you can paste', ()=>{
    page = new Propose()
    expect(page.proposalIsMarkedForPaste()).to.not.equal(null)
  })

})

describe('Inviting', ()=>{
  it('allows single mail', ()=>{
    let validMail = 'valid@mail.com'
    page = new Propose()

    page.invite(validMail)
    page.lostFocusOnInvited()

    expect(page.firstValidInvitation()).to.include(validMail)
  })

  it ('detects an invalid invitation', ()=>{
    let invalidMail = 'invalidMail'
    page = new Propose()

    page.invite(invalidMail)
    page.lostFocusOnInvited()

    expect(page.firstInvalidInvitation()).to.include(invalidMail)
  })

  it ('parses mails separated by comma', ()=>{
    let validMail = 'valid@mail.com'
    let invalidMail = 'invalidMail'
    let mails = validMail + ', ' + invalidMail
    page = new Propose()

    page.invite(mails)
    page.lostFocusOnInvited()

    expect(page.firstValidInvitation()).to.include(validMail)
    expect(page.firstInvalidInvitation()).to.include(invalidMail)
  })

  it ('has close button in invitation', ()=> {
    page = new Propose()
    let mail = 'valid@mail.com'

    page.invite(mail)
    page.lostFocusOnInvited()

    expect(page.existCloseButton()).to.be.true

  })

    it ('delete element to click X', ()=>{
      let invalidMail = 'invalidMail'
      page = new Propose()

      page.invite(invalidMail)
      page.lostFocusOnInvited()

      browser.click('.close')

      expect($('div .invalidBox').value).to.be.null

    })


})

class Propose {
  constructor() {
    browser.url('/')
  }
  invite(mail) {
    let component = $('#guests-email')
    let input = component.$('input')

    input.setValue(mail)
  }
  lostFocusOnInvited(){
    browser.click('#proposer-email')
  }
  firstValidInvitation(){
    let component = $('#guests-email')
    let divValidBox = component.$('div .validBox')

    return divValidBox.getText();
  }
  firstInvalidInvitation() {
    let component = $('#guests-email')
    let divValidBox = component.$('div .invalidBox')

    return divValidBox.getText();
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
  proposalIsMarkedForPaste(){
    let element = $('#proposal').getAttribute('tabindex')
    return element
  }
  existCloseButton() {
    let component = $('#guests-email')
    let divValidBox = component.$('div div .close')

    return divValidBox.getText().includes('x')
  }
}
