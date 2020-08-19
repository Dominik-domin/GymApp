<template>
  <div v-if="displayCwiczenia" id="bazaCwiczen">
    <router-link
      :to="{
        name: 'plany-treningowe',
        params: { id: planNames[activePlanIndex].id },
      }"
      ><i @click="back" class="fas fa-arrow-left"></i
    ></router-link>
    <div class="trainingName">
      <h2>
        Plan: <span>{{ planNames[activePlanIndex].name }}</span>
      </h2>
      <h2>
        Trening:
        <span>{{
          planNames[activePlanIndex].trainings[activeTrainingIndex]
            .trainingName
        }}</span>
      </h2>
    </div>
    <div class="excBox">
      <div class="btnBox" v-for="partia in bazaCw" :key="partia.id">
        <router-link
          :to="{
            name: 'wybor-cwiczen',
            params: { name: partia.name },
          }"
          ><button @click="displayExcs">
            {{ partia.name }}
          </button>
          <h4 v-if="partia.cwiczenia.length > 0">
            Ilość ćwiczeń: {{ partia.cwiczenia.length }}
          </h4>
          <h4 v-else>
            Brak ćwiczeń :( Dodaj coś nowego!
          </h4></router-link
        >
      </div>
    </div>
  </div>
  <div v-else><router-view /></div>
</template>

<script>
export default {
  data() {
    return {
      display: this.$store.state.displayExcs,
    };
  },
  computed: {
    bazaCw() {
      return this.$store.state.bazaCw;
    },
    activeTrainingId() {
      return this.$store.state.activeTrainingId;
    },
    activePlanId() {
      return this.$store.state.activePlanId;
    },
    planNames() {
      return this.$store.state.planNames;
    },
    displayCwiczenia() {
      return this.$store.state.displayExcs;
    },
    activePlanIndex() {
      return this.$store.state.planNames.findIndex(
        element => element.id === this.activePlanId,
      );
    },
    activeTrainingIndex() {
      return this.$store.state.planNames[
        this.activePlanIndex
      ].trainings.findIndex(
        element => element.trainingId === this.activeTrainingId,
      );
    },
  },
  methods: {
    back() {
      this.$store.state.showTrainings = true;
    },
    displayExcs() {
      this.$store.state.displayExcs = false;
    },
  },
};
</script>

<style scoped>
.fa-arrow-left {
  position: fixed;
  top: 4%;
  left: 4%;
  transform: translateY(-50%);
  z-index: 5;
  color: var(--kolor-bialy-tekstu);
  font-size: 1.9rem;
}

.excBox {
  position: absolute;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  margin: 0 0 40px;
  width: 100%;
}

.btnBox {
  flex-basis: 30%;
  padding: 5px 10px;
  margin: 10px 0;
}

.btnBox button {
  text-align: left;
  display: inline-block;
  width: 100%;
  font-size: 1.2rem;
  color: var(--kolor-bialy-tekstu);
  text-transform: uppercase;
  background: none;
  border: none;
  outline: none;
}

.btnBox h4 {
  color: var(--kolor-szary-tekstu);
}

a {
  color: #fafaff;
}

div.trainingName {
  padding: 10px;
  border-bottom: 1px solid #3f3f3f;
}

div.trainingName h2 {
  display: block;
  padding: 5px 0;
  font-size: 1.3rem;
  color: var(--kolor-bialy-tekstu);
}

div.trainingName h2 span {
  font-size: 1.2rem;
  color: var(--kolor-lekko-bialy-tekstu);
}
</style>
