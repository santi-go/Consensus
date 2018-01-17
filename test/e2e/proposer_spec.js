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

  it('you can change the focus with the enter key', () => {
    let page = new Propose()
    let email = 'consensus@devscola.org'
    let componentId = '#proposer'

    page.inviteWithComponent(componentId, email)
    let keyEnter = '\uE007'
    page.putCharacterInComponent(componentId, keyEnter)
    let focus = browser.selector

    expect(focus).not.to.equal('#proposer')
  })
})

describe('When input characters', () => {
  it('checks you can not write two @', () => {
    let page = new Propose()
    let email = 'consensus@devscola.org'
    let componentId = '#proposer'

    page.inviteWithComponent(componentId, email)
    page.putCharacterInComponent(componentId, '@')
    let result = page.contentOfComponent(componentId)

    expect(result).to.equal('consensus@devscola.org')
  })
})
