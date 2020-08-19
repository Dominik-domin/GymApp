import Vue from 'vue';
import VueRouter from 'vue-router';
import BazaCwiczen from '../views/BazaCwiczen';
import Historia from '../views/Historia';
import PlanyTreningowe from '../views/PlanyTreningowe';
import BZlistaCw from '../views/BZlistaCw';
import PTplan from '../views/PTplan';
import WyborCwiczen from '../views/WyborCwiczen';
import WyborCwiczenListaCw from '../views/WyborCwiczenListaCw';
import NowyTrening from '../views/NowyTrening';
import CurrentBazaCwiczen from '../views/CurrentBazaCwiczen';
import CurrentBZlistaCw from '../views/CurrentBZlistaCw';
import HistoriaTrening from '../views/HistoriaTrening';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
  },
  {
    path: '/baza-cwiczen',
    component: BazaCwiczen,
  },
  {
    path: '/historia',
    component: Historia,
  },
  {
    path: '/plany-treningowe',
    component: PlanyTreningowe,
  },
  {
    path: '/nowy-trening',
    component: NowyTrening,
  },
  {
    path: '/nowy-trening/dodaj-cwiczenie',
    component: CurrentBazaCwiczen,
  },
  {
    path: '/nowy-trening/dodaj-cwiczenie/:name',
    name: 'nowy-trening',
    component: CurrentBZlistaCw,
  },
  {
    path: '/:name',
    name: 'baza-cwiczen',
    component: BZlistaCw,
  },
  {
    path: '/plany-treningowe/:id',
    name: 'plany-treningowe',
    component: PTplan,
    children: [
      {
        path: 'wybor-cwiczen',
        component: WyborCwiczen,
        children: [
          {
            path: '/:name',
            name: 'wybor-cwiczen',
            component: WyborCwiczenListaCw,
          },
        ],
      },
    ],
  },
  {
    path: '/historia/:id',
    name: 'historia',
    component: HistoriaTrening,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
