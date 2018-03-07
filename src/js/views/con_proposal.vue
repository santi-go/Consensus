<template>
  <div class="email">
    <label for="proposal-input">Paste your proposal:</label>
    <input
            type = "text"
            v-on:paste = "pasteProposal"
            v-on:keydown= "checkChar"
            v-model = "proposalText"
            name = "proposal-input"
            autocomplete = "off">
    </input>
    <output
            v-html = "proposal">
    </output>
  </div>
</template>

<script>
import {Formatter} from '../libraries/formatter'
import {FormBehaviour} from '../libraries/form_behaviour.js'
import {KeyPressed} from '../libraries/key_mapping.js'

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
      checkChar(event){
        if(!KeyPressed.isCtrl(event) && !KeyPressed.isV(event)) {
          event.preventDefault()
        }
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
