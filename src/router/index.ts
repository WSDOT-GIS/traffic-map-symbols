import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import EsriMapView from '../components/EsriMapView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: EsriMapView
  },
  {
    path: '/layers/:layernames+',
    name: 'Layers',
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
