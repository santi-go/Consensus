var expect = require('chai').expect

var {ProposalLogic} = require('../../src/js/controller')

describe('The proposal field', function () {
  it('sanitizes the text', function () {
    let textWithLabels = '<h1>Devscola</h1> <h1>Devscola</h1 <p>Devscola</p><span> Como estas!!</span> <br>Devscola'
    let sanitizedText = 'Devscola DevscolaDevscola Como estas!! Devscola'
    let proposal = new ProposalLogic()

    let result = proposal.sanitize(textWithLabels)

    expect(result).to.equal(sanitizedText)
  })

  context('adds tags', () => {
    it('of a new line for an empty input line', function () {
      let text = ''
      let proposal = new ProposalLogic()

      let HTMLText = proposal.addTag(text)

      expect(HTMLText).to.equal('<br>\n')
    })

    it('of paragraphs for a text blocks', function () {
      let text = 'Devscola'
      let proposal = new ProposalLogic()

      let HTMLText = proposal.addTag(text)

      expect(HTMLText).to.equal('<p>Devscola</p>\n')
    })
  })

  it('save the proposal', function () {
    let text = 'Lorem impsum'
    let proposal = new ProposalLogic()

    let result = proposal.addBlockTags(text)

    expect(result).to.be.equal('<p>' + text + '</p>\n')
  })
})
