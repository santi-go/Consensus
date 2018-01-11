var expect = require('chai').expect

var {SendPropose} = require('../../src/js/send_propose')

var {Circle} = require('../../src/js/components/controller')

describe('The submit button', () => {
  let sendPropose = new SendPropose()
  let circle = new Circle()
  it('is enabled when proposer, circle and proposal fields are correctly added', () => {
    sendPropose.validateField("proposer", true)
    circle.addEmailToCircle({ 'email': 'user@devscola.org', 'valid': true, 'id': 0 })
    sendPropose.validateField("circle", 1)
    let disabledValue = sendPropose.validateField("proposal", true)

    expect(disabledValue).to.be.false
  })
})
