var expect = require('chai').expect

var {Proposer} = require('../../src/js/proposer')
var {Proposal} = require('../../src/js/proposal')
var {Involved} = require('../../src/js/involved')

describe('Proposer', function () {
  it('accepts valid email', function () {
    let validEmail = 'hola@devscola.org'
    let isValid = Proposer.validateEmail(validEmail)
    expect(isValid).to.be.true
  })

  it('does not accept invalid email', function () {
    let invalidEmail = 'holadevscola.org'
    let isValid = Proposer.validateEmail(invalidEmail)
    expect(isValid).to.be.false
  })

  context('when gets a character ', () => {
    it('does not allow more than an @', function () {
      let text = '##hola@'
      let pushedCharacter = '@'
      let positionOfNewCharacter = 0

      let isValid = Proposer.isAllowedIn(text, pushedCharacter, positionOfNewCharacter)

      expect(isValid).to.equal(null)
    })

    context('in the domain pattern', () => {
      it('does not allow invalid characters', function () {
        let text = '##hola@'
        let pushedCharacter = '%'
        let positionOfNewCharacter = 7

        let isValid = Proposer.isAllowedIn(text, pushedCharacter, positionOfNewCharacter)

        expect(isValid).to.equal(null)
      })
    })

    context('in the local pattern', () => {
      it('does not allow invalid characters', function () {
        let text = '##hola'
        let pushedCharacter = '¬'
        let positionOfNewCharacter = 0

        let isValid = Proposer.isAllowedIn(text, pushedCharacter, positionOfNewCharacter)

        expect(isValid).to.equal(null)
      })

      it('allows valid characters', function () {
        let text = '##hola@'
        let pushedCharacter = '%'
        let positionOfNewCharacter = 0

        let isValid = Proposer.isAllowedIn(text, pushedCharacter, positionOfNewCharacter)

        expect(isValid).to.not.equal(null)
      })
    })
  })
})

describe('Proposal', function () {
  it('sanitizes text', function () {
    let textWithLabels = '<h1>Devscola</h1> <h1>Devscola</h1 <p>Devscola</p><span> Como estas!!</span> <br>Devscola'
    let sanitizedText = 'Devscola DevscolaDevscola Como estas!! Devscola'

    let result = Proposal.sanitize(textWithLabels)

    expect(result).to.equal(sanitizedText)
  })

  context('adds tag', () => {
    it('new line for an empty text', function () {
      let text = ''

      let HTMLText = Proposal.addTag(text)

      expect(HTMLText).to.equal('<br>\n')
    })

    it('paragraph for a text', function () {
      let text = 'Devscola'

      let HTMLText = Proposal.addTag(text)

      expect(HTMLText).to.equal('<p>Devscola</p>\n')
    })
  })
})

describe('Involved', () => {
  context('recognizes an email as', () => {
    it('valid', function () {
      let validEmail = 'hola@devscola.org'

      let isValid = Involved.validateEmail(validEmail)

      expect(isValid).to.be.true
    })

    it('invalid', () => {
      let invalidEmail = 'invalid.email'

      let result = Involved.validateEmail(invalidEmail)

      expect(result).to.equal(false)
    })
  })

  context('recognizes a list of emails', () => {
    it('as an email if breacked by spaces', () => {
      let chainGuestEmails = 'invalid.email hola@samuel.com'

      let result = Involved.tokenize(chainGuestEmails)

      expect(result[0]).to.equal('invalid.email hola@samuel.com')
    })

    it('breaked by commas', () => {
      let chainGuestEmails = 'invalid.email, valid_with_spaces_prefix@domain.com,valid_with_spaces_suffix@domain.com ,valid@domain.com'

      let result = Involved.tokenize(chainGuestEmails)

      expect(result.length).to.equal(4)
      expect(result[3]).to.equal('valid@domain.com')
    })

    it('removing the empty chains', () => {
      let chainGuestEmails = ' ,,,, , , ,,, , ,       ,valid@domain.com'

      let result = Involved.tokenize(chainGuestEmails)

      expect(result[0]).to.equal('valid@domain.com')
    })
  })
})
