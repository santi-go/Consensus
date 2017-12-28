import {Circle} from './circle'
import {Proposer} from './proposer'
import {Proposal} from './proposal'
import {SendPropose} from './send_propose'

Circle.initialize()

Proposer.initialize('proposer-email')
Proposal.initialize('proposal')
SendPropose.initialize('panel')
