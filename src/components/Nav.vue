<template>
  <div id="nav" v-if="displayNav">
    <aside class="disableNavBtns" v-if="disableNavBtns"></aside>
    <div>
      <router-link to="baza-cwiczen">
        <div>
          <i class="fas fa-dumbbell"></i><button>Baza ćwiczeń</button>
        </div>
      </router-link>
    </div>
    <div>
      <router-link to="historia"
        ><div>
          <i class="fas fa-history"></i><button>Historia</button>
        </div></router-link
      >
    </div>
    <div>
      <router-link to="plany-treningowe">
        <div>
          <i class="fas fa-book-open"></i><button>Moje plany</button>
        </div></router-link
      >
    </div>
    <div>
      <router-link to="nowy-trening">
        <div>
          <i class="fas fa-child"></i>
          <button>Nowy trening</button>
        </div></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chuj: false,
    };
  },
  computed: {
    disableNavBtns() {
      return this.$store.state.disableNavBtns;
    },
    displayNav() {
      return this.$store.state.displayNav;
    },
  },
};
</script>

<style scoped>
#nav {
  position: fixed;
  bottom: 0;
  display: flex;
  left: 0;
  right: 0;
  background-color: #2f2f2f;
  padding: 10px 10px;
  border-top: 1px solid #3f3f3f;
}

#nav div {
  flex-grow: 1;
  flex-basis: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#nav div button {
  background: none;
  border: none;
  outline: none;
  color: #fafaff;
  font-size: 0.7rem;
}

#nav div .fas {
  font-size: 1rem;
  color: #fafaff;
  margin-bottom: 4px;
}

#nav a {
  display: block;
  width: 100%;
  text-decoration: none;
}

.disableNavBtns {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
