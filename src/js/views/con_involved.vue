<template>
  <div class="email">
    <div class="involved-list">
      <label for="involved-input">Who do you want to invite?</label>
      <con-invited v-for="(invited, index) in involved"
                   v-bind:invited="invited"
                   v-bind:key="invited.id"
                   v-on:delete-invited="deleteThisInvited(index)">
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
  import Invited from "./con_invited"
  export default {
    name: 'con-involved',
    props: ['involved'],
    data: function(){
      return {
        invited:''
      }
    },
    components:{
      "con-invited" : Invited
    },
    methods: {
      deleteThisInvited: function(index) {
        this.involved.splice(index, 1);
        event.preventDefault()
      },


      acceptKeysPress(e) {
        if (KeyPressed.isEnter(e) || KeyPressed.isComma(e)) {
          this.setCircle()
          e.preventDefault()
        }
      },

      setCircle() {
        let text = this.invited
        this.cleanInput()
        if (text === '') return
        let signal = new CustomEvent('circle.set', {'detail': text,'bubbles':true})
        this.$el.dispatchEvent(signal)
      },

      putFocusOnInput() {
        this.$el.querySelector('input').focus()
      },

      cleanInput() {
        this.invited = ""
      }
    }
  }

</script>
<style>

</style>
