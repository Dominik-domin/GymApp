<template>
  <div id="bazaCwiczen">
    <div class="excBox">
      <router-link to="/nowy-trening"
        ><i @click="displayMenu" class="fas fa-arrow-left"></i
      ></router-link>
      <div class="btnBox" v-for="partia in bazaCw" :key="partia.id">
        <router-link
          :to="{
            name: 'nowy-trening',
            params: { name: partia.name },
          }"
        >
          <button>{{ partia.name }}</button>
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
  methods: {
    displayMenu() {
      this.$store.state.displayNav = true;
    },
  },
};
</script>

<style scoped>
.excBox {
  position: absolute;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  width: 100%;
}

.excBox .btnBox {
  flex-basis: 30%;
  padding: 10px 5px;
  margin: 10px 0;
}

.btnBox button {
  text-align: left;
  display: inline-block;
  width: 100%;
  font-size: 1.3rem;
  color: #afafaf;
  text-transform: uppercase;
  background: none;
  border: none;
  outline: none;
}

.btnBox p {
  color: #e0e0e0;
}

.fa-arrow-left {
  position: fixed;
  top: 2%;
  left: 2%;
  z-index: 4;
  color: #fafaff;
  font-size: 1.5rem;
  z-index: 10;
}
</style>
