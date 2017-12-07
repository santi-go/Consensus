var assert = require('chai').assert
var expect = require('chai').expect

var {Invited} = require('../../src/js/invited')

describe('Invited', function(){
  it('where a collection of valid emails resulted when validated in one of them randomly being invalid', function(){
    let invalidMail = 'aa'
    let validMail = ' abc@abc.com'
    let collectionEmails = invalidMail + ',' + validMail + ',' + validMail + ',' + validMail + ',' + validMail

    let validatedMails = Invited.parseMail(collectionEmails)

    expect(validatedMails[0].valid).to.be.false;
    expect(validatedMails[1].valid).to.be.true;
    expect(validatedMails[2].valid).to.be.true;
    expect(validatedMails[3].valid).to.be.true;
    expect(validatedMails[4].valid).to.be.true;
  });
});
