import { createApp } from 'vue'
import App from './App.vue'
import VueClickAway from "vue3-click-away";
import "./assets/global.css"
import "./assets/w3.css"
import "./assets/main.css" // WATECH CSS
// import "./assets/sidr.css" // WATECH CSS
import { store, key } from "./store";
import { loadConfig } from "./utils/appConfigUtil";

// Load config before app starts...
loadConfig().then(() => {
    // adding store as a plugin while creating an app...
    createApp(App).use(store, key).use(VueClickAway).mount('#app');

});
