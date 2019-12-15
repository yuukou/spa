import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../pages/Index'
import Detail from '../pages/Detail'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Index },
    { path: '/detail/:id', component: Detail, name: 'Detail' },
  ],
})
