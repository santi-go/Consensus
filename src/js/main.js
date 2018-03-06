import App from './components/app'
import Api from './services/api'

new App('consensus-call')
new Api(process.env.API_HOST)
