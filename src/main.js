"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const vue_1 = require("vue");
const App_vue_1 = tslib_1.__importDefault(require("./App.vue"));
require("./assets/popups.css");
require("./assets/global.css");
require("./assets/w3.css");
require("./assets/main.css");
require("./assets/toggleSlider.css");
require("./assets/flexGridView.css");
const store_1 = require("./store");
// adding store as a plugin while creating an app...
vue_1.createApp(App_vue_1.default).use(store_1.store, store_1.key).mount('#app');
//# sourceMappingURL=main.js.map