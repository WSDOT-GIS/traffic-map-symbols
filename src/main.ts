import { createApp } from 'vue'
import App from './App.vue'
import "./assets/global.css"
import "./assets/w3.css"
import "./assets/main.css" // WATECH CSS
// import "./assets/sidr.css" // WATECH CSS
import { store, key } from "./store";
import { getConfig } from "./utils/appConfigUtil";

// Load config before app starts...
getConfig().then(() => {
    // adding store as a plugin while creating an app...
    createApp(App).use(store, key).mount('#app');
});
