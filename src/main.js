import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Router from 'vue-router'
import Lr1 from '@/components/Lr1'
import Lr2 from '@/components/Lr2'
import Lr3 from '@/components/Lr3'
import Lr4 from '@/components/Lr4'

Vue.use(BootstrapVue)
Vue.use(Router)

Vue.config.productionTip = false
const routes = [
  { path: '/lr1', component: Lr1 },
  { path: '/lr2', component: Lr2 },
  { path: '/lr3', component: Lr3 },
  { path: '/lr4', component: Lr4 },
  { path: '/', component: Lr4 }
]

const router = new Router({
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
