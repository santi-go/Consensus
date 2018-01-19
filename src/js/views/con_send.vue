<template>
    <div>
        <button 
            id="submit" 
            form="consensus-call" 
            v-on:click="submitProposal"
            v-bind:disabled="!submiteable"
            >Submit
        </button>
      </div>
</template>

<script>
export default {
    name: 'con-send',
    props: ['submiteable'],
    methods: {
        submitProposal(event) {
            let signal = new CustomEvent('submit.proposal', {'bubbles':true})
            this.$el.dispatchEvent(signal)
            location.reload(true)
            event.preventDefault()
        }
    }
}


</script>
