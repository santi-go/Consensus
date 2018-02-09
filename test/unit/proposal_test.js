var expect = require('chai').expect

var {Formatter} = require('../../src/js/libraries/formatter')

describe('The proposal field', function () {
  it('sanitizes the text', function () {
    let textWithLabels = '<h1>Devscola</h1> <h1>Devscola</h1 <p>Devscola</p><span> Como estas!!</span> <br>Devscola'
    let sanitizedText = 'Devscola DevscolaDevscola Como estas!! Devscola'

    let result = Formatter.sanitize(textWithLabels)

    expect(result).to.equal(sanitizedText)
  })

  context('adds tags', () => {
    it('of a new line for an empty input line', function () {
      let text = ''

      let HTMLText = Formatter.addTag(text)

      expect(HTMLText).to.equal('<br>\n')
    })

    it('of paragraphs for a text blocks', function () {
      let text = 'Devscola'

      let HTMLText = Formatter.addTag(text)

      expect(HTMLText).to.equal('<p>Devscola</p>\n')
    })
  })

  it('saves the proposal', function () {
    let text = 'Lorem impsum'

    let result = Formatter.addBlockTags(text)

    expect(result).to.be.equal('<p>' + text + '</p>\n')
  })
})
