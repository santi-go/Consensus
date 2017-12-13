var assert = require('chai').assert
var expect = require('chai').expect

var {Proposer} = require('../../src/js/proposer')
var {Proposal} = require('../../src/js/proposal')

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

  it('not allows to push a character not included in local pattern if the email has not @', function(){
    let text = '##hola'
    let pushedCharacter = '¬'
    let positionOfNewCharacter = 0
    let isValid = Proposer.isAllowedIn(text, pushedCharacter, positionOfNewCharacter)
    expect(isValid).to.equal(null);
  });

  it('not allows to push a character not included in domain pattern if the email has @', function(){
    let text = '##hola@'
    let pushedCharacter = '%'
    let positionOfNewCharacter = 7
    let isValid = Proposer.isAllowedIn(text, pushedCharacter, positionOfNewCharacter)
    expect(isValid).to.equal(null);
  });

  it('allows to push local-pattern-characters in local if the email has @', function(){
    let text = '##hola@'
    let pushedCharacter = '%'
    let positionOfNewCharacter = 0
    let isValid = Proposer.isAllowedIn(text, pushedCharacter, positionOfNewCharacter)
    expect(isValid).to.not.equal(null);
  });

  it('not allows to push more than 1 @', function(){
    let text = '##hola@'
    let pushedCharacter = '@'
    let positionOfNewCharacter = 0
    let isValid = Proposer.isAllowedIn(text, pushedCharacter, positionOfNewCharacter)
    expect(isValid).to.equal(null);
  });
});

describe('Proposal', function(){

  it('sanitized text', function(){
    let HTMLText = '<h1>Devscola</h1>'
    expect(Proposal.sanitize(HTMLText)).to.equal('Devscola');
    HTMLText = '<h1>Devscola</h1'
    expect(Proposal.sanitize(HTMLText)).to.equal('Devscola</h1');
    HTMLText = '<p>Devscola</p><span> Como estas!!</span>'
    expect(Proposal.sanitize(HTMLText)).to.equal('Devscola Como estas!!');
    HTMLText = '<br>Devscola'
    expect(Proposal.sanitize(HTMLText)).to.equal('Devscola');
  });

  it('adds <br> when is necessary', function(){
    let text = ''
    let HTMLText = Proposal.addTag(text)

    expect(HTMLText).to.equal('<br>\n');

  });

  it('adds <p> when is necessary', function(){ 
    let text = 'Devscola'
    let HTMLText = Proposal.addTag(text)

    expect(HTMLText).to.equal('<p>Devscola</p>\n');
    
  });
  
});
