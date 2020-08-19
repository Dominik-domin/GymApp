<template>
  <div>
    <router-link
      :to="
        `plany-treningowe/${planNames[activePlanIndex].id}/wybor-cwiczen`
      "
      ><i @click="display" class="fas fa-arrow-left"></i
    ></router-link>
    <div id="listaCw" :class="addBlur == true ? 'addBlur' : ''">
      <div v-if="partia">
        <div class="namePartBox">
          <h2>{{ partia.name }}</h2>
        </div>
        <div class="addToPlanBox" @click="showAddExcDiv">
          <i class="fas fa-plus"></i>
          <p>Nowe ćwiczenie</p>
        </div>
        <div
          class="cwiczenie"
          v-for="(cwiczenie, index) in partia.cwiczenia"
          :key="`cwiczenie-${index}`"
        >
          <div class="cwiczenieDiv">
            <p v-touch:touchhold="changeExcName.bind(this, index)">
              {{ partia.cwiczenia[index] }}
            </p>
            <section>
              <i
                @click="showAddExcToTrainingDiv(index)"
                class="fas fa-share-square"
              ></i>
            </section>
          </div>
        </div>
      </div>
    </div>
    <div class="addNewExc" v-if="addNewExcDiv">
      <h3>Nowe ćwiczenie</h3>
      <div class="inputBox">
        <input
          style="outline:none"
          v-model="newExcName"
          type="text"
          placeholder="Nazwa..."
        />
      </div>
      <div class="btnsBox">
        <button @click="cancelAddNewExc">Anuluj</button
        ><button @click="confirmAddExc">Dodaj</button>
      </div>
    </div>
    <div class="addNewExc" v-if="changeNameDiv">
      <h3>Zmień nazwę lub usuń</h3>
      <h4>{{ partia.cwiczenia[indexOfExc] }}</h4>
      <div class="inputBox">
        <input
          style="outline:none"
          @input="setExcName"
          v-model="newExcName"
          type="text"
          placeholder="Zmień nazwę"
        />
      </div>
      <div class="btnsBoxChange">
        <i @click="removeExc" class="fas fa-trash"></i>
        <div>
          <button @click="cancelAddNewExc">Anuluj</button
          ><button
            @click="confirmChangeName"
            :class="{ emptyInputBtn: inputIsEmpty }"
          >
            Zmień
          </button>
        </div>
      </div>
    </div>

    <div v-if="addExcToTrainingDiv" class="addExcToTraining">
      <p>{{ partia.cwiczenia[this.indexOfExc] }}</p>
      <div class="seriesBox">
        <div class="series">
          <p>Serie</p>
          <div class="seriesDiv">
            <input
              style="outline:none"
              v-model="series"
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
                v-model="repeatsLeft"
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
                v-model="repeatsRight"
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
        <button @click="cancelAddExcToTraining">Anuluj</button
        ><button @click="confirmAddExcToTraining">Dodaj</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newExcName: '',
      changeNameDiv: false,
      addNewExcDiv: false,
      addBlur: false,
      addExcToTrainingDiv: false,
      showTrainingName: true,
      indexOfExc: null,
      series: 3,
      repeatsLeft: 8,
      repeatsRight: 10,
      showLoader: true,
      indexText: null,
    };
  },
  computed: {
    partia() {
      return this.$store.getters.bazaCwPartia(
        this.$route.params.name,
      );
    },
    inputIsEmpty() {
      return !this.newExcName.length;
    },
    planNames() {
      return this.$store.state.planNames;
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
    moveExc(indeks) {
      this.indexText = indeks;
      this.$store.state.bazaCw[7].cwiczenia.push(
        this.partia.cwiczenia[indeks],
      );
      setTimeout(() => {
        this.indexText = null;
      }, 400);
    },
    changeExcName(index) {
      this.$store.state.displaySnackbars = false;
      this.indexOfExc = index;
      this.animated = true;
      this.changeNameDiv = true;
      this.addBlur = true;
      this.$store.state.disableNavBtns = true;
      this.$store.state.disableButtons = true;
      this.$store.state.displayNav = false;
      this.nameOfDeleteExc = this.partia.cwiczenia[this.indexOfExc];
    },
    confirmChangeName() {
      if (this.newExcName != '') {
        this.partia.cwiczenia[this.indexOfExc] = this.newExcName;
        this.newExcName = '';
        this.changeNameDiv = false;
        this.addBlur = false;
        this.$store.state.disableNavBtns = false;
        this.$store.state.disableButtons = false;
        this.$store.state.displayNav = true;
        this.popupText = 'Zmieniono nazwę ćwiczenia';
        this.showpopup = true;
      }
    },
    removeExc() {
      this.partia.cwiczenia.splice(this.indexOfExc, 1);
      this.changeNameDiv = false;
      this.addBlur = false;
      this.$store.state.disableNavBtns = false;
      this.$store.state.disableButtons = false;
      this.$store.state.displayNav = true;
      this.$store.state.displaySnackbars = true;
      this.$store.state.showSnackbar = true;
      this.$store.state.whichSnackDisplay = 'removedExc';
      this.$store.state.textOfDeletedSnack = 'Usunięto ćwiczenie';
      this.$store.state.deletedExcTab = this.partia.cwiczenia;
      this.$store.state.deletedExcName = this.nameOfDeleteExc;
      this.$store.state.deletedExcIndex = this.indexOfExc;
      this.$store.state.snackbarTimeout = setTimeout(() => {
        this.$store.state.showSnackbar = false;
      }, 6000);
    },
    setExcName(e) {
      this.newExcName = e.target.value;
    },
    showAddExcDiv() {
      this.addNewExcDiv = true;
      this.addBlur = true;
      this.$store.state.disableNavBtns = true;
      this.$store.state.disableButtons = true;
    },
    cancelAddNewExc() {
      this.newExcName = '';
      this.addNewExcDiv = false;
      this.addBlur = false;
      this.changeNameDiv = false;
      this.$store.state.disableNavBtns = false;
      this.$store.state.disableButtons = false;
    },
    confirmAddExc() {
      if (this.newExcName != '') {
        this.partia.cwiczenia.push(this.newExcName);
        this.newExcName = '';
        this.addNewExcDiv = false;
        this.addBlur = false;
        this.$store.state.disableNavBtns = false;
        this.$store.state.disableButtons = false;
      }
    },
    showAddExcToTrainingDiv(index) {
      this.indexOfExc = index;
      this.addExcToTrainingDiv = true;
      this.addBlur = true;
      this.$store.state.disableNavBtns = true;
      this.$store.state.disableButtons = true;
      this.showTrainingName = false;
    },
    cancelAddExcToTraining() {
      this.addExcToTrainingDiv = false;
      this.addBlur = false;
      this.$store.state.disableNavBtns = false;
      this.$store.state.disableButtons = false;
      this.showTrainingName = true;
      this.series = 3;
      this.repeatsLeft = 8;
      this.repeatsRight = 10;
    },
    confirmAddExcToTraining() {
      if (this.repeatsLeft >= this.repeatsRight) {
        console.log('błedny przedział');
      } else {
        this.planNames[this.activePlanIndex].trainings[
          this.activeTrainingIndex
        ].excs.push({
          excName: this.partia.cwiczenia[this.indexOfExc],
          series: this.series,
          repeatsLeft: this.repeatsLeft,
          repeatsRight: this.repeatsRight,
          seriesTab: [],
          excId:
            this.planNames[this.activePlanIndex].trainings[
              this.activeTrainingIndex
            ].idOfExc + 1,
        });
        /*
        let excIndex =
          this.planNames[this.activePlanIndex].trainings[
            this.activeTrainingIndex
          ].excs.length - 1;

        //console.log(excIndex);
        
        for (
          let i = 0;
          i <
          this.planNames[this.activePlanIndex].trainings[
            this.activeTrainingIndex
          ].excs[excIndex].series;
          i++
        ) {
          //console.log('zadzialalo');
          this.planNames[this.activePlanIndex].trainings[
            this.activeTrainingIndex
          ].excs[excIndex].seriesTab.push({
            //seriesNumber: i + 1,
            weight: 0,
            repeats: 0,
            done: false,
          });
        }*/
        //------------
        this.planNames[this.activePlanIndex].trainings[
          this.activeTrainingIndex
        ].idOfExc++,
          (this.addExcToTrainingDiv = false);
        this.addBlur = false;
        this.$store.state.disableNavBtns = false;
        this.$store.state.disableButtons = false;
        this.showTrainingName = true;
        this.series = 3;
        this.repeatsLeft = 8;
        this.repeatsRight = 10;
      }
    },
    display() {
      this.$store.state.displayExcs = true;
    },
    increment(number) {
      if (number === 1) {
        this.series++;
      } else if (number === 2) {
        this.repeatsLeft++;
      } else if (number === 3) {
        this.repeatsRight++;
      }
    },
    decrement(number) {
      if (number === 1) {
        if (this.series > 1) {
          this.series--;
        }
      } else if (number === 2) {
        if (this.repeatsLeft > 1) {
          this.repeatsLeft--;
        }
      } else if (number === 3) {
        if (this.repeatsRight > 1) {
          this.repeatsRight--;
        }
      }
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

.namePartBox {
  text-align: center;
  padding: 10px;
  color: var(--kolor-bialy-tekstu);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 10px;
}
.namePartBox h2 {
  border-bottom: 1px solid #484848;
  padding-bottom: 5px;
  font-weight: 400;
}

.addToPlanBox {
  display: flex;
  padding: 10px;
  padding-left: 15px;
  transition: 0.5s;
}

.addToPlanBox:active {
  background-color: #565857;
}

.addToPlanBox .fa-plus {
  font-size: 1.5rem;
  color: var(--kolor-niebieski);
}

.addToPlanBox p {
  font-size: 1.3rem;
  margin-left: 10px;
  color: var(--kolor-niebieski);
}

.cwiczenie {
  padding: 20px 5px;
  font-size: 1rem;
  font-family: sans-serif;
}

.cwiczenieDiv {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.cwiczenieDiv p {
  color: var(--kolor-lekko-bialy-tekstu);
  width: 85%;
  margin-left: 10px;
}

.cwiczenieDiv section {
  width: 15%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cwiczenieDiv section .inputCheckbox {
  transform: scale(1.5);
}

.addNewExc {
  position: fixed;
  background-color: #282828;
  top: 50%;
  left: 5%;
  right: 5%;
  transform: translateY(-50%);
  padding: 15px 15px;
  margin: 0 auto;
}

.addNewExc h3 {
  color: #fafaff;
  text-align: left;
  font-size: 1.5rem;
  font-weight: 400;
  padding: 10px 0;
}

.addNewExc .inputBox {
  margin-bottom: 20px;
  padding: 10px 0;
}

.addNewExc .inputBox input {
  padding: 3px 0;
  font-size: 1.3rem;
  width: 100%;
  background-color: transparent;
  color: #fafaff;
  border: none;
  border-bottom: 1px solid var(--kolor-szary-tekstu);
}

.addNewExc .inputBox input:focus {
  border-bottom: 1px solid var(--kolor-niebieski);
  caret-color: var(--kolor-niebieski);
}
.addNewExc .inputBox input::placeholder {
  color: var(--kolor-szary-tekstu);
}

.addNewExc .btnsBox {
  padding: 10px 0;
  text-align: right;
}

.addNewExc .btnsBox button {
  margin: 0 10px;
  background: none;
  outline: none;
  border: none;
  font-size: 1.3rem;
  color: var(--kolor-bialy-tekstu);
}

.addNewExc .btnsBox .emptyInputBtn {
  margin: 0 10px;
  background: none;
  outline: none;
  border: none;
  font-size: 1.4rem;
  color: var(--kolor-szary-tekstu);
}

.addExcToTraining p,
.addExcToTraining i {
  display: inline-block;
}

.addExcToTraining i {
  font-size: 1.8rem;
}

.addExcToTraining {
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

.addExcToTraining > p {
  font-weight: 600;
  color: var(--kolor-niebieski);
  font-size: 1.4rem !important;
  margin-bottom: 10px;
}

.addExcToTraining p {
  font-size: 1.6rem;
}

.addExcToTraining .series {
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

.addExcToTraining .repeats {
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

.addExcToTraining .btnsBox {
  text-align: right;
  padding: 20px 0 10px;
}

.addExcToTraining .btnsBox button {
  margin: 0 10px;
  background: none;
  outline: none;
  border: none;
  font-size: 1.5rem;
  color: var(--kolor-bialy-tekstu);
}

.addExcToTraining input {
  padding: 3px 0;
  font-size: 1.5rem;
  background-color: transparent;
  color: #fafaff;
  border: none;
}
</style>
