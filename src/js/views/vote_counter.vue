<template lang="html">
  <section class="vote-section">
    <h2>This is the circle votation:</h2>
    <p>There are <span class="counter con">90</span> people in consensus</p>
    <p>There are <span class="counter dis">90</span> people in disensus</p>
  </section>
</template>

<script>
export default {
  name: 'vote-counter'
}
</script>

<style lang="css">

.counter {
  font-size: 1.5rem;
  font-weight: 900;
  padding: 0 0.25rem;
  margin: 0 0.25rem;
}
.con {
  color: var(--main-color);
  border: 1px solid var(--main-color);
}
.dis {
  color: var(--error-color);
  border: 1px solid var(--error-color);
}

</style>
