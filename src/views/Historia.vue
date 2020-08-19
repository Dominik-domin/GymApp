<template>
  <div>
    <div
      v-for="(historyTraining, historyIndex) in history"
      :key="historyIndex"
    >
      <router-link
        :to="{
          name: 'historia',
          params: { id: historyTraining.history_id },
        }"
      >
        <h2>
          {{ historyTraining.planName }} -
          {{ historyTraining.trainingName }} id:
          {{ historyTraining.history_id }}
        </h2>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    history() {
      return this.$store.state.history;
    },
  },
  methods: {},
};
</script>
