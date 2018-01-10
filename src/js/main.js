import {Circle} from './circle'
import {Proposal} from './proposal'
import {SendPropose} from './send_propose'
import {ProposerLogic} from './proposer_logic'

let circle = new Circle()
circle.initialize()

let proposerLogic = new ProposerLogic()
proposerLogic.initialize()

Proposal.initialize()
SendPropose.initialize('panel', proposerLogic, circle)
