import { createApp } from 'vue'
import App from './App.vue'
import "./assets/popups.css"
import "./assets/global.css"
import "./assets/basemapWidget.css"
import { store, key } from "./store";

createApp(App).use(store, key).mount('#app')
