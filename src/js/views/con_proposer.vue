<template>
  <div v-bind:class="{ invalid: show ,email: true }">
    <label for="proposer-input">Insert your email:</label>
    <span>The introduced email address is invalid</span>
    <input  type="text"
            v-on:blur="markValidity"
            v-on:keydown="maskInput"
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
      let isAllowed = MailChecker.isAllowedIn(text, character, position)
      if (!isAllowed) {
        event.preventDefault()
      }
    }
  }

}
</script>

<style>
  .email {
    border-bottom: 1px solid var(--main-color);
    display: block;
    margin-top: 1rem;
    padding: 1rem 0;
  }
  .email > * {
    display: block;
  }
  .email.invalid {
    border: none;
    box-shadow: inset -1px -1px 0px 3px var(--error-color);
    -moz-box-shadow: inset -1px -1px 0px 3px var(--error-color);
    -webkit-box-shadow: inset -1px -1px 0px 3px var(--error-color);
  }
  .email.invalid span{
    display: inline-block;
    padding-left: 1rem;
  }
  .email span {
    display: none;
    color: var(--error-color);
  }
  #proposer label{
  display: inline-block;
  }
</style>
