var expect = require('chai').expect

var {Circle} = require('../../src/js/circle')

describe('The circle', () => {
  it('is updated when the user changes the invited mails', () => {
    Circle.addEmailToCircle({'email': 'user@devscola.org', 'valid': true})
    Circle.addEmailToCircle({'email': 'invalid.mail', 'valid': false})
    Circle.addEmailToCircle({'email': 'consensus@devscola.org', 'valid': true})
    Circle.removeEmail('user@devscola.org')

    let result = Circle.involved()

    expect(result[0]).to.eq('consensus@devscola.org')
  })
})
