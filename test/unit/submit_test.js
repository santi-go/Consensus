var expect = require('chai').expect

var {SendProposeLogic} = require('../../src/js/components/send_propose')
var {Circle} = require('../../src/js/components/controller')

describe('The fields validation', () => {
  let sendProposeLogic = new SendProposeLogic()
  let circle = new Circle()
  it('is true when proposer, circle and proposal fields are correctly added', () => {
    sendProposeLogic.validateField("proposer", true)
    sendProposeLogic.validateField("involved", true)
    let allValidFields = sendProposeLogic.validateField("proposal", true)

    expect(allValidFields).to.be.true
  })

  it('is false when any field is not correct', () => {
    sendProposeLogic.validateField("proposer", true)
    sendProposeLogic.validateField("involved", false)
    let allValidFields = sendProposeLogic.validateField("proposal", true)

    expect(allValidFields).to.be.false
  })
})
