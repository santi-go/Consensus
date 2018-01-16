var expect = require('chai').expect

var {Circle} = require('../../src/js/components/circle')

describe('The Involved field', () => {
  let circle = new Circle()
  context('recognizes an email as', () => {
    it('valid', function () {
      let validEmail = 'hola@devscola.org'

      let isValid = circle.validateEmail(validEmail)

      expect(isValid).to.be.true
    })

    it('invalid', () => {
      let invalidEmail = 'invalid.email'

      let result = circle.validateEmail(invalidEmail)

      expect(result).to.equal(false)
    })
  })

  context('recognizes a list of emails', () => {
    it('by breaking the emails appart using spaces', () => {
      let chainGuestEmails = 'invalid.email hola@samuel.com'

      let result = circle.tokenize(chainGuestEmails)

      expect(result[0]).to.equal('invalid.email hola@samuel.com')
    })

    it('by breaking the emails appart by commas', () => {
      let chainGuestEmails = 'invalid.email, valid_with_spaces_prefix@domain.com,valid_with_spaces_suffix@domain.com ,valid@domain.com'

      let result = circle.tokenize(chainGuestEmails)

      expect(result.length).to.equal(4)
      expect(result[3]).to.equal('valid@domain.com')
    })

    it('by removing empty chains', () => {
      let chainGuestEmails = ' ,,,, , , ,,, , ,       ,valid@domain.com'

      let result = circle.tokenize(chainGuestEmails)

      expect(result[0]).to.equal('valid@domain.com')
    })
  })
})
