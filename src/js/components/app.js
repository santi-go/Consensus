import Involved from '../views/involved'
import Proposal from '../views/proposal'
import Send from '../views/send'

import {Formatter} from '../libraries/formatter'
import {Bus} from '../infrastructure/bus'
import {MailValidator} from '../libraries/mail_validator'
import Circle from './circle'
import ConsensusProposition from './consensus_proposition'

import Vue from 'vue'
import Proposer from '../views/con_proposer'


export default class App {
  constructor(elementID){
    this.data = new ConsensusProposition()
    this.circle = new Circle()
    this.initialize_views()
    this.listen(elementID)
  }

  initialize_views(){
    new Vue({
      el: '#consensus-call',
      data: this.data,
      components: {
        'con-proposer': Proposer
      }
    })


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
    let mailValidator = MailValidator.validateEmail(mail)
    if (mailValidator){
      proposer = mail
      valid = true
    }
    this.saveEmail(proposer,valid)
    this.checkSubmitable()
  }

  saveEmail(proposer,valid) {
    this.data.setProposer(proposer)
    this.data.showBadMail=(!valid)
  }

  checkSubmitable(){
    this.send.toggleSubmit(this.data.isSubmitable())
  }

}
