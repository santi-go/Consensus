import {Circle} from './circle'
import {ProposerLogic} from './proposer_logic'
import {Proposal} from './proposal'
import {SendPropose} from './send_propose'

Circle.initialize()
ProposerLogic.initialize()
Proposal.initialize()
SendPropose.initialize('panel')
