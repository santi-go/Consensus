import {Circle} from './circle'
import {Proposal} from './proposal'
import {SendPropose} from './send_propose'
import {ProposerLogic} from './proposer_logic'

let proposerLogic = new ProposerLogic()
proposerLogic.initialize()
Circle.initialize()
Proposal.initialize()
SendPropose.initialize('panel', proposerLogic)
