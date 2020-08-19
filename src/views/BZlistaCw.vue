<template>
  <div>
    <router-link to="/baza-cwiczen"
      ><i class="fas fa-arrow-left"></i
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
            <section v-if="partia.idPartii != 8">
              <i
                @click="moveExc(index)"
                v-show="indexText != index"
                class="fas fa-share-square"
              ></i>
              <div v-show="indexText == index" class="loader"></div>
            </section>
          </div>
        </div>
        <!-- POWIADOMIENIA -->
        <SnackbarInfo
          text="Dodano ćwiczenie!"
          v-show="showSnackbarInfo"
          :klasa="showSnackbarInfo == true ? 'true' : ''"
        />
      </div>
    </div>
    <div class="addNewExc" v-if="addNewExcDiv">
      <h3>Nowe ćwiczenie</h3>
      <div class="inputBox">
        <input
          style="outline:none"
          @input="setExcName"
          type="text"
          placeholder="Nazwa"
        />
      </div>
      <div class="btnsBox">
        <button @click="cancelAddNewExc">Anuluj</button
        ><button
          @click="confirmAddExc"
          :class="{ emptyInputBtn: inputIsEmpty }"
        >
          Dodaj
        </button>
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
  </div>
</template>

<script>
import SnackbarInfo from '../components/SnackbarInfo.vue';
export default {
  components: { SnackbarInfo },
  data() {
    return {
      newExcName: '',
      addNewExcDiv: false,
      addBlur: false,
      changeNameDiv: false,
      indexOfExc: null,
      nameOfDeleteExc: '',
      showLoader: true,
      showSnackbarInfo: false,
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
  },
  methods: {
    setExcName(e) {
      this.newExcName = e.target.value;
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
    showAddExcDiv() {
      this.addNewExcDiv = true;
      this.addBlur = true;
      this.$store.state.disableNavBtns = true;
      this.$store.state.disableButtons = true;
      this.$store.state.displayNav = false;
      this.$store.state.displaySnackbars = false;
    },
    cancelAddNewExc() {
      this.newExcName = '';
      this.addNewExcDiv = false;
      this.addBlur = false;
      this.changeNameDiv = false;
      this.$store.state.disableNavBtns = false;
      this.$store.state.disableButtons = false;
      this.$store.state.displayNav = true;
      this.$store.state.displaySnackbars = true;
    },
    confirmAddExc() {
      if (this.newExcName != '') {
        if (this.snackbarShow != '') {
          clearTimeout(this.snackbarShow);
        }
        this.partia.cwiczenia.push(this.newExcName);
        this.newExcName = '';
        this.addNewExcDiv = false;
        this.addBlur = false;
        this.$store.state.disableNavBtns = false;
        this.$store.state.disableButtons = false;
        this.$store.state.displayNav = true;
        // SNACKBAR
        this.showSnackbarInfo = true;
        this.snackbarShow = setTimeout(() => {
          this.showSnackbarInfo = false;
        }, 6000);
      }
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
    test() {
      this.showpopup = false;
    },
    showpopupOff() {
      this.showpopup = false;
      this.showpopupDelete = false;
    },
    undoExc() {
      console.log(this.partia);
    },
    moveExc(indeks) {
      this.indexText = indeks;
      this.$store.state.bazaCw[7].cwiczenia.push(
        this.partia.cwiczenia[indeks],
      );
      setTimeout(() => {
        this.indexText = null;
      }, 400);
    },
  },
};
</script>

<style>
.fa-share-square {
  font-size: 1.2rem;
  color: #e0e0e0;
}

.loader {
  border: 3px solid #f3f3f3;
  border-radius: 50%;
  border-top: 3px solid #3498db;
  width: 20px;
  height: 20px;
  animation: spin 0.4s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
