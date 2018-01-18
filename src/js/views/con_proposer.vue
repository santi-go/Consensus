<template>
  <div v-bind:class="{ invalid: show ,email: true }">
    <label for="proposer-input">Insert your email:</label>
    <span>The introduced email address is invalid</span>
    <input  type="text"
            v-on:blur="markValidity"
            v-on:keydown="maskInput"
            v-on:keyup.enter="sendTabInstead"
            name="proposer-input"
            v-model="proposedMail"
            autofocus>
  </div>
</template>

<script>
import {MailChecker} from '../libraries/mail_checker.js'
export default {
  name: 'con-proposer',
  data: function(){
    return {
        proposedMail: ""
    }
  },
  props: ['show'],
  methods: {
    markValidity(event) {
      let proposerCheck = new CustomEvent(
        'proposer.check',
        {'detail': this.proposedMail, 'bubbles':true})
      this.$el.dispatchEvent(proposerCheck)
    },

    maskInput(event){
      let text = event.target.value
      let position = event.target.selectionStart
      let character = event.key
      let mailChecker = new MailChecker
      let isAllowed = mailChecker.isAllowedIn(text, character, position)
      if (!isAllowed) {
        event.preventDefault()
      }
    },

    sendTabInstead(event){
      let newEvent= new KeyboardEvent('keydown',{key:'tab',keyCode: 9,charCode: 9, bubbles:true })
      this.$el.dispatchEvent(newEvent)
      event.preventDefault()
    }
  }

}
</script>

<style>

</style>
