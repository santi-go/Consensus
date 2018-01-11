import {Circle} from './components/controller'
import {ProposerLogic} from './components/controller'
import {ProposalLogic} from './components/controller'
import {SendPropose} from './send_propose'

let sendPropose = new SendPropose()
let circle = new Circle(sendPropose)
let proposerLogic = new ProposerLogic(sendPropose)
let proposalLogic = new ProposalLogic(sendPropose)

circle.initialize()
proposerLogic.initialize()
proposalLogic.initialize()
sendPropose.initialize('panel', circle, proposerLogic, proposalLogic)
