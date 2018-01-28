<template>
  <div class="email">
    <label for="proposal-input">Paste your proposal:</label>
    <input
            type = "text"
            v-on:paste = "pasteProposal"
            v-model = "proposalText"
            name = "proposal-input" >
    </input>
    <output
            v-html = "formattedText">
    </output>
  </div>
</template>

<script>
import {Formatter} from '../libraries/formatter'
export default {
  name: 'con-proposal',
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
        this.render(formattedText)
      },

      render(formattedText) {
        this.formattedText = formattedText
      }
  }
}
</script>

<style>
  #proposal input {
    border: 1px solid var(--main-color);
    color: transparent;
  }
  #proposal input:focus {
    background-color: var(--header-color);
  }

</style>
