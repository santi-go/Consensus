export default class ConsensusProposition {
  constructor () {
    this.proposer = false
    this.proposal = false
    this.circle = []
    this.showBadMail = false
    this.submittable = false
  }

  setCircle (circle) {
    this.circle = circle
  }

  setProposer (proposer) {
    this.proposer = proposer
  }

  setProposal (proposal) {
    this.proposal = proposal
  }

  checkSubmitable () {
    let hasData = (this.proposer && this.proposal)
    let hasInvolved = (this.circle.length > 0)
    this.submittable = hasData && hasInvolved
    return this.submittable
  }

  asObject () {
    return {
      'proposer': this.proposer,
      'proposal': this.proposal,
      'circle': this.circle
    }
  }
}
