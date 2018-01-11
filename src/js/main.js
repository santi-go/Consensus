import {Circle} from './controller'
import {ProposerLogic} from './controller'
import {ProposalLogic} from './controller'
import {SendPropose} from './send_propose'

let circle = new Circle()
let proposerLogic = new ProposerLogic()
let proposalLogic = new ProposalLogic()

circle.initialize()
proposerLogic.initialize()
proposalLogic.initialize()
SendPropose.initialize('panel', circle, proposerLogic, proposalLogic)
