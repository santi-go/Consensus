<template>
  <div class="email">
    <div class="involved-list">
      <label for="involved-input">Who do you want to invite?</label>
      <input
          type="text"
          v-bind:id="involved-input"
          v-on:blur="setCircle"
          v-on:keydown="acceptKeysPress"
          v-on:click="putFocusOnInput"
          name="involved-input">
    </div>
    <div class="clear"></div>
  </div>
</template>
<script>
  import {KeyPressed} from "../libraries/key_mapping"

  export default {
    name: 'con-involved',
    props: ['involved'],
    watch: {
      	involved: function() {
          this.render()
        }
    },
    methods: {

    acceptKeysPress(e) {
      if (KeyPressed.isEnter(e) || KeyPressed.isComma(e)) {
        this.setCircle()
        e.preventDefault()
      }
    },

    setCircle() {
      let text = this.getInputContainer().value
      if (text === '') return
      let signal = new CustomEvent('circle.set', {'detail': text,'bubbles':true})
      this.$el.dispatchEvent(signal)
    },

    getInputContainer() {
      return this.$el.querySelector('input')
    },

    putFocusOnInput() {
      this.getInputContainer().focus()
    },

    render() {
      this.cleanBoxes()
      this.involved.forEach((email) => {
        this.createEmailBox(email)
      })
      this.cleanInput()
    },

    cleanBoxes() {
      let boxes = document.querySelectorAll('div.involved-list div')
      boxes.forEach((box) => {
        box.parentElement.removeChild(box)
      })
    },

    createEmailBox(emailElement) {
      let box = this.insertANewBox()
      box.innerText = emailElement.email
      box.classList.add(this.selectClass(emailElement.valid))
      box.id = emailElement.id
      this.createRemoveButton(box)
    },

    cleanInput() {
      let input = this.getInputContainer()
      input.value = ''
    },

    selectClass(valid) {
      if (valid) { return 'validBox' }
      return 'invalidBox'
    },

    insertANewBox() {
      let box = document.createElement('div')
      let input = this.getInputContainer()
      this.$el.querySelector('div').insertBefore(box, input)
      return box
    },

    removeEmail(event) {
      let email = event.target.parentElement.innerText
      let emailId = event.target.parentElement.id
      let signal = new CustomEvent('remove.from.circle',
                                  {'detail': {'email': email, 'id': emailId},
                                  'bubbles': true})
      this.$el.dispatchEvent(signal)
      event.preventDefault()
    },

    createRemoveButton(emailBox) {
      let removeButton = document.createElement('button')
      emailBox.appendChild(removeButton)
      removeButton.setAttribute("tabindex", "-1")
      removeButton.classList.add('close')
      removeButton.innerHTML = '<span>Delete</span>'
      removeButton.addEventListener('click', this.removeEmail.bind(this))
    }
  }
}

</script>
<style>

</style>
