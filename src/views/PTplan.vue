<template>
  <div v-if="showTrainings" id="plan">
    <i
      @click="showAddNewTrainingDiv"
      class="fas fa-pen-square"
      v-if="showArrowPen"
    ></i>
    <router-link to="/plany-treningowe"
      ><i
        @click="displayNavTrue"
        class="fas fa-arrow-left PTplanArrow"
        v-if="showArrowPen"
      ></i
    ></router-link>
    <div v-if="plan" :class="addBlur == true ? 'addBlur' : ''">
      <div class="planName">
        <h2>{{ plan.name }}</h2>
      </div>
      <div
        v-for="(training, index) in plan.trainings"
        :key="`${index}`"
      >
        <div class="trainingName">
          <div
            class="nameDiv"
            @click="
              showExcsActive === index
                ? (showExcsActive = '')
                : (showExcsActive = index)
            "
          >
            <i
              class="fas fa-chevron-circle-right"
              :class="showExcsActive === index ? 'open' : ''"
            ></i>
            <p @click="showID(index)">
              {{ plan.trainings[index].trainingName }}
            </p>
          </div>
          <div class="trainingOptionsDiv">
            <i
              class="fas fa-trash"
              @click="
                showDeleteDiv(
                  plan.trainings[index].trainingName,
                  index,
                )
              "
            ></i>
            <router-link :to="`${plan.id}/wybor-cwiczen`"
              ><i @click="editTraining(index)" class="fas fa-pen"></i
            ></router-link>
          </div>
          <transition
            name="fade"
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave"
          >
            <section
              v-if="showExcsActive === index"
              class="allExcsSection"
              :class="
                showExcsActive === index ? 'showDiv' : 'hideDiv'
              "
            >
              <div
                v-touch:touchhold="showEditBox.bind(this, exc)"
                class="excsBox"
                v-for="(exc, indeksExc) in plan.trainings[index].excs"
                :key="exc.excId"
              >
                <p>{{ exc.excName }}</p>
                <p>
                  Serie:
                  <span class="excSpan">{{ exc.series }}</span>
                  Powtorzenia:
                  <span class="excSpan">{{ exc.repeatsLeft }}</span> -
                  <span class="excSpan">{{ exc.repeatsRight }}</span>
                </p>
                <i
                  @click="removeExc(indeksExc, index)"
                  class="fas fa-times"
                ></i>
              </div>
            </section>
          </transition>
        </div>
      </div>
    </div>
    <div v-if="addNewTrainingDiv" class="createNewTraining">
      <h3>Tworzenie nowego treningu</h3>
      <div class="inputBox">
        <p>Podaj nazwę treningu:</p>
        <input
          style="outline:none"
          v-model="newTrainingName"
          type="text"
          placeholder="Nazwa treningu..."
        />
      </div>
      <div class="btnsBox">
        <button @click="cancelNewTraining">Anuluj</button>
        <router-link
          :class="{ ruter: newTrainingName == false }"
          v-if="plan"
          :to="`${plan.id}/wybor-cwiczen`"
        >
          <button @click="addTraining">
            Dalej
          </button>
        </router-link>
      </div>
    </div>
    <section class="deleteTrainingSection" v-if="deleteTrainingDiv">
      <h3>
        Czy na pewno chcesz usunąć ten trening?
      </h3>
      <p>{{ deleteTrainingName }}</p>
      <div class="deleteBtnsBox">
        <button @click="cancelDeleteDiv">Anuluj</button>
        <button @click="confirmDeleteDiv">Usuń</button>
      </div>
    </section>
    <div v-if="editExcDiv" class="editExcDiv">
      <p>{{ editedExc.excName }}</p>
      <div class="seriesBox">
        <div class="series">
          <p>Serie</p>
          <div class="seriesDiv">
            <input
              style="outline:none"
              v-model="editedExc.series"
              class="seriesInput"
              type="number"
            />
            <div class="faBox">
              <div class="circle">
                <i @click="decrement(1)" class="fas fa-minus"></i>
              </div>
              <div class="circle">
                <i @click="increment(1)" class="fas fa-plus"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="repeats">
          <p>Powt.</p>
          <div class="repeatsDiv">
            <div class="repeatsDivLeft">
              <input
                style="outline:none"
                v-model="editedExc.repeatsLeft"
                class="repeatsInputLeft"
                type="number"
              />
              <div class="faBox">
                <div class="circle">
                  <i @click="decrement(2)" class="fas fa-minus"></i>
                </div>

                <div class="circle">
                  <i @click="increment(2)" class="fas fa-plus"></i>
                </div>
              </div>
            </div>
            <div class="repeatsDivRight">
              <input
                style="outline:none"
                v-model="editedExc.repeatsRight"
                class="repeatsInputRight"
                type="number"
              />
              <div class="faBox">
                <div class="circle">
                  <i @click="decrement(3)" class="fas fa-minus"></i>
                </div>

                <div class="circle">
                  <i @click="increment(3)" class="fas fa-plus"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btnsBox">
        <button @click="cancelEditBox">Anuluj</button
        ><button @click="confirmEditExc">Dodaj</button>
      </div>
    </div>
  </div>

  <div v-else><router-view /></div>
</template>

<script>
export default {
  data() {
    return {
      newTrainingName: '',
      addNewTrainingDiv: false,
      addBlur: false,
      trainingID: 1,
      toggleShowExcs: false,
      showExcsActive: '',
      showArrowPen: true,
      deleteTrainingDiv: false,
      deleteTrainingName: '',
      deleteTrainingIndex: '',
      editExcDiv: false,
      nameOfEditExc: '',
      seriesOfEditExc: null,
      repeatsLeftOfEditExc: null,
      repeatsRightOfEditExc: null,
      editedExc: null,
      editedExcCopy: null,
    };
  },
  computed: {
    plan() {
      return this.$store.getters.planNamesId(this.$route.params.id);
    },
    showTrainings() {
      return this.$store.state.showTrainings;
    },
  },
  methods: {
    displayNavTrue() {
      this.$store.state.displayNav = true;
      this.$store.state.disableNavBtns = false;
    },
    showAddNewTrainingDiv() {
      this.addNewTrainingDiv = true;
      this.showArrowPen = false;
      this.addBlur = true;
    },
    cancelNewTraining() {
      this.newTrainingName = '';
      this.addNewTrainingDiv = false;
      this.addBlur = false;
      this.showArrowPen = true;
    },
    addTraining() {
      if (this.newTrainingName != '') {
        this.plan.trainings.push({
          trainingName: this.newTrainingName,
          trainingId: this.plan.idOfTraining + 1,
          excs: [],
          //----
          idOfExc: 0,
        });
      }
      this.$store.state.activeTrainingId = this.plan.idOfTraining + 1;
      this.plan.idOfTraining++;
      this.$store.state.activePlanId = this.plan.id;
      this.newTrainingName = '';
      this.trainingID++;
      this.$store.state.showTrainings = false;
      this.addNewTrainingDiv = false;
      this.addBlur = false;
      this.showArrowPen = true;
    },
    editTraining(index) {
      this.$store.state.showTrainings = false;
      this.$store.state.activeTrainingId = this.plan.trainings[
        index
      ].trainingId;
      this.$store.state.activePlanId = this.plan.id;
    },
    removeExc(excIndex, trainingIndex) {
      this.plan.trainings[trainingIndex].excs.splice(excIndex, 1);
    },
    showExcs() {
      if (this.toggleShowExcs == true) {
        this.toggleShowExcs = false;
        console.log(this.toggleShowExcs);
      } else if (this.toggleShowExcs == false) {
        this.toggleShowExcs = true;
        console.log(this.toggleShowExcs);
      }
    },
    showDeleteDiv(name, indeks) {
      if (this.deleteTrainingDiv === false) {
        this.deleteTrainingDiv = true;
        this.addBlur = true;
        this.deleteTrainingName = name;
        this.deleteTrainingIndex = indeks;
        this.showArrowPen = false;
      }
    },
    cancelDeleteDiv() {
      if (this.deleteTrainingDiv === true) {
        this.deleteTrainingDiv = false;
        this.addBlur = false;
        this.deleteTrainingName = '';
        this.deleteTrainingIndex = '';
        this.showArrowPen = true;
      }
    },
    confirmDeleteDiv() {
      if (this.deleteTrainingDiv === true) {
        this.plan.trainings.splice(this.deleteTrainingIndex, 1);
        this.deleteTrainingDiv = false;
        this.addBlur = false;
        this.deleteTrainingName = '';
        this.deleteTrainingIndex = '';
        this.showArrowPen = true;
      }
    },
    showID(indeks) {
      console.log(this.plan.trainings[indeks].trainingId);
    },
    increment(number) {
      if (number === 1) {
        this.editedExc.series++;
      } else if (number === 2) {
        this.editedExc.repeatsLeft++;
      } else if (number === 3) {
        this.editedExc.repeatsRight++;
      }
    },
    decrement(number) {
      if (number === 1) {
        if (this.editedExc.series > 1) {
          this.editedExc.series--;
        }
      } else if (number === 2) {
        if (this.editedExc.repeatsLeft > 1) {
          this.editedExc.repeatsLeftt--;
        }
      } else if (number === 3) {
        if (this.editedExc.repeatsRight > 1) {
          this.editedExc.repeatsRight--;
        }
      }
    },

    showEditBox(exc) {
      this.editedExcCopy = exc;
      this.editedExc = { ...exc };
      this.editExcDiv = true;
    },
    cancelEditBox() {
      this.editedExcCopy = null;
      this.editedExcCopy = null;
      this.editExcDiv = false;
    },
    confirmEditExc() {
      if (this.editedExc.repeatsLeft < this.editedExc.repeatsRight) {
        this.editedExcCopy.series = this.editedExc.series;
        this.editedExcCopy.repeatsLeft = this.editedExc.repeatsLeft;
        this.editedExcCopy.repeatsRight = this.editedExc.repeatsRight;
        this.editedExcCopy = null;
        this.editedExcCopy = null;
        this.editExcDiv = false;
      }
    },
    enter(el) {
      el.style.height = 'auto';
      const height = getComputedStyle(el).height;
      el.style.height = 0;

      getComputedStyle(el);

      setTimeout(() => {
        el.style.height = height;
      });
    },
    afterEnter(el) {
      el.style.height = 'auto';
    },
    leave(el) {
      el.style.height = getComputedStyle(el).height;
      getComputedStyle(el);
      setTimeout(() => {
        el.style.height = 0;
      });
    },
  },
};
</script>

<style scoped>
.addBlur {
  filter: blur(8px);
}

#plan .fa-arrow-left {
  position: fixed;
  top: 4%;
  left: 4%;
  transform: translateY(-50%);
  z-index: 5;
  color: #fafaff;
  font-size: 1.9rem;
}

.fa-pen-square {
  font-size: 2.1rem;
  color: #fafaff;
  position: fixed;
  right: 4%;
  top: calc((30px+0.75rem));
  transform: translateY(-50%);
  z-index: 5;
}

.planName {
  text-align: center;
  padding: 10px;
  letter-spacing: 1px;
  width: 100%;
  border-bottom: 1px solid #3f3f3f;
  box-sizing: border-box;
}

.planName h2 {
  color: #fafaff;
  font-size: 1.5rem;
  padding: 10px;
  font-weight: 700;
}

.trainingName {
  position: relative;
  padding: 10px;
  font-size: 1rem;
  color: #fafaff;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}

.nameDiv {
  padding: 5px 0;
  display: flex;
  align-items: center;
  flex-basis: 80%;
}

.nameDiv:active {
  background-color: #444444;
}

.nameDiv p {
  font-size: 1.3rem;
}

i.fa-chevron-circle-right {
  transition: transform 0.2s ease-in-out;
  font-size: 1.3rem;
  margin-right: 10px;
  color: #058ed9;
  padding-left: 3px;
}

i.open {
  transform: rotateZ(90deg);
}

.trainingOptionsDiv {
  flex-basis: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fa-trash,
.fa-pen {
  font-size: 1.4rem;
  padding: 0 5px;
}

.allExcsSection {
  flex-basis: 100%;
  margin-top: 10px;
}

.excsBox {
  position: relative;
  color: #e0e0e0;
  font-size: 1.1rem;
  border-bottom: 1px solid #058ed9;
  padding: 10px 0;
}

.excsBox p {
  padding: 3px 0;
  width: 90%;
}

.excsBox p:nth-of-type(1) {
  font-size: 1.2rem;
  color: #fafaff;
}

.excsBox .excSpan {
  color: #fafaff;
}

.excsBox .fa-times {
  position: absolute;
  right: 3%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
}

.excsBox:active {
  background-color: #444444;
  color: #fafaff;
}

.fade-enter-active,
.fade-leave-active {
  transition: height 0.5s ease-in-out;
  overflow: hidden;
}

section.deleteTrainingSection {
  background-color: var(--kolor-divow);
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: 5%;
  right: 5%;
  color: var(--kolor-bialy-tekstu);
  padding: 15px;
}

section.deleteTrainingSection h3 {
  color: #fafaff;
  text-align: left;
  font-size: 1.3rem;
  font-weight: 400;
  padding: 10px 0;
}

section.deleteTrainingSection p {
  padding: 10px 0;
  color: var(--kolor-niebieski);
  font-size: 1.4rem;
}

section.deleteTrainingSection .deleteBtnsBox {
  text-align: right;
  padding: 10px 0;
}

section.deleteTrainingSection .deleteBtnsBox button {
  margin: 0 10px;
  background: none;
  outline: none;
  border: none;
  font-size: 1.4rem;
  color: var(--kolor-bialy-tekstu);
}

.createNewTraining {
  position: fixed;
  background-color: #282828;
  top: 50%;
  transform: translateY(-50%);
  left: 5%;
  right: 5%;
  padding: 15px;
  margin: 0 auto;
  color: #fafaff;
}

.createNewTraining h3 {
  color: #fafaff;
  font-size: 1.5rem;
  font-weight: 400;
  padding: 10px 0;
  border-bottom: 1px solid #484848;
}

.createNewTraining .inputBox {
  margin-bottom: 20px;
  padding: 10px 0;
}

.createNewTraining .inputBox p {
  padding: 10px 0;
}

.createNewTraining .inputBox input {
  padding: 3px 0;
  font-size: 1.3rem;
  width: 100%;
  background-color: transparent;
  color: #fafaff;
  border: none;
  border-bottom: 1px solid var(--kolor-szary-tekstu);
}

.createNewTraining .inputBox input:focus {
  border-bottom: 1px solid var(--kolor-niebieski);
  caret-color: var(--kolor-niebieski);
}
.createNewTraining .inputBox input::placeholder {
  color: var(--kolor-szary-tekstu);
}

.createNewTraining .btnsBox {
  padding: 10px 0;
  text-align: right;
}

.createNewTraining .btnsBox button {
  margin: 0 10px;
  background: none;
  outline: none;
  border: none;
  font-size: 1.3rem;
  color: var(--kolor-bialy-tekstu);
}

.ruter {
  pointer-events: none;
}

div.circle {
  border: 1px solid var(--kolor-szary-tekstu);
  background-color: var(--kolor-szary-tekstu);
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #282828;
}

div.circle:nth-child(1) {
  margin-right: 10px;
}

div.circle:active {
  background-color: var(--kolor-bialy-tekstu);
}

.editExcDiv p,
.editExcDiv i {
  display: inline-block;
}

.editExcDiv i {
  font-size: 1.8rem;
}

.editExcDiv {
  position: fixed;
  background-color: #282828;
  top: 50%;
  transform: translateY(-50%);
  left: 5%;
  right: 5%;
  padding: 15px;
  margin: 0 auto;
  color: #fafaff;
}

.editExcDiv > p {
  font-weight: 600;
  color: var(--kolor-niebieski);
  font-size: 1.4rem !important;
  margin-bottom: 10px;
}

.editExcDiv p {
  font-size: 1.6rem;
}

.editExcDiv .series {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 10px;
  box-sizing: border-box;
  padding: 10px 10px 30px 0;
}

.series .faBox {
  display: flex;
}

.editExcDiv .repeats {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 10px 0;
}

.repeats p {
  display: flex;
  align-items: center;
}

.repeats .repeatsDiv {
  display: flex;
  flex-direction: column;
}

.seriesDiv,
.repeatsDiv .repeatsDivLeft,
.repeatsDiv .repeatsDivRight {
  display: flex;
  flex-wrap: nowrap;
  padding: 10px 0;
}

.repeatsDiv .faBox {
  display: flex;
}

.series .seriesInput,
.repeats div input {
  padding: 3px;
  width: 60px;
  border-bottom: 1px solid var(--kolor-niebieski);
  margin-right: 8px;
}

.editExcDiv .btnsBox {
  text-align: right;
  padding: 20px 0 10px;
}

.editExcDiv .btnsBox button {
  margin: 0 10px;
  background: none;
  outline: none;
  border: none;
  font-size: 1.5rem;
  color: var(--kolor-bialy-tekstu);
}

.editExcDiv input {
  padding: 3px 0;
  font-size: 1.5rem;
  background-color: transparent;
  color: #fafaff;
  border: none;
}
</style>
