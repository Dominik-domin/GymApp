<template>
  <div
    id="snackbarDeleteBox"
    :class="
      showSnackbar == true
        ? ' snackbar snackbar_open'
        : ' snackbar snackbar_closed'
    "
  >
    <div class="textBox">
      <p>{{ text }}</p>
    </div>
    <button @click="undoExc">
      Cofnij
    </button>
  </div>
</template>

<script>
export default {
  props: ['text'],
  data() {
    return {};
  },
  computed: {
    showSnackbar() {
      return this.$store.state.showSnackbar;
    },
  },
  methods: {
    undoExc() {
      if (this.$store.state.whichSnackDisplay == 'removedExc') {
        this.$store.state.deletedExcTab.splice(
          this.$store.state.deletedExcIndex,
          0,
          this.$store.state.deletedExcName,
        );
      } else if (
        this.$store.state.whichSnackDisplay == 'removedPlan'
      ) {
        this.$store.state.planNames.splice(
          this.$store.state.deletedPlanIndex,
          0,
          this.$store.state.usuniety,
        );
        this.$store.state.usuniety = null;
      }
      this.$store.state.showSnackbar = false;
      clearTimeout(this.$store.state.snackbarTimeout);
    },
  },
};
</script>

<style scoped>
.snackbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 25px 25px 15px;
  color: #fafaff;
  background-color: #414040;
  position: fixed;
  bottom: 53px;
  left: 0;
  right: 0;
  height: 39px;
  transition: transform 0.2s ease-in-out;
  font-size: 1rem;
}

.snackbar button {
  outline: none;
  background: none;
  border: none;
  text-transform: uppercase;
  color: #058ed9;
  font-size: 1.1rem;
}

.snackbar_open {
  transform: translate3d(0, 0px, 0);
}

.snackbar_closed {
  transform: translate3d(0, 100px, 0);
}
</style>
