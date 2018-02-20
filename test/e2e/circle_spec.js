var expect = require('chai').expect
let Propose = require('./page-object/propose')

describe('The circle', () => {

  it('allows the input of emails', () => {
    let validMail = 'valid@mail.com'
    let page = new Propose()

    page.inviteWithComponent(page.involved,validMail)
    page.pressTab()

    expect(page.firstValidInvitation()).to.include(validMail)
  })

  it('detects an invalid attempt of adding a member email', () => {
    let invalidMail = 'invalidMail'
    let page = new Propose()

    page.inviteWithComponent(page.involved,invalidMail)
    page.pressTab()

    expect(page.firstInvalidInvitation()).to.include(invalidMail)
  })

  it('parses emails separated by commas and spaces', () => {
    let validMail = 'valid@mail.com'
    let invalidMail = 'invalidMail'
    let mails = validMail + ', ' + invalidMail
    let page = new Propose()

    page.inviteWithComponent(page.involved,mails)
    page.pressTab()

    expect(page.firstValidInvitation()).to.include(validMail)
    expect(page.firstInvalidInvitation()).to.include(invalidMail)
  })

  it('allows you to delete an inserted email by pressing the X button', () => {
    let validMail = 'valid@mail.com'
    let page = new Propose()

    page.inviteWithComponent(page.involved,validMail)
    page.pressTab()

    expect(page.existCloseButton()).to.be.true
    page.clickClose()
    expect(page.anyEmail()).to.be.false
  })

  it('allows you to clear the input with the enter key', () => {
    let page = new Propose()
    let email = 'hola@devscola.org'
    let keyEnter = '\uE007'

    page.inviteWithComponent(page.involved,email)
    page.putCharacterInComponent(page.involved,keyEnter)

    expect(page.contentOfComponent(page.involved)).to.equal('')
  })

  it('allows you to clear the input with the comma key', () => {
    let page = new Propose()
    let email = 'hola@devscola.org'
    let keyComma = '\u002C'

    page.inviteWithComponent(page.involved,email)
    page.putCharacterInComponent(page.involved,keyComma)

    expect(page.contentOfComponent(page.involved)).to.equal('')
  })

  it('deletes only one email box when you click on it', () => {
    let page = new Propose()
    let email = 'hola@devscola.org'
    let keyComma = '\u002C'

    page.inviteWithComponent(page.involved,email)
    page.putCharacterInComponent(page.involved,keyComma)
    page.inviteWithComponent(page.involved,email)
    page.putCharacterInComponent(page.involved,keyComma)
    page.clickClose()

    expect(page.existEmailValid()).to.be.true
  })
})
