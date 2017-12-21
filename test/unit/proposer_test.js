var expect = require('chai').expect

var {Proposer} = require('../../src/js/proposer')
var {Proposal} = require('../../src/js/proposal')
var {Involved} = require('../../src/js/involved')
var {SendPropose} = require('../../src/js/send_propose')

describe('The proposer field', function () {
  it('accepts a valid email', function () {
    let validEmail = 'hola@devscola.org'
    let isValid = Proposer.validateEmail(validEmail)
    expect(isValid).to.be.true
  })

  it('does not accept an invalid email', function () {
    let invalidEmail = 'holadevscola.org'
    let isValid = Proposer.validateEmail(invalidEmail)
    expect(isValid).to.be.false
  })

  context('upon receiving a @ character ', () => {
    it('it does not allow to introduce more @ characters', function () {
      let text = '##hola@'
      let pushedCharacter = '@'
      let positionOfNewCharacter = 0

      let isValid = Proposer.isAllowedIn(text, pushedCharacter, positionOfNewCharacter)

      expect(isValid).to.equal(null)
    })

    context('in the domain pattern', () => {
      it('does not allow invalid characters', function () {
        let text = '##hola@'
        let pushedCharacter = '%'
        let positionOfNewCharacter = 7

        let isValid = Proposer.isAllowedIn(text, pushedCharacter, positionOfNewCharacter)

        expect(isValid).to.equal(null)
      })
    })

    context('in the local pattern', () => {
      it('does not allow invalid characters', function () {
        let text = '##hola'
        let pushedCharacter = '¬'
        let positionOfNewCharacter = 0

        let isValid = Proposer.isAllowedIn(text, pushedCharacter, positionOfNewCharacter)

        expect(isValid).to.equal(null)
      })

      it('allows valid characters', function () {
        let text = '##hola@'
        let pushedCharacter = '%'
        let positionOfNewCharacter = 0

        let isValid = Proposer.isAllowedIn(text, pushedCharacter, positionOfNewCharacter)

        expect(isValid).to.not.equal(null)
      })
    })
  })

  it('save the mail', function () {
    let proposer = 'consensus@devscola.org'

    Proposer.validateEmail(proposer)
    let result = Proposer.proposerEmail

    expect(result).to.be.equal(proposer)
  })
})

describe('The proposal field', function () {
  it('sanitizes the text', function () {
    let textWithLabels = '<h1>Devscola</h1> <h1>Devscola</h1 <p>Devscola</p><span> Como estas!!</span> <br>Devscola'
    let sanitizedText = 'Devscola DevscolaDevscola Como estas!! Devscola'

    let result = Proposal.sanitize(textWithLabels)

    expect(result).to.equal(sanitizedText)
  })

  context('adds tags', () => {
    it('of a new line for an empty input line', function () {
      let text = ''

      let HTMLText = Proposal.addTag(text)

      expect(HTMLText).to.equal('<br>\n')
    })

    it('of paragraphs for a text blocks', function () {
      let text = 'Devscola'

      let HTMLText = Proposal.addTag(text)

      expect(HTMLText).to.equal('<p>Devscola</p>\n')
    })
  })

  it('save the proposal', function () {
    let proposal = 'Lorem impsum'

    Proposal.addBlockTags(proposal)
    let result = Proposal.proposalContent

    expect(result).to.be.equal('<p>' + proposal + '</p>\n')
  })
})

describe('The Involved field', () => {
  context('recognizes an email as', () => {
    it('valid', function () {
      let validEmail = 'hola@devscola.org'

      let isValid = Involved.validateEmail(validEmail)

      expect(isValid).to.be.true
    })

    it('invalid', () => {
      let invalidEmail = 'invalid.email'

      let result = Involved.validateEmail(invalidEmail)

      expect(result).to.equal(false)
    })
  })

  context('recognizes a list of emails', () => {
    it('by breaking the emails appart using spaces', () => {
      let chainGuestEmails = 'invalid.email hola@samuel.com'

      let result = Involved.tokenize(chainGuestEmails)

      expect(result[0]).to.equal('invalid.email hola@samuel.com')
    })

    it('by breaking the emails appart by commas', () => {
      let chainGuestEmails = 'invalid.email, valid_with_spaces_prefix@domain.com,valid_with_spaces_suffix@domain.com ,valid@domain.com'

      let result = Involved.tokenize(chainGuestEmails)

      expect(result.length).to.equal(4)
      expect(result[3]).to.equal('valid@domain.com')
    })

    it('by removing empty chains', () => {
      let chainGuestEmails = ' ,,,, , , ,,, , ,       ,valid@domain.com'

      let result = Involved.tokenize(chainGuestEmails)

      expect(result[0]).to.equal('valid@domain.com')
    })
  })
})

describe('The circle', () => {
  it('is updated when the user changes the invited mails', () => {
    Involved.addEmailToCircle('user@devscola.org')
    Involved.addEmailToCircle('invalid.mail')
    Involved.addEmailToCircle('consensus@devscola.org')
    Involved.removeEmailFromCircle('user@devscola.org')

    let result = Involved.circle

    expect(result.toString()).to.equal(['invalid.mail', 'consensus@devscola.org'].toString())
  })
})

describe('Call to action', () => {
  it('send proposal and read a response status 200', () => {
    let url = 'http://consensus:80/index.html'
    let data = 'A little proposal for consensus'
    SendPropose.get(url, data)
      .then((result) => {
        expect(result.status).to.equal(200)
      })
      .catch((message) => {
        console.log(message)
        expect(message).to.equal('[Error: Connection Error]')
      })
  })

  context('send proposal', () => {
    let jsontosend
    let packagedData
    beforeEach(function () {
      let proposer = 'consensus@devscola.org'
      Proposer.validateEmail(proposer)

      Involved.addEmailToCircle('user@devscola.org')
      Involved.addEmailToCircle('consensus@devscola.org')

      let proposal = 'Lorem impsum'
      Proposal.addBlockTags(proposal)

      jsontosend = SendPropose.packaging(Proposer.proposerEmail, Involved.circle, Proposal.proposalContent)

      packagedData = {
        'proposer': Proposer.proposerEmail,
        'circle': Involved.circle,
        'proposal': Proposal.proposalContent
      }
    })

    it('preparing data', () => {
      expect(jsontosend.toString()).to.be.equal(packagedData.toString())
    })
    it('send to system', () => {
      let url = 'http://system:4567/'
      return SendPropose.get(url, jsontosend)
        .then((result) => { expect(result.status).to.equal(200) })
        .catch((message) => { expect(message).to.equal('[Error: Connection Error]') })
    })
  })
})
