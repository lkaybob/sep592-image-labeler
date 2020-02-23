import Vue from 'vue'
import App from './App.vue'
import {library, dom} from '@fortawesome/fontawesome-svg-core';
import {fas} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import * as firebase from "firebase/app";
import "firebase/firestore";

library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);
dom.watch();

let app = firebase.initializeApp({
  // CONFIDENTIAL
});

Vue.prototype.$firebase = app;
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
