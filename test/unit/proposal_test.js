var expect = require('chai').expect

var {Proposal} = require('../../src/js/proposal')

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

    let result = Proposal.addBlockTags(proposal)

    expect(result).to.be.equal('<p>' + proposal + '</p>\n')
  })
})
