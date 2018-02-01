<template>
  <div class="email">
    <div class="involved-list">
      <label for="involved-input">Who do you want to invite?</label>
      <con-invited v-for="invited in involved"
                   v-bind:key="invited.id"
                   v-bind:invited="invited">
     </con-invited>
      <input
          type="text"
          v-on:blur="send"
          v-on:keydown="sendWhenApply"
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
      sendWhenApply(e) {
        let sendingApplies = KeyPressed.isEnter(e) || KeyPressed.isComma(e)
        if (sendingApplies) {
          this.send()
          e.preventDefault()
        }
      },

      send(){
        this.sendValue()
        this.cleanInput()
      },

      sendValue() {
        let text = this.invited
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
  #involved {
    margin-top: 1rem;
  }
  .involved-list {
    width: -moz-fit-content;
  }
  .involved-list > * {
    display: block;
  }
  .involved-list input {
    float: left;
    width: 50%;
  }
  .involved-list > div {
    float: left;
  }
  #involved > div > div {
    margin: 0.5rem 0.5rem 0 0.5rem;
    padding: 0.5rem 1.5rem 0.5rem 0.5rem;
    border: 1px solid var(--success-color);
  }
</style>
