import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Paginate from 'vuejs-paginate';
import VueMeta from 'vue-meta'
import App from './App.vue';
import router from './router';
import store from './store';
import messagePlugin from './utils/message.plugin';
import titlePlugin from './utils/title.plugin';
import Loader from '@/components/app/Loader';
import 'materialize-css/dist/js/materialize.min.js';
import './registerServiceWorker';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import currencyFilter from './filters/currency.filter';
import dateFilter from './filters/date.filter';
import localizeFilter from './filters/localize.filter';
import tooltip from '@/directives/tooltip.directive';

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.use(titlePlugin);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);
Vue.directive('tooltip', tooltip)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: "AIzaSyAPamMQMF-0jh6V9bL5QxTQrXDophHCnog",
  authDomain: "crm-app-84c5b.firebaseapp.com",
  databaseURL: "https://crm-app-84c5b.firebaseio.com",
  projectId: "crm-app-84c5b",
  storageBucket: "crm-app-84c5b.appspot.com",
  messagingSenderId: "177089572572",
  appId: "1:177089572572:web:01af64ee6cb4af79c48e19"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});


