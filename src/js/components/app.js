
import {Formatter} from '../libraries/formatter'
import {Bus} from '../infrastructure/bus'
import {MailValidator} from '../libraries/mail_validator'
import Circle from './circle'
import ConsensusProposition from './consensus_proposition'

import Vue from 'vue'

import Proposer from '../views/con_proposer'
import Involved from '../views/con_involved'
import Proposal from '../views/con_proposal'
import Send from '../views/con_send'
import VoteGreeting from '../views/vote_greeting'
import VoteCounter from '../views/vote_counter'
import VoteInvited from '../views/vote_invited'
import VoteProposal from '../views/vote_proposal'

export default class App {
  constructor (elementID) {
    this.data = new ConsensusProposition()
    this.circle = new Circle()
    this.initializeViews()
    this.listen(elementID)
  }

  initializeViews () {
    new Vue({
      el: '#reunion-consensus',
      components: {
        'vote-greeting': VoteGreeting,
        'vote-counter': VoteCounter,
        'vote-invited': VoteInvited,
        'vote-proposal': VoteProposal
      }
    })
    new Vue({
      el: '#consensus-call',
      data: {
        data: this.data,
        circle: this.circle
      },
      components: {
        'con-proposer': Proposer,
        'con-involved': Involved,
        'con-proposal': Proposal,
        'con-send': Send
      }
    })
  }

  listen (elementID) {
    let element = document.getElementById(elementID)
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

  submit (event) {
    Bus.publish('submit.proposal', this.data.asObject())
  }

  formatProposal (event) {
    let proposal = Formatter.formatText(event.detail)
    this.data.setProposal(proposal)
    this.data.checkSubmitable()
  }

  parseCircle (event) {
    this.circle.extractMails(event.detail)
    this.data.setCircle(this.circle.involved())
    this.data.checkSubmitable()
  }

  removeFromCircle (event) {
    this.circle.removeEmail(event.detail)
    this.data.setCircle(this.circle.involved())
    this.data.checkSubmitable()
  }

  checkForMail (event) {
    let mail = event.detail
    let proposer = null
    let valid = false
    mail = mail.trim()
    let mailValidator = MailValidator.validateEmail(mail)
    if (mailValidator) {
      proposer = mail
      valid = true
    }
    this.saveEmail(proposer, valid)
    this.data.checkSubmitable()
  }

  saveEmail (proposer, valid) {
    this.data.setProposer(proposer)
    this.data.showBadMail = (!valid)
  }
}
