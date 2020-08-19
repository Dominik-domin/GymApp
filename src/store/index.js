import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bazaCw: [
      {
        idPartii: 1,
        name: 'klata',
        cwiczenia: [
          'Wyciskanie sztangi na ławce płaskiej',
          'Wyciskanie sztangi na skosie dodatnim',
          'Wyciskanie sztangi na skosie ujemnym',
          'Wyciskanie na ławce płaskiej hantlami',
          'Wyciskanie na ławce skośnej hantlami (skos dodatni)',
          'Wyciskanie na ławce skośnej hantlami (skos ujemny)',
          'Krzyżowanie linek wyciągu górnego z góry do dołu',
          'Krzyżowanie linek wyciągu dolnego z dołu do góry',
          'Rozpiętki w leżeniu na ławce płaskiej',
          'Rozpiętki w leżeniu na ławce skośnej',
          'Rozpiętki w leżeniu na podłodze',
          'Bayesian Flyes',
          'Pompki',
          'Rozpiętki na maszynie typu butterfly',
          'Wyciskanie na maszynie siedząc',
          'Przenoszenie sztangielki w leżeniu w poprzek ławki poziomej',
        ],
      },
      {
        idPartii: 2,
        name: 'plecy',
        cwiczenia: [
          'Podciąganie na drążku podchwytem',
          'Podciąganie na drążku nachwytem',
          'Podciąganie na drążku - chwyt neutralny',
          'Ściąganie drążka/linki wyciągu górnego do klatki nachwytem',
          'Ściąganie drążka/linki wyciągu górnego do klatki podchwytem',
          'Ściąganie drążka/linki wyciągu górnego do klatki - chwyt neutralny',
          'Podciąganie australijskie',
          'Wiosłowanie sztangą w opadzie tułowia - nachwyt',
          'Wiosłowanie sztanga w opadzie tułowia - podchwyt',
          'Wiosłowanie hantlem w oparciu o ławkę',
          'Wiosłowanie hantlem w oparciu o stojak',
          'Pendlay Row',
          'Wiosłowanie końcem sztang',
          'Wiosłowanie końcem sztangi 1 ręką stojąc bokiem',
          'Martwy ciąg klasyczny',
          'Martwy ciąg sumo',
          'Martwy ciąg na prostych nogach',
          'Rumuński Martwy Ciąg',
          'Ściąganie linek wyciągu górnego do boku (pull ins)',
          'Narciarz',
        ],
      },
      {
        idPartii: 3,
        name: 'biceps',
        cwiczenia: [
          'Uginanie hantli z supinacją nadgarstka',
          'Uginanie hantli młotkowe',
          'Uginanie hantli na modlitewniku',
          'Uginanie hantli siedząc w oparciu o ławkę',
          'Uginanie hantli 1 ręką w podporze o nogę',
          'Uginanie sztangi prostej stojąc',
          'Uginanie sztangi prostej na modlitewniku',
          'Bayesian Curls',
          'Herkulesy',
        ],
      },
      {
        idPartii: 4,
        name: 'triceps',
        cwiczenia: [
          'Uginanie hantli francuskie stoją',
          'Uginanie hantli francuskie siedząc',
          'Uginanie sztangi francuskie leżąc (robione za głowę)',
          'Uginanie francuskie leżąc (robione za głowę)',
          'Prostowania ramion na wyciągu (drążek)',
          'Prostowania ramion na wyciągu (linki)',
          'Dipy na poręczach',
          'Wyciskanie sztangi wąsko',
        ],
      },
      {
        idPartii: 5,
        name: 'barki',
        cwiczenia: [
          'Wyciskanie sztangi nad głowę stojąc',
          'Wyciskanie sztangi nad głowę siedząc',
          'Wyciskanie hantli nad głowę stojąc',
          'Wyciskanie hantli nad głowę siedząc',
          'Unoszenie hantli bokiem stojąc',
          'Unoszenie hantli bokiem w oparciu o ławkę brzuchem stojąc',
          'Unoszenie ramion w bok na wyciągu',
          'Przyciąganie sznurków do brody na wyciągu z dołu do góry',
          'Facepull',
          'Barbell Facepull',
          'Unoszenie bokiem w opadzie tułowia',
          'Odwrotne rozpiętki leżąc na ławce skośnej brzuchem',
        ],
      },
      {
        idPartii: 6,
        name: 'nogi',
        cwiczenia: [
          'Przysiad Klasyczny',
          'Przysiad Low bar',
          'Front Squat',
          'Goblet Squat',
          'Przysiad bułgarski',
          'Wypychanie nóg na suwnicy',
          'Prostowanie nóg na maszynie',
          'Przysiad bułgarski',
          'Zakroki z hantlami',
          'Zakroki ze sztangą',
          'Rumuński Martwy ciąg',
          'KickBacks na wyciągu',
          'Uginanie nóg na maszynie siedząc',
          'Uginanie nóg leżąc brzuchem na ławce hantlami miedzy stopami',
          'Wspięcia na palce stojąc',
          'Wspięcia na palce siedząc',
        ],
      },
      {
        idPartii: 7,
        name: 'brzuch',
        cwiczenia: [
          'Plank klasyczny',
          'Plank na piłce',
          'Plank z oddaleniem łokci do przodu',
          'Kółeczko z siedzenia',
          'Kółeczko ze stania',
          'Unoszenie nóg w leżeniu na podłodze',
          'Unoszenie nóg w zwisie na drążku',
          'Allahy',
          'Hollow body',
          'Plank boczny',
          'Paloff press',
          'Woodchooper',
        ],
      },
      {
        idPartii: 8,
        name: 'własne ćwiczenia',
        cwiczenia: [],
      },
    ],
    disableButtons: false,
    disableNavBtns: false,
    displayNav: true,
    planNames: [],
    newPlanId: 1,
    activeTrainingId: '',
    activePlanId: '',
    showTrainings: true,
    displayExcs: true,
    trainingIsChosen: false,
    currentTraining: [],
    history: [],
    historyId: 1,
    showSnackbar: false,
    displaySnackbars: true,
    textOfDeletedSnack: '',
    usuniety: null,
    whichSnackDisplay: '',
  },
  getters: {
    bazaCw: state => {
      return state.bazaCw;
    },
    bazaCwPartia: state => name => {
      return state.bazaCw.find(
        bazaCwPartia => bazaCwPartia.name === name,
      );
    },
    planNames: state => {
      return state.planNames;
    },
    currentTraining: state => {
      return state.currentTraining;
    },
    planNamesId: state => id => {
      return state.planNames.find(
        planNamesId => planNamesId.id === id,
      );
    },
    history: state => {
      return state.history;
    },
    historyID: state => id => {
      return state.history.find(
        historyID => historyID.history_id === id,
      );
    },
    showSnackbar: state => {
      return state.showSnackbar;
    },
  },
  mutations: {
    dodajCwiczenie(state, n) {
      state.currentTraining[0].excs.push(n);
    },
    dodajDoUsunietych(state, n) {
      state.usuniety = n;
    },
  },
  actions: {},
  modules: {},
});
