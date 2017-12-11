var assert = require('chai').assert
var expect = require('chai').expect

var {Email} = require('../src/js/proposer.js')
console.log(Email)
describe('Email', () => {
  it('accepts valid email', () => {
    let validEmail="info@dedd.es"
    let proposer = new Email(validEmail)
    let result = proposer.validateEmail()
    expect(result).to.be.true
  });
});
