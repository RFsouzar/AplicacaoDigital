import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import 'bootstrap/dist/css/bootstrap.css';




import VueRouter from 'vue-router';
import vueResource from 'vue-Resource';
import {routes} from './routes';
import VueTheMask from 'vue-the-mask';
import VModal from 'vue-js-modal'


import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(vueResource);
Vue.use(BootstrapVue);
Vue.use(VueMaterial);
Vue.use(VueRouter);
Vue.use(VueTheMask);
Vue.use(VModal)

const router = new VueRouter({
  routes,
  mode:'history'
});

Vue.config.productionTip = false
Vue.http.options.root = 'http://tbnd29543:8080';


new Vue({
  el: '#app',
  router,
  render: h => h(App),
  
})
