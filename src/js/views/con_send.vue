<template>
    <div>
        <button
            id="submit"
            form="consensus-call"
            v-on:click="submitProposal"
            v-bind:disabled="!submittable"
            >Submit
        </button>
      </div>
</template>

<script>
export default {
    name: 'con-send',
    props: ['submittable'],
    methods: {
        submitProposal(event) {
            let signal = new CustomEvent('submit.proposal', {'bubbles':true})
            this.$el.dispatchEvent(signal)
            $el.reset()
            event.preventDefault()
        }
    }
}
</script>
