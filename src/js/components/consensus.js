import {Proposer} from '../views/proposer'
import {Involved} from '../views/involved'
import {Proposal} from '../views/proposal'
import {Send} from '../views/send'

import {Formatter} from '../libraries/formatter'
import {Bus} from '../infrastructure/bus'
import {Circle} from './circle'

export class Consensus {
  constructor(elementID){
    this.data = {}
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
    Bus.publish('submit.proposal',this.data)
  }

  formatProposal(event){
      this.data.proposal = Formatter.formatText(event.detail)
      this.proposal.render(this.data.proposal)
      this.checkSubmitable()
  }

  parseCircle(event){
      this.circle.extractMails(event.detail)
      this.involved.render(this.circle.circle)
      this.checkSubmitable()
  }

  removeFromCircle(event){
    this.circle.removeEmail(event.detail)
    this.involved.render(this.circle.circle)
    this.checkSubmitable()
  }

  checkForMail(event){
    let mail = event.detail
    this.data.proposer = null
    let valid=false
    if (this.validateEmail(mail)){
      this.data.proposer = mail
      valid = true
    }
    this.proposer.setValidity(valid)
    this.checkSubmitable()
  }


  checkSubmitable(){
    let submitable=(this.data.proposer && this.data.proposal && this.circle.hasMembers())
    this.send.toggleSubmit(submitable)
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
