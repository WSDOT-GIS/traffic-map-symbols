import { createApp } from 'vue'
import router from './router';
import App from './App.vue'
import VueClickAway from "vue3-click-away";
import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import "./assets/global.css"
import "./assets/w3.css"
import "./assets/main.css" // WATECH CSS
// import "./assets/sidr.css" // WATECH CSS
import { store, key } from "./store";
import { loadConfig } from "./utils/appConfigUtil";
import Toast, { POSITION } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import { createLayerGroupInfos } from "./utils/layerUtil";

// Load config before app starts...
loadConfig().then((appConfig) => {
    const appInsights = new ApplicationInsights(
        {
            config: {
                instrumentationKey: '3f639dd2-45dd-4de8-afc2-3e6bc599e381',
                enableAutoRouteTracking: true,
                enableUnhandledPromiseRejectionTracking: true,
                autoTrackPageVisitTime: true,
                excludeRequestFromAutoTrackingPatterns: ['googlesyndication', 'doubleclick', 'google-analytics']
            }
        })
    appInsights.loadAppInsights()
    appInsights.trackPageView()
    //
    createLayerGroupInfos(appConfig);
    // adding store as a plugin while creating an app...
    const app = createApp(App)
    app.use(store, key);
    app.use(router);
    app.use(VueClickAway);
    app.use(Toast, {
        // You can set your default options here
        position: POSITION.BOTTOM_CENTER,
        timeout: 10000,
        maxToasts: 5,
        draggable: false,
        hideProgressBar: true
    });
    app.mount('#app');
    app.provide('$appInsights', appInsights)
});
