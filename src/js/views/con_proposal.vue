<template>
  <div class="email">
    <label for="proposal-input">Paste your proposal:</label>
    <input
            type="text"
            v-on:paste="pasteProposal"
            v-model="proposalText"
            name="proposal-input" >
    </input>
    <output></output>
  </div>
</template>

<script>
import {Formatter} from '../libraries/formatter'
export default {
  name: 'con-proposal',
  data: function(){
    return {
      proposalText: ""
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
        this.container = this.$el
        this.inputContainer = this.container.querySelector('input')
        this.outputContainer = this.container.querySelector('output')
        this.outputContainer.innerHTML = formattedText
        this.addSeparator()
      },

      addSeparator() {
        this.inputContainer.classList.add('separator')
      }

  }
}
</script>

<style>
</style>
