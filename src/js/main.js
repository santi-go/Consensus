import {Circle} from './circle'
import {ProposerLogic} from './proposer_logic'
import {ProposalLogic} from './proposal_logic'
import {SendPropose} from './send_propose'

let proposalLogic = new ProposalLogic()

Circle.initialize()
ProposerLogic.initialize()
proposalLogic.initialize()
SendPropose.initialize('panel')
