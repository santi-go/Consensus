var expect = require('chai').expect

var {SendPropose} = require('../../src/js/send_propose')

var {Circle} = require('../../src/js/controller')

describe('The submit button', () => {
  let circle = new Circle()
  it('is enabled when proposer, circle and proposal fields are correctly added', () => {
    SendPropose.validateField("proposer", true)
    circle.addEmailToCircle({ 'email': 'user@devscola.org', 'valid': true, 'id': 0 })
    SendPropose.validateField("circle", 1)
    let disabledValue = SendPropose.validateField("proposal", true)

    expect(disabledValue).to.be.false
  })
})
