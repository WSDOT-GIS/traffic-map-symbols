import { createApp } from 'vue'
import App from './App.vue'
import "./assets/popups.css"
import "./assets/global.css"
import "./assets/main.css"
import "./assets/basemapWidget.css"
import "./assets/toggleSlider.css"
import { store, key } from "./store";

// adding store as a plugin while creating an app...
createApp(App).use(store, key).mount('#app')
