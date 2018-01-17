import {App} from './components/app'
import {Api} from './services/api'
import Vue from 'vue'
import Title from './views/con_title'

new App('consensus-call')
new Api('http://0.0.0.0:4567')


let a = new Vue({
  el: '#tal',
  components: {
    'con-title': Title
  }
})
