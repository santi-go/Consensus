var expect = require('chai').expect
let Propose = require('./page-object/propose')

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

  it('deletes only one email box when you click on it', () => {
    let page = new Propose()
    let email = 'hola@devscola.org'

    page.invite(email)
    page.pressComma()
    page.invite(email)
    page.pressComma()
    page.clickClose()

    expect(page.existEmailValid()).to.be.true
  })
})
