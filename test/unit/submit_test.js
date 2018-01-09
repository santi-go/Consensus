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

/*
  xit('enable when proposer input is correct', () => {


    let status = SendPropose.toggleSubmitButton()

    expect(status).to.eq(true)
  })

  xit('enable when circle input is correct', () => {


    expect().to.eq()
  })

  xit('enable when proposal input is correct', () => {


    expect().to.eq()
  })
*/
})
