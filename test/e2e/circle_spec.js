var expect = require('chai').expect
let Propose = require('./page-object/propose')

describe('When involving a circle member', () => {
  it('it allows the input of emails', () => {
    let validMail = 'valid@mail.com'
    let page = new Propose()

    page.inviteWithComponent('#circle-email',validMail)
    page.pressTab()

    expect(page.firstValidInvitation()).to.include(validMail)
  })

  it('it detects an invalid attempt of adding a member email', () => {
    let invalidMail = 'invalidMail'
    let page = new Propose()

    page.inviteWithComponent('#circle-email',invalidMail)
    page.pressTab()

    expect(page.firstInvalidInvitation()).to.include(invalidMail)
  })

  it('it parses emails separated by commas and spaces', () => {
    let validMail = 'valid@mail.com'
    let invalidMail = 'invalidMail'
    let mails = validMail + ', ' + invalidMail
    let page = new Propose()

    page.inviteWithComponent('#circle-email',mails)
    page.pressTab()

    expect(page.firstValidInvitation()).to.include(validMail)
    expect(page.firstInvalidInvitation()).to.include(invalidMail)
  })

  it('you can delete an inserted email by pressing the X button', () => {
    let validMail = 'valid@mail.com'
    let page = new Propose()

    page.inviteWithComponent('#circle-email',validMail)
    page.pressTab()

    expect(page.existCloseButton()).to.be.true
    page.clickClose()
    expect(page.existEmailValid()).to.be.false
  })

  it('you can clear the input with the enter key', () => {
    let page = new Propose()
    let email = 'hola@devscola.org'
    let keyEnter = '\uE007'

    page.inviteWithComponent('#circle-email',email)
    page.putCharacterInComponent('#circle-email',keyEnter)

    expect(page.contentOfComponent('#circle-email')).to.equal('')
  })

  it('you can clear the input with the comma key', () => {
    let page = new Propose()
    let email = 'hola@devscola.org'
    let keyComma = '\u002C'

    page.inviteWithComponent('#circle-email',email)
    page.putCharacterInComponent('#circle-email',keyComma)

    expect(page.contentOfComponent('#circle-email')).to.equal('')
  })

  it('deletes only one email box when you click on it', () => {
    let page = new Propose()
    let email = 'hola@devscola.org'
    let keyComma = '\u002C'

    page.inviteWithComponent('#circle-email',email)
    page.putCharacterInComponent('#circle-email',keyComma)
    page.inviteWithComponent('#circle-email',email)
    page.putCharacterInComponent('#circle-email',keyComma)
    page.clickClose()

    expect(page.existEmailValid()).to.be.true
  })
})
