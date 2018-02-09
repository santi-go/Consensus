var expect = require('chai').expect

var {MailChecker} = require('../../src/js/libraries/mail_checker')
var {MailValidator} = require('../../src/js/libraries/mail_validator')
import Circle from '../../src/js/components/circle'
import ConsensusProposition from '../../src/js/components/consensus_proposition'

describe('The proposer field', function () {
  it('accepts a valid email', function () {
    let circle = new Circle('proposer')
    let validEmail = 'hola@devscola.org'

    let isValid = circle.validateEmail(validEmail)

    expect(isValid).to.be.true
  })

  it('does not accept an invalid email', function () {
    let circle = new Circle('proposer')
    let invalidEmail = 'holadevscola.org'

    let isValid = circle.validateEmail(invalidEmail)

    expect(isValid).to.be.false
  })

  context('upon receiving a @ character ', () => {
    it('does not allow to introduce more @ characters', function () {
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

  it('saves the mail', function () {
    let proposer = 'consensus@devscola.org'
    let consensusProposition = new ConsensusProposition()

    let valid = MailValidator.validateEmail(proposer)
    consensusProposition.setProposer(proposer)

    let result = consensusProposition.proposer

    expect(result).to.be.equal(proposer)
  })
})
