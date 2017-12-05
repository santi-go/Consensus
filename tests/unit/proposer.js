var assert = require('chai').assert
var expect = require('chai').expect

var {Proposer} = require('../../src/js/proposer')

describe('Proposer', function(){
  it('accepts valid email', function(){
    let validEmail = 'hola@devscola.org'
    let isValid = Proposer.validateEmail(validEmail)
    expect(isValid).to.be.true;
  });
  it('not accepts invalid email', function(){
    let invalidEmail = 'holadevscola.org'
    let isValid = Proposer.validateEmail(invalidEmail)
    expect(isValid).to.be.false;
  });

});
