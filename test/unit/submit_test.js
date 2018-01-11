var expect = require('chai').expect

var {SendPropose} = require('../../src/js/send_propose')

var {Circle} = require('../../src/js/components/controller')

describe('The fields validation', () => {
  let sendPropose = new SendPropose()
  let circle = new Circle()
  it('is true when proposer, circle and proposal fields are correctly added', () => {
    sendPropose.validateField("proposer", true)
    sendPropose.validateField("involved", true)
    let allValidFields = sendPropose.validateField("proposal", true)

    expect(allValidFields).to.be.true
  })

  it('is false when any field is not correct', () => {
    sendPropose.validateField("proposer", true)
    sendPropose.validateField("involved", false)
    let allValidFields = sendPropose.validateField("proposal", true)

    expect(allValidFields).to.be.false
  })
})
