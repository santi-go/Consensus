var expect = require('chai').expect

var {Circle} = require('../../src/js/circle')

describe('The circle', () => {
  it('is updated when the user changes the invited mails', () => {
    Circle.addEmailToCircle({ 'email': 'user@devscola.org', 'valid': true, 'id': 0 })
    Circle.addEmailToCircle({ 'email': 'invalid.mail', 'valid': false, 'id': 1 })
    Circle.addEmailToCircle({ 'email': 'consensus@devscola.org', 'valid': true, 'id': 2 })
    Circle.removeEmail({ 'email': 'user@devscola.org', 'id': 0 })

    let result = Circle.involved()

    expect(result[0]).to.eq('consensus@devscola.org')
  })
})
