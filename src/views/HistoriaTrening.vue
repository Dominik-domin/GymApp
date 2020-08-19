<template>
  <div>
    <router-link to="/historia"
      ><i class="fas fa-arrow-left"></i
    ></router-link>
    <div v-if="historyTraining">
      <p>{{ historyTraining.planName }}</p>
      {{ historyTraining.excs }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    historyTraining() {
      return this.$store.getters.historyID(this.$route.params.id);
    },
  },
};
</script>

<style scoped>
.fa-arrow-left {
  position: fixed;
  top: 2%;
  left: 2%;
  z-index: 5;
  color: #fafaff;
  font-size: 1.5rem;
}
</style>
