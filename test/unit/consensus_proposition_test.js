var expect = require('chai').expect

var {ConsensusProposition} = require('../../src/js/components/consensus_proposition')

describe('A consensus proposition', () => {

  it('is submitable if all fields are added', ()=>{
    let consensusProposition = new ConsensusProposition()
    consensusProposition.setCircle(["sample@sample.com"])
    consensusProposition.setProposal("This is a string.")
    consensusProposition.setProposer("proposer@proposer.com")

    expect(consensusProposition.isSubmitable()).to.be.true
  })

  it('is not submitable if some field are not added', ()=>{
    let consensusProposition = new ConsensusProposition()
    consensusProposition.setCircle(["sample@sample.com"])

    expect(consensusProposition.isSubmitable()).to.be.false
  })
})
