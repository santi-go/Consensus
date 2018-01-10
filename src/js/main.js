import {Circle} from './circle'
import {ProposerLogic} from './proposer_logic'
import {ProposalLogic} from './proposal_logic'
import {SendPropose} from './send_propose'

let proposerLogic = new ProposerLogic()
let proposalLogic = new ProposalLogic()

Circle.initialize()
proposerLogic.initialize()
proposalLogic.initialize()
SendPropose.initialize('panel', proposerLogic, proposalLogic)
