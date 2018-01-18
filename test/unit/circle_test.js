var expect = require('chai').expect

import Circle from  '../../src/js/components/circle'

describe('The circle', () => {

  it('is updated when the user changes the invited mails', () => {
    let circle = new Circle()
    circle.addEmailToCircle({ 'email': 'user@devscola.org', 'valid': true, 'id': 0 })
    circle.addEmailToCircle({ 'email': 'invalid.mail', 'valid': false, 'id': 1 })
    circle.addEmailToCircle({ 'email': 'consensus@devscola.org', 'valid': true, 'id': 2 })
    circle.removeEmail({ 'email': 'user@devscola.org', 'id': 0 })

    let result = circle.involved()

    expect(result[0]).to.eq('consensus@devscola.org')
  })
})
