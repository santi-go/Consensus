<template>
  <div class="email">
    <div class="involved-list">
      <label for="involved-input">Who do you want to invite?</label>

      <con-invited v-for="invited in involved"
                   v-bind:invited="invited">

     </con-invited>

      <input
          type="text"
          v-on:blur="setCircle"
          v-on:keydown="acceptKeysPress"
          v-on:click="putFocusOnInput"
          v-model="invited"
          name="involved-input">
    </div>
    <div class="clear"></div>
  </div>
</template>
<script>
  import {KeyPressed} from "../libraries/key_mapping"
  import Invited from '../views/con_invited'

  export default {
    name: 'con-involved',
    props: ['involved'],
    data: function(){
      return {
        involved:[],
        invited:''
      }
    },
    components:{
      'con-invited': Invited
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
      this.invited= ''
    },

    getInputContainer() {
      return this.$el.querySelector('input')
    },

    putFocusOnInput() {
      this.getInputContainer().focus()
    },
  }
}

</script>
<style>

</style>
