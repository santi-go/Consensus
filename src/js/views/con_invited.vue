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
</style>
