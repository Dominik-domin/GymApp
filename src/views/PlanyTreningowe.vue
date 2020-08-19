<template>
  <div>
    <div id="PlanyTreningowe">
      <div class="headerBox"><h2>Plany treningowe</h2></div>
      <div :class="addBlur == true ? 'addBlur' : ''">
        <i
          v-if="showPlus"
          @click="showAddNewPlanDiv"
          class="fas fa-plus-circle"
        ></i>

        <section
          class="allPlans"
          v-for="(planName, indeks) in planNames"
          :key="`${indeks}`"
        >
          <div @click="displayNavRouterLink" class="planBox">
            <router-link
              :to="{
                name: 'plany-treningowe',
                params: { id: planName.id },
              }"
            >
              <h1>{{ planName.name }}</h1>
              <div class="trainingsDiv">
                <p
                  v-for="(training, index) in planName.trainings"
                  :key="`${index}`"
                >
                  {{ planName.trainings[index].trainingName }}
                </p>
                <p v-if="planName.trainings.length === 0">
                  Brak Treningów
                </p>
              </div>
            </router-link>
            <i
              class="fas fa-trash"
              @click="showDeleteDiv(planName.name, indeks)"
            ></i>
          </div>
        </section>
      </div>
    </div>
    <div v-if="addNewPlanDiv" class="createNewPlan">
      <h3>Tworzenie nowego planu</h3>
      <div class="inputBox">
        <p>Podaj nazwę nowego planu:</p>
        <input
          style="outline:none"
          v-model="newPlanName"
          type="text"
          placeholder="Nazwa planu..."
        />
      </div>
      <div class="btnsBox">
        <button @click="cancelNewPlan">Anuluj</button
        ><button @click="next">
          <router-link
            :class="{ ruter: newPlanName == false }"
            :to="{
              name: 'plany-treningowe',
              params: { id: newPlanId },
            }"
            >Dalej</router-link
          >
        </button>
      </div>
    </div>
    <section class="deletePlanSection" v-if="deletePlanDiv">
      <h3>
        Czy na pewno chcesz usunąć ten plan?
      </h3>
      <p>{{ deletePlanName }}</p>
      <div class="deleteBtnsBox">
        <button @click="cancelDeleteDiv">Anuluj</button>
        <button @click="confirmDeleteDiv">Usuń</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPlanName: '',
      addNewPlanDiv: false,
      addBlur: false,
      showPlus: true,
      newPlanId: this.$store.state.newPlanId,
      deletePlanDiv: false,
      deletePlanName: '',
      deletePlanIndex: '',
    };
  },
  computed: {
    planNames() {
      return this.$store.state.planNames;
    },
  },
  methods: {
    showAddNewPlanDiv() {
      this.addNewPlanDiv = true;
      this.addBlur = true;
      this.showPlus = false;
      this.$store.state.disableNavBtns = true;
      this.$store.state.displayNav = false;
    },
    cancelNewPlan() {
      this.newPlanName = '';
      this.addNewPlanDiv = false;
      this.addBlur = false;
      this.showPlus = true;
      this.$store.state.disableNavBtns = false;
      this.$store.state.displayNav = true;
    },
    next() {
      if (this.newPlanName != '') {
        this.$store.state.planNames.push({
          id: this.$store.state.newPlanId,
          name: this.newPlanName,
          trainings: [],
          idOfTraining: 0,
        });
        this.$store.state.newPlanId++;
        this.$store.state.displayNav = false;
      }
    },
    displayNavRouterLink() {
      this.$store.state.displayNav = false;
    },
    showDeleteDiv(name, indeks) {
      if (this.deletePlanDiv === false) {
        this.deletePlanDiv = true;
        this.addBlur = true;
        this.showPlus = false;
        this.deletePlanName = name;
        this.deletePlanIndex = indeks;
      }
    },
    cancelDeleteDiv() {
      if (this.deletePlanDiv === true) {
        this.deletePlanDiv = false;
        this.addBlur = false;
        this.showPlus = true;
        this.deletePlanName = '';
        this.deletePlanIndex = '';
        this.$store.state.displayNav = true;
      }
    },
    confirmDeleteDiv() {
      if (this.deletePlanDiv === true) {
        this.$store.state.usuniety = this.$store.state.planNames[
          this.deletePlanIndex
        ];
        this.planNames.splice(this.deletePlanIndex, 1);
        this.$store.state.whichSnackDisplay = 'removedPlan';
        this.$store.state.textOfDeletedSnack = 'Usunięto plan';
        this.$store.state.deletedPlanIndex = this.deletePlanIndex;
        this.deletePlanDiv = false;
        this.addBlur = false;
        this.deletePlanName = '';
        this.showPlus = true;
        this.$store.state.displayNav = true;
        this.$store.state.displaySnackbars = true;
        this.$store.state.showSnackbar = true;
        this.$store.state.snackbarTimeout = setTimeout(() => {
          this.$store.state.showSnackbar = false;
        }, 6000);
      }
    },
  },
};
</script>

<style>
.ruter {
  pointer-events: none;
}
</style>
