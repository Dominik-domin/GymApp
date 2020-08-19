<template>
  <div>
    <router-link to="/nowy-trening/dodaj-cwiczenie"
      ><i class="fas fa-arrow-left"></i
    ></router-link>
    <div id="listaCw" :class="addBlur == true ? 'addBlur' : ''">
      <div v-if="partia">
        <div class="nazwaPartii">
          <h1>{{ partia.name }}</h1>
          <i class="fas fa-plus" @click="showAddExcDiv"></i>
        </div>
        <div
          class="cwiczenie"
          v-for="(cwiczenie, index) in partia.cwiczenia"
          :key="`cwiczenie-${index}`"
        >
          <p
            v-touch:touchhold="
              showAddExcToTrainingDiv.bind(this, index)
            "
          >
            {{ partia.cwiczenia[index] }}
          </p>
          <i @click="removeExc(index)" class="fas fa-times"></i>
        </div>
      </div>
    </div>
    <div class="addNewExc" v-if="addNewExcDiv">
      <h3>Dodaj nowe ćwiczenie do swojej bazy ćwiczeń</h3>
      <div class="inputBox">
        <p>Podaj nazwę ćwiczenia:</p>
        <input
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
    <div v-if="addExcToTrainingDiv" class="addExcToTraining">
      <h3>Dodaj ćwiczenie do swojego treningu</h3>
      <p>{{ partia.cwiczenia[this.indexOfExc] }}</p>
      <div class="seriesBox">
        <div class="series">
          <p>Serie:</p>
          <i @click="decrement(1)" class="fas fa-minus"></i>
          <input v-model="series" class="seriesInput" type="number" />
          <i @click="increment(1)" class="fas fa-plus"></i>
        </div>
        <div class="repeats">
          <p>Przedział powtórzeń:</p>
          <div class="repeatsDivLeft">
            <i @click="decrement(2)" class="fas fa-minus"></i>
            <input
              v-model="repeatsLeft"
              class="repeatsInputLeft"
              type="number"
            />
            <i @click="increment(2)" class="fas fa-plus"></i>
          </div>
          <div class="repeatsDivRight">
            <i @click="decrement(3)" class="fas fa-minus"></i>
            <input
              v-model="repeatsRight"
              class="repeatsInputRight"
              type="number"
            />
            <i @click="increment(3)" class="fas fa-plus"></i>
          </div>
        </div>
      </div>
      <div class="btnsBox">
        <button @click="cancelAddExcToTraining">Anuluj</button
        ><button @click="confirmAddExcToTrainingg">Dodaj</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newExcName: '',
      addNewExcDiv: false,
      addBlur: false,
      addExcToTrainingDiv: false,
      showTrainingName: true,
      indexOfExc: null,
      series: 3,
      repeatsLeft: 8,
      repeatsRight: 10,
    };
  },
  computed: {
    partia() {
      return this.$store.getters.bazaCwPartia(
        this.$route.params.name,
      );
    },
    currentTraining() {
      return this.$store.state.currentTraining;
    },
  },
  methods: {
    removeExc(index) {
      if (this.$store.state.disableButtons == false) {
        this.partia.cwiczenia.splice(index, 1);
      }
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
    // DODAWANIE CWICZENIA
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
    confirmAddExcToTrainingg() {
      if (this.repeatsLeft >= this.repeatsRight) {
        console.log('błedny przedział');
      } else {
        //WERSJA NA MUTACJACH
        this.$store.commit('dodajCwiczenie', {
          excName: this.partia.cwiczenia[this.indexOfExc],
          series: this.series,
          repeatsLeft: this.repeatsLeft,
          repeatsRight: this.repeatsRight,
          seriesTab: [],
        });

        let excIndex = this.currentTraining[0].excs.length - 1;

        for (
          let i = 0;
          i < this.currentTraining[0].excs[excIndex].series;
          i++
        ) {
          this.currentTraining[0].excs[excIndex].seriesTab.push({
            weight: 0,
            repeats: 0,
            done: false,
          });
        }

        this.addExcToTrainingDiv = false;
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
div.trainingName {
  display: flex;
  font-size: 0.8rem;
  padding: 5px;
  justify-content: space-around;
  text-align: center;
}

div.trainingName h2 {
  display: block;
  color: #fafaff;
  flex-basis: 50%;
  padding: 5px;
}

.fa-arrow-left {
  position: fixed;
  top: 2%;
  left: 2%;
  z-index: 5;
  color: #fafaff;
  font-size: 1.5rem;
}

.addBlur {
  filter: blur(8px);
}

.nazwaPartii {
  display: flex;
  position: relative;
  color: #afafaf;
  text-align: center;
  text-transform: capitalize;
  font-family: sans-serif;
  font-size: 0.9rem;
  margin: 5px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.nazwaPartii .fa-plus {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
}

.cwiczenie {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 5px;
  font-size: 1.1rem;
  font-family: sans-serif;
  border-bottom: 1px solid #484848;
}

.cwiczenie .fa-times {
  color: #e0e0e0;
  font-size: 1.3rem;
  margin-right: 15px;
}

.cwiczenie p {
  color: #e0e0e0;
  width: 80%;
  margin-left: 10px;
}

/* dodawanie cwiczenia */

.addNewExc {
  position: fixed;
  background-color: #282828;
  top: 25%;
  bottom: 25%;
  left: 5%;
  right: 5%;
  padding: 10px 0;
  margin: 0 auto;
  text-align: center;
  border-radius: 8px;
}

.addNewExc h3 {
  color: #fafaff;
  font-size: 1.2rem;
  padding-bottom: 10px;
  border-bottom: 1px solid #484848;
}

.addNewExc .inputBox {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 5%;
}

.inputBox {
  color: #fafaff;
  text-align: left;
}

.inputBox input {
  font-size: 1.3rem;
  padding: 3px;
}

.inputBox p {
  font-size: 1rem;
  margin-bottom: 5px;
}

.addNewExc .btnsBox {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
}

.btnsBox button {
  background: none;
  outline: none;
  border: none;
  font-size: 1.5rem;
  color: #fafaff;
}

/* dodawanie cwiczenia do treningu */

.addExcToTraining {
  position: fixed;
  background-color: #282828;
  top: 50%;
  transform: translateY(-50%);
  left: 5%;
  right: 5%;
  padding: 10px 0;
  margin: 0 auto;
  text-align: center;
  border-radius: 8px;
  color: #fafaff;
}

.addExcToTraining .btnsBox {
  display: flex;
  justify-content: space-around;
}

.addExcToTraining input {
  width: 30px;
  padding: 5px;
}

.addExcToTraining .seriesBox div {
  margin: 5px;
  font-size: 1.2rem;
}
</style>
