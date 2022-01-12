import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import EsriMapView from '../components/EsriMapView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: EsriMapView
  },
  {
    path: '/layer/:layernames+',
    name: 'Layer',
    component: EsriMapView
  },
  {
    path: '/feature/:featuretype/:featureid',
    name: 'Feature',
    component: EsriMapView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
