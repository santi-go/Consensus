<template>
  <div v-bind:class="{invalidBox:!invited.valid}">{{invited.email}}<button
       tabindex="-1"
       class="close"
       v-on:click="$emit('delete-invited')">
   <span>Delete</span></button>
 </div>
</template>

<script>
export default {
 name: 'con-invited',
 props: ['invited'],
 methods: {}
}
</script>

<style>
</style>
