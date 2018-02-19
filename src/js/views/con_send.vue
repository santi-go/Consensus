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
            event.preventDefault()
            document.getElementById('consensus-call').reset()
        }
    }
}
</script>

<style>
  #submit {
    background-color: transparent;
    border: 1px solid var(--main-color);
    border-radius: 24px;
    cursor: pointer;
    font-size: 1rem;
    min-width: 9rem;
    margin: 1rem auto 5rem auto;
    padding: 1rem;
  }
  #submit:disabled{
    border-color: var(--success-color);
    color: var(--success-color);
    cursor: default;
  }
  #submit:focus {
    box-shadow: 0px 0px 6px 0px var(--main-color);
  }
</style>
