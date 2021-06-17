define(["require", "exports", "tslib", "vue", "./App.vue", "./store", "./assets/popups.css", "./assets/global.css", "./assets/basemapWidget.css", "./assets/toggleSlider.css"], function (require, exports, tslib_1, vue_1, App_vue_1, store_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    App_vue_1 = tslib_1.__importDefault(App_vue_1);
    // const router = createRouter({
    //     history: createWebHashHistory(),
    //     routes: []
    // })
    // adding store as a plugin while creating an app...
    vue_1.createApp(App_vue_1.default).use(store_1.store, store_1.key).mount('#app');
});
//# sourceMappingURL=main.js.map