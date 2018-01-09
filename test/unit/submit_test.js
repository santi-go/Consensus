var expect = require('chai').expect

var {SendPropose} = require('../../src/js/send_propose')
var {Circle} = require('../../src/js/circle')

describe('The submit button', () => {
  it('is enabled when proposer, circle and proposal fields are correctly added', () => {
    SendPropose.validateField("proposer", true)
    Circle.addEmailToCircle({ 'email': 'user@devscola.org', 'valid': true, 'id': 0 })
    SendPropose.validateField("circle", true)
    let disabledValue = SendPropose.validateField("proposal", true)

    expect(disabledValue).to.be.false
  })
})
