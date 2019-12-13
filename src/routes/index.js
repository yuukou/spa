import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../pages/About'
import Index from '../pages/Index'
import Detail from '../pages/Detail'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Index },
    { path: '/about', component: About },
    { path: '/detail/:id', component: Detail, name: 'Detail' },
  ],
})
