import {Circle} from './circle'
import {ProposerLogic} from './proposer_logic'
import {ProposalLogic} from './proposal_logic'
import {SendPropose} from './send_propose'

let circle = new Circle()
let proposerLogic = new ProposerLogic()
let proposalLogic = new ProposalLogic()

circle.initialize()
proposerLogic.initialize()
proposalLogic.initialize()
SendPropose.initialize('panel', circle, proposerLogic, proposalLogic)
