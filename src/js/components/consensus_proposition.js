export class ConsensusProposition {
  constructor() {
  }

  setCircle(circle){
    this.circle = circle
  }

  setProposer(proposer){
    this.proposer = proposer
  }

  setProposal(proposal){
    this.proposal = proposal
  }

  isSubmitable(){
    let hasData=(this.proposer && this.proposal)
    let hasInvolved = ( this.circle && this.circle.length > 0 )
    return hasData && hasInvolved
  }

  asObject(){
    return {
      'proposer':this.proposer,
      'proposal':this.proposal,
      'circle':this.circle
    }
  }

}
