import { createApp } from 'vue'
import App from './App.vue'
import "./assets/global.css"
import "./assets/w3.css"
import "./assets/main.css"
import "./assets/toggleSlider.css"
import "./assets/flexGridView.css"
import { store, key } from "./store";
import { getConfig } from "./utils/appConfigUtil";

// Load config before app starts...
getConfig().then(() => {
    // adding store as a plugin while creating an app...
    createApp(App).use(store, key).mount('#app');
});
