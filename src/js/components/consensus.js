import {Proposer} from '../views/proposer'
import {Involved} from '../views/involved'
import {Proposal} from '../views/proposal'
import {Send} from '../views/send'

import {Formatter} from '../libraries/formatter'
import {Bus} from '../infrastructure/bus'
import {Circle} from './circle'
import {ConsensusProposition} from './consensus_proposition'

export class Consensus {
  constructor(elementID){
    this.data = new ConsensusProposition()
    this.EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.circle = new Circle()
    this.initialize_views()
    this.listen(elementID)
  }

  initialize_views(){
    this.proposer = new Proposer()
    this.involved = new Involved()
    this.proposal = new Proposal()
    this.send = new Send()
  }

  listen(elementID){
    let element=document.getElementById(elementID)
    element.addEventListener(
      'proposer.check',
      this.checkForMail.bind(this))

    element.addEventListener(
      'circle.set',
      this.parseCircle.bind(this))

    element.addEventListener(
      'remove.from.circle',
      this.removeFromCircle.bind(this))

    element.addEventListener(
      'send.text',
       this.formatProposal.bind(this))

   element.addEventListener(
     'submit.proposal',
      this.submit.bind(this))
  }

  submit(event){
    Bus.publish('submit.proposal',this.data.asObject())
  }

  formatProposal(event){
      let proposal = Formatter.formatText(event.detail)
      this.proposal.render(proposal)
      this.data.setProposal(proposal)
      this.checkSubmitable()
  }

  parseCircle(event){
      this.circle.extractMails(event.detail)
      this.involved.render(this.circle.circle)
      this.data.setCircle(this.circle.involved())
      this.checkSubmitable()
  }

  removeFromCircle(event){
    this.circle.removeEmail(event.detail)
    this.involved.render(this.circle.circle)
    this.data.setCircle(this.circle.involved())
    this.checkSubmitable()
  }

  checkForMail(event){
    let mail = event.detail
    let proposer = null
    let valid=false
    if (this.validateEmail(mail)){
      proposer = mail
      valid = true
    }
    this.data.setProposer(proposer)
    this.proposer.setValidity(valid)
    this.checkSubmitable()
  }


  checkSubmitable(){
    this.send.toggleSubmit(this.data.isSubmitable())
  }

  validateEmail (email) {
    if (email.trim() === '') return true
    let validated = this.EMAIL_PATTERN.test(email)
    if (validated) {
      this.proposerEmail = email
    }
    return validated
  }
}
