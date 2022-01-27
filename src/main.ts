import { createApp } from 'vue'
import router from './router';
import App from './App.vue'
import VueClickAway from "vue3-click-away";
import {ApplicationInsights}from '@microsoft/applicationinsights-web'
import "./assets/global.css"
import "./assets/w3.css"
import "./assets/main.css" // WATECH CSS
// import "./assets/sidr.css" // WATECH CSS
import { store, key } from "./store";
import { loadConfig } from "./utils/appConfigUtil";
import Toast, { PluginOptions } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
// Load config before app starts...
loadConfig().then(() => {
    const appInsights = new ApplicationInsights(
    {
        config:{
            instrumentationKey: '3f639dd2-45dd-4de8-afc2-3e6bc599e381',
            enableAutoRouteTracking: true,
            enableUnhandledPromiseRejectionTracking: true,
            autoTrackPageVisitTime: true,
            excludeRequestFromAutoTrackingPatterns: ['googlesyndication','doubleclick','google-analytics']
        }
    })
    appInsights.loadAppInsights()
    appInsights.trackPageView()
    // adding store as a plugin while creating an app...
    const app = createApp(App)
    const options: PluginOptions = {
        // You can set your default options here
    };
    app.use(Toast, options);
    app.use(store, key).use(router).use(VueClickAway).mount('#app');
    app.provide('$appInsights', appInsights)
});
