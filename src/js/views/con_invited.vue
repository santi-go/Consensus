<template>
  <div v-bind:class="{invalidBox:!invited.valid}">{{invited.email}}<button
       tabindex="-1"
       class="close"
       v-on:click="removeEmail">
   <span>Delete</span></button>
 </div>
</template>

<script>
export default {
 name: 'con-invited',
 props: ['invited'],
 methods: {
   removeEmail(event) {
     event.preventDefault()
     let emailId = this.invited.id
     let signal = new CustomEvent('remove.from.circle',
                                 {'detail': {'id': emailId},
                                 'bubbles': true})
     this.$el.dispatchEvent(signal)
   }
 }
}
</script>

<style>
  .invalidBox {
    box-shadow: inset -1px -1px 0px 3px var(--error-color);
    -webkit-box-shadow: inset -1px -1px 0px 3px var(--error-color);
    -moz-box-shadow: inset -1px -1px 0px 3px var(--error-color);
  }
  .close {
    background-color: var(--text-color);
    border: none;
    color: #ffffff;
    cursor: pointer;
    float: right;
    line-height: 20px;
    margin-right: -28px;
    margin-top: -11px;
    text-align: center;
    position: relative;
    width: 20px;
    }
  .close span {
    visibility: hidden;
  }
  .close::before {
    content: 'x';
  }
</style>
