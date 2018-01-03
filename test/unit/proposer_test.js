var expect = require('chai').expect

var {MailChecker} = require('../../src/js/mail_checker')
var {ProposerLogic} = require('../../src/js/proposer_logic')

describe('The proposer field', function () {
  it('accepts a valid email', function () {
    let validEmail = 'hola@devscola.org'
    let isValid = ProposerLogic.validateEmail(validEmail)
    expect(isValid).to.be.true
  })

  it('does not accept an invalid email', function () {
    let invalidEmail = 'holadevscola.org'
    let isValid = ProposerLogic.validateEmail(invalidEmail)
    expect(isValid).to.be.false
  })

  context('upon receiving a @ character ', () => {
    it('it does not allow to introduce more @ characters', function () {
      let text = '##hola@'
      let pushedCharacter = '@'
      let positionOfNewCharacter = 0

      let isValid = MailChecker.isAllowedIn(text, pushedCharacter, positionOfNewCharacter)

      expect(isValid).to.equal(null)
    })

    context('in the domain pattern', () => {
      it('does not allow invalid characters', function () {
        let text = '##hola@'
        let pushedCharacter = '%'
        let positionOfNewCharacter = 7

        let isValid = MailChecker.isAllowedIn(text, pushedCharacter, positionOfNewCharacter)

        expect(isValid).to.equal(null)
      })
    })

    context('in the local pattern', () => {
      it('does not allow invalid characters', function () {
        let text = '##hola'
        let pushedCharacter = '¬'
        let positionOfNewCharacter = 0

        let isValid = MailChecker.isAllowedIn(text, pushedCharacter, positionOfNewCharacter)

        expect(isValid).to.equal(null)
      })

      it('allows valid characters', function () {
        let text = '##hola@'
        let pushedCharacter = '%'
        let positionOfNewCharacter = 0

        let isValid = MailChecker.isAllowedIn(text, pushedCharacter, positionOfNewCharacter)

        expect(isValid).to.not.equal(null)
      })
    })
  })

  it('save the mail', function () {
    let proposer = 'consensus@devscola.org'

    ProposerLogic.validateEmail(proposer)
    let result = ProposerLogic.proposerEmail

    expect(result).to.be.equal(proposer)
  })
})
