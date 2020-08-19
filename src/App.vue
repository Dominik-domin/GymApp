<template>
  <div id="app">
    <aside class="disableArrowLeft" v-if="disableNavBtns"></aside>
    <header class="header">
      <h1>App<span class="logo">Gym</span></h1>
    </header>
    <div class="container">
      <router-view />
    </div>
    <SnackbarDelete
      :text="textOfDeletedSnack"
      v-show="displaySnackbars"
    />
    <Nav />
  </div>
</template>

<script>
import Nav from './components/Nav';
import SnackbarDelete from './components/SnackbarDelete';

export default {
  components: {
    Nav,
    SnackbarDelete,
  },
  computed: {
    textOfDeletedSnack() {
      return this.$store.state.textOfDeletedSnack;
    },
    disableNavBtns() {
      return this.$store.state.disableNavBtns;
    },
    displaySnackbars() {
      return this.$store.state.displaySnackbars;
    },
  },
  methods: {
    show() {
      console.log('snackbar fafsfasasfasasf');
    },
  },
};
</script>
