import {Circle} from './circle'
import {ProposerLogic} from './proposer_logic'
import {Proposal} from './proposal'
import {SendPropose} from './send_propose'

let circle = new Circle()
circle.initialize()

ProposerLogic.initialize()
Proposal.initialize()
SendPropose.initialize('panel', circle)
