<template>
  <div id="Nowy Trening">
    <section class="showCurrentTraining" v-if="isChosen === true">
      <div class="dataBox">
        <h2>{{ currentTraining[0].date }}</h2>
        <h2>
          {{ currentTraining[0].trainingName }}
        </h2>
      </div>
      <section>
        <div
          v-for="(exc, excIndex) in currentTraining[0].excs"
          :key="excIndex"
          class="excsBox"
        >
          <div class="excName">
            <i
              class="fas fa-chevron-circle-right"
              :class="showExcsActive === index ? 'open' : ''"
            ></i>
            <p>
              {{ exc.excName }}
            </p>
            <i class="fas fa-trash" @click="deleteExc(excIndex)"> </i>
          </div>
          <div class="seriesDivBox">
            <div
              class="seriesDiv"
              v-for="(seria, seriaIndex) in exc.seriesTab"
              :key="seriaIndex"
              v-touch:swipe.left="
                deleteSeries.bind(this, exc, seriaIndex)
              "
            >
              <div
                :class="seria.done ? 'seriesDiv_done n_div' : 'n_div'"
              >
                <div
                  :class="
                    seria.done == true
                      ? 'n_circle circle_done'
                      : 'n_circle'
                  "
                >
                  <p>{{ seriaIndex + 1 }}</p>
                </div>
                <div class="inputBox">
                  <p>W.</p>
                  <input
                    v-model="seria.weight"
                    type="number"
                    :disabled="seria.done"
                  />
                  <p>P.</p>
                  <input
                    v-model="seria.repeats"
                    type="number"
                    :disabled="seria.done"
                  />
                </div>
                <div
                  @click="checkCiezar(seria)"
                  class="circle"
                  :class="
                    seria.done == true
                      ? 'circle circle_done'
                      : 'circle'
                  "
                >
                  <i class="fas fa-check"></i>
                </div>
                <!-- <i
                @click="deleteSeries(exc, seriaIndex)"
                class="fas fa-times"
              ></i> -->
              </div>
            </div>
            <i @click="addSeries(exc)" class="fas fa-plus-square"></i>
          </div>
        </div>
      </section>
      <div class="buttonsDiv">
        <router-link to="/nowy-trening/dodaj-cwiczenie">
          <button class="addNewExcBtn" @click="displayMenu">
            Dodaj cwiczenie
          </button>
        </router-link>
        <button class="cancelTraining" @click="cancelTraining">
          Anuluj Trening
        </button>
        <button class="saveTraining" @click="saveTraining">
          Zapisz Trening
        </button>
      </div>
    </section>
    <section class="chooseCurrentTraining" v-else>
      <div class="emptyPlans" v-if="planNames.length === 0">
        Musisz najpierw stworzyć plan, żeby rozpocząć trening
      </div>

      <div class="choosingTrainingDiv" v-else>
        <div class="selectPlan" v-if="trainingChoice === false">
          <h2>Wybierz plan</h2>
          <select v-model="selectPlanId">
            <option
              :value="planName.id"
              v-for="(planName, planNameindex) in planNames"
              :key="planNameindex"
              :selected="planNameindex === 0"
              >{{ planName.name }} ID: {{ planName.id }}</option
            >
          </select>
          <button @click="ustawIdPlanu">Dalej</button>
          <p v-if="showMessagePlan === true">
            Musisz stworzyc trening zeby pojsc dalej
          </p>
        </div>
        <div class="selectTraining" v-else>
          <h2>Plan: {{ planNames[activePlanIndex].name }}</h2>
          <h4>Wybierz trening</h4>
          <select v-model="selectTrainingId">
            <option
              v-for="(training, trainingIndex) in planNames[
                activePlanIndex
              ].trainings"
              :key="trainingIndex"
              :value="training.trainingId"
              >{{ training.trainingName }} ID :
              {{ training.trainingId }}</option
            >
          </select>
          <div class="btnBox">
            <button @click="back">Cofnij</button>
            <button @click="ustawIdTreningu_rozpocznijTrening">
              rozpocznij trening
            </button>
          </div>
          <p v-if="showMessageTraining">
            W tym treningu nie ma zadnych cwiczen, dodaj kilka
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectPlanId: '',
      selectTrainingId: '',
      indeksPlanu: '',
      trainingChoice: false,
      showMessagePlan: false,
      showMessageTraining: false,
      date: '',
      indexDeleteSeries: null,
    };
  },
  computed: {
    isChosen() {
      return this.$store.state.trainingIsChosen;
    },
    planNames() {
      return this.$store.state.planNames;
    },
    currentTraining() {
      return this.$store.state.currentTraining;
    },
    activePlanId() {
      return this.$store.state.activePlanId;
    },
    activeTrainingId() {
      return this.$store.state.activeTrainingId;
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
    test() {
      console.log(this.planNames);
    },
    ustawIdPlanu() {
      this.$store.state.activePlanId = this.selectPlanId;
      if (
        this.planNames[this.activePlanIndex].trainings.length === 0
      ) {
        console.log('nie ma treningow');
        this.showMessagePlan = true;
      } else {
        this.$store.state.activeTrainingId = this.planNames[
          this.activePlanIndex
        ].trainings[0].trainingId;
        this.selectTrainingId = this.planNames[
          this.activePlanIndex
        ].trainings[0].trainingId;
        this.trainingChoice = true;
        this.showMessagePlan = false;
      }
    },
    back() {
      this.trainingChoice = false;
    },
    ustawIdTreningu_rozpocznijTrening() {
      this.$store.state.activeTrainingId = this.selectTrainingId;
      if (
        this.planNames[this.activePlanIndex].trainings[
          this.activeTrainingIndex
        ].excs.length === 0
      ) {
        this.showMessageTraining = true;
      } else {
        this.$store.state.currentTraining.push({
          history_id: this.$store.state.historyId,
          date: this.date,
          planName: this.planNames[this.activePlanIndex].name,
          trainingName: this.planNames[this.activePlanIndex]
            .trainings[this.activeTrainingIndex].trainingName,
          excs: [
            ...this.planNames[this.activePlanIndex].trainings[
              this.activeTrainingIndex
            ].excs,
          ],
        });

        for (
          let i = 0;
          i < this.$store.state.currentTraining[0].excs.length;
          i++
        ) {
          for (
            let j = 0;
            j < this.$store.state.currentTraining[0].excs[i].series;
            j++
          ) {
            this.$store.state.currentTraining[0].excs[
              i
            ].seriesTab.push({
              weight: null,
              repeats: null,
              done: false,
            });
          }
        }

        for (
          let i = 0;
          i < this.$store.state.currentTraining[0].excs.length;
          i++
        ) {
          console.log(
            this.$store.state.currentTraining[0].excs[i].seriesTab,
          );
        }

        this.$store.state.trainingIsChosen = true;
        this.$store.state.historyId++;
      }
    },
    displayMenu() {
      this.$store.state.displayNav = false;
    },
    checkCiezar(object) {
      if (object.done === false) {
        object.done = true;
      } else {
        object.done = false;
      }
    },
    addSeries(exc) {
      exc.seriesTab.push({
        seriesNumber: exc.seriesTab.length + 1,
        weight: 0,
        repeats: 0,
      });
    },
    deleteSeries(exc, index) {
      if (exc.seriesTab.length > 1) {
        this.indexDeleteSeries = index;
        setTimeout(() => {
          exc.seriesTab.splice(index, 1);
          this.indexDeleteSeries = null;
        }, 200);
      }
    },
    deleteExc(excIndex) {
      this.currentTraining[0].excs.splice(excIndex, 1);
    },
    getDate() {
      let currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '/')
        .split('/')
        .reverse()
        .join('/');

      return currentDateWithFormat;
    },
    cancelTraining() {
      for (
        let i = 0;
        i < this.$store.state.currentTraining[0].excs.length;
        i++
      ) {
        this.$store.state.currentTraining[0].excs[i].seriesTab = [];
      }

      this.currentTraining.splice(0, 1);
      this.$store.state.trainingIsChosen = false;
      this.trainingChoice = false;
    },
    saveTraining() {
      this.$store.state.history.push(this.currentTraining[0]);

      for (
        let i = 0;
        i < this.$store.state.currentTraining[0].excs.length;
        i++
      ) {
        this.$store.state.currentTraining[0].excs[i].seriesTab = [];
      }

      this.$store.state.history.push(this.currentTraining[0]);
      this.currentTraining.splice(0, 1);
      this.$store.state.trainingIsChosen = false;
      this.trainingChoice = false;
    },
  },
  mounted() {
    this.date = this.getDate();
    if (this.isChosen === false) {
      if (this.planNames.length > 0) {
        this.selectPlanId = this.planNames[0].id;
        this.$store.state.activePlanId = this.planNames[0].id;
      }
    }
  },
};
</script>

<style scoped>
.dataBox {
  color: var(--kolor-bialy-tekstu);
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.75);
  padding: 10px;
  margin-bottom: 20px;
  text-align: center;
}

.dataBox h2 {
  padding: 5px 0;
}

div.circle {
  border: 1px solid var(--kolor-szary-tekstu);
  background-color: var(--kolor-szary-tekstu);
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #282828;
}

div.circle:active,
div.n_circle:active {
  background-color: var(--kolor-lekko-bialy-tekstu);
}

.circle_done {
  background-color: #81c784 !important;
}

div.n_circle {
  border: 1px solid var(--kolor-szary-tekstu);
  background-color: var(--kolor-szary-tekstu);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #282828;
}

.seriesDiv_done {
  border-radius: 4px;
  background-color: #4e4e4e;
}

div.n_circle p {
  color: var(--kolor-divow);
}

section.chooseCurrentTraining {
  background-color: #282828;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: 5%;
  right: 5%;
  border-radius: 8px;
  color: #fafaff;
  text-align: center;
}

.excName {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.excName .fa-chevron-circle-right {
  transition: transform 0.2s ease-in-out;
  font-size: 1.3rem;
  color: var(--kolor-niebieski);
  padding: 0 5px;
  margin: 0 5px;
}

.excName p {
  font-size: 1.2rem;
  color: var(--kolor-bialy-tekstu);
}

.excName .fa-trash {
  font-size: 1.6rem;
  color: var(--kolor-bialy-tekstu);
  padding: 0 15px;
}

.excName p,
.excName .fa-chevron-circle-right,
.excName .fa-trash {
  display: block;
}

.fa-plus-square {
  text-align: center;
  font-size: 2rem;
  color: var(--kolor-bialy-tekstu);
  padding: 5px 10px;
}

.seriesDivBox {
  margin: 15px 5px;
}

.seriesDivBox .textBox {
  color: var(--kolor-bialy-tekstu);
  font-size: 1.4rem;
  display: flex;
  justify-content: center;
}

.seriesDiv .n_div {
  position: relative;
  display: flex;
  padding: 13px 5px;
  align-items: center;
  justify-content: space-between;
  transition: opacity 0.2s ease-in-out;
}

.seriesDivDelete {
  display: flex;
  margin: 10px 10px;
  align-items: center;
  justify-content: space-between;
  opacity: 0;
}

.seriesDiv p {
  display: inline-block;
  padding: 2px 3px;
  color: var(--kolor-lekko-bialy-tekstu);
  font-size: 1.3rem;
}

.seriesDiv input {
  width: 50px;
  padding: 5px;
  text-align: right;
  background: none;
  border: none;
  outline: none;
  font-size: 1.4rem;
  color: var(--kolor-bialy-tekstu);
  border-bottom: 1px solid var(--kolor-niebieski);
}

.inputBox input {
  margin: 0 20px;
}

.seriesDiv .fa-times {
  margin-left: 20px;
  font-size: 1.5rem;
}

.addNewExcBtn {
  background: none;
  outline: none;
  border: none;
  font-size: 1.3rem;
  color: #fafaff;
  padding: 5px;
  border: 1px solid black;
  margin: 5px;
}

.deleteExcBtn {
  background: none;
  outline: none;
  border: none;
  font-size: 1rem;
  color: #fafaff;
  padding: 5px;
  border: 1px solid black;
  margin: 5px;
}

.cancelTraining {
  display: block;
  background: none;
  outline: none;
  border: none;
  font-size: 1.3rem;
  color: #fafaff;
  padding: 5px;
  border: 1px solid black;
  margin: 5px;
}

.saveTraining {
  display: block;
  background: none;
  outline: none;
  border: none;
  font-size: 1.3rem;
  color: #fafaff;
  padding: 5px;
  border: 1px solid black;
  margin: 5px;
}

.buttonsDiv button {
  padding: 5px 10px;
  font-size: 1.4rem;
}

.emptyPlans {
  padding: 20px;
  font-size: 1.5rem;
}

.selectPlan {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.selectPlan h2 {
  font-size: 1.7rem;
}

.selectPlan select {
  padding: 5px;
  font-size: 1.3rem;
  margin: 10px 0;
}

.selectPlan button {
  font-size: 1.6rem;
  padding: 15px;
  outline: none;
  background: none;
  border: none;
  color: #fafaff;
}

.selectPlan p {
  padding: 5px;
  font-size: 1.3rem;
  color: rgb(250, 60, 60);
  border: 1px solid red;
}

.selectTraining {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.selectTraining h2 {
  font-size: 1.7rem;
  margin: 5px 0;
}

.selectTraining h4 {
  font-size: 1.3rem;
  margin: 5px 0;
}

.selectTraining select {
  padding: 5px;
  font-size: 1.3rem;
  margin: 10px 0;
}

.selectTraining .btnBox {
  display: flex;
  justify-content: flex-end;
}

.selectTraining p {
  padding: 5px;
  font-size: 1.3rem;
  color: rgb(250, 60, 60);
  border: 1px solid red;
}
</style>
