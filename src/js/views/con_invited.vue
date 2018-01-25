<template>
 <div>{{invited.email}}<button
       tabindex="-1"
       class="close"
       v-on:click="removeEmail">
   <span>Delete</span></button>
 </div>
</template>

<script>
import Involved from '../components/circle'
export default {
 name: 'con-invited',
 props: ['invited'],

 mounted: function () {
   this.$nextTick(function () {
       this.render()
   })
 },
 methods: {
   render() {
     this.createEmailBox(this.invited.valid)
   },
   createEmailBox(invited) {
     let box = this.$el
     box.classList.add(this.selectClass(invited))
   },
   selectClass(valid) {
     if (valid) { return 'validBox' }
     return 'invalidBox'
   },
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
