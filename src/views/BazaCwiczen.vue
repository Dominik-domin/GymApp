<template>
  <div id="bazaCwiczen">
    <div class="excBox">
      <div class="headerBox"><h2>Baza Ćwiczeń</h2></div>
      <div
        class="btnBox"
        v-for="(partia, index) in bazaCw"
        :key="index"
      >
        <router-link
          :to="{
            name: 'baza-cwiczen',
            params: { name: partia.name },
          }"
          ><button>{{ partia.name }}</button>
          <h4 v-if="partia.cwiczenia.length > 0">
            Ilość ćwiczeń: {{ partia.cwiczenia.length }}
          </h4>
          <h4 v-else>Brak ćwiczeń :( Dodaj coś nowego!</h4>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    bazaCw() {
      return this.$store.state.bazaCw;
    },
  },
};
</script>
