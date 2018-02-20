<template>
  <div class="email">
    <label for="proposal-input">Paste your proposal:</label>
    <input
            type = "text"
            v-on:paste = "pasteProposal"
            v-on:keydown= "avoidEnterDeleteBox"
            v-model = "proposalText"
            name = "proposal-input" >
    </input>
    <output
            v-html = "proposal">
    </output>
  </div>
</template>

<script>
import {Formatter} from '../libraries/formatter'
import {FormBehaviour} from '../libraries/form_behaviour.js'

export default {
  name: 'con-proposal',
  props: ['proposal'],
  data: function(){
    return {
      proposalText: "",
      formattedText: ""
    }
  },

  methods: {
      pasteProposal(event) {
        let pastedText = event.clipboardData.getData('text')
        let formattedText = Formatter.formatText(pastedText)
        let signal = new CustomEvent('send.text', {'detail': formattedText, 'bubbles':true})
        this.$el.dispatchEvent(signal)
        event.preventDefault()
      },
      avoidEnterDeleteBox(event){
        FormBehaviour.avoidEnterDeleteBox(event)
      }
  }
}
</script>

<style>
  #proposal input {
    border: 1px solid var(--main-color);
    color: transparent;
    margin-bottom: 1em;
  }
  #proposal input:focus {
    background-color: var(--header-color);
  }

</style>
