import { createApp } from 'vue'
//import { createWebHashHistory, createRouter } from 'vue-router'
import App from './App.vue'
import "./assets/popups.css"
import "./assets/global.css"
import "./assets/basemapWidget.css"
import { store, key } from "./store";

// const router = createRouter({
//     history: createWebHashHistory(),
//     routes: []
// })

// adding store as a plugin while creating an app...
createApp(App).use(store, key).mount('#app')
