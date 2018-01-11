import {Circle} from './components/controller'
import {ProposerLogic} from './components/controller'
import {ProposalLogic} from './components/controller'
import {SendPropose} from './send_propose'

let circle = new Circle()
let proposerLogic = new ProposerLogic()
let proposalLogic = new ProposalLogic()

circle.initialize()
proposerLogic.initialize()
proposalLogic.initialize()
SendPropose.initialize('panel', circle, proposerLogic, proposalLogic)
