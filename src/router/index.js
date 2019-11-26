import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'

Vue.use(Router)
const router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    from.name ? next({ name: from.name }) : next('/')
  } else if (to.path === '/' || to.path === '/find-music') {
    next('/find-music/recommend')
  } else {
    next()
  }
})
export default router