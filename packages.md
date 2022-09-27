# NPM Packages

These are packages used by this project.

## Dependencies

These packages are used directly by the application itself.

- [Analytics](https://www.npmjs.com/package/Analytics)
  - [analytics](https://getanalytics.io/)
    - Analytics is a lightweight abstraction library for tracking page views, custom events, & identify visitors. It is pluggable & designed to work with any [third-party analytics tool](https://getanalytics.io/plugins/) or your own backend.
  - [@analytics/google-analytics](https://getanalytics.io/plugins/google-analytics/)
  - [@microsoft/applicationinsights-web](https://docs.microsoft.com/en-us/azure/azure-monitor/app/javascript)
- [@arcgis/core](https://developers.arcgis.com/javascript/latest/es-modules/)
- [@splidejs/vue-splide](https://splidejs.com/integration/vue-splide/)
  - This is used to provide the photo carousel.
- [core-js](https://github.com/zloirock/core-js)
- [polygon-clipping](https://github.com/mfogel/polygon-clipping)
- [vue](https://v3.vuejs.org/)
  - [vue-responsive-components](https://github.com/kelin2025/vue-responsive-components)
  - [vue-router](https://router.vuejs.org/)
  - [vue-toastification](https://vue-toastification.maronato.dev/)
    - :warning: As of the time of writing this document, this project is currently using a release candidate version for compatibility with Vue 3.
  - [vue3-click-away](https://github.com/VinceG/vue-click-away)
    - *Detect if a click event happened outside of an element.*
  - [vuex](https://vuex.vuejs.org/)
    - *Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion.*

## Dev Dependencies

These packages are not directly used by the application. They are tools used by developers.

- [@arcgis/webpack-plugin](https://www.npmjs.com/package/@arcgis/webpack-plugin)
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser)
- [eslint](https://www.npmjs.com/package/eslint)
- [eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue)
- [source-map](https://www.npmjs.com/package/source-map)

### Vue

- [@vue/cli-service](https://cli.vuejs.org/)
  - [@vue/cli-plugin-babel](https://www.npmjs.com/package/@vue/cli-plugin-babel)
  - [@vue/cli-plugin-eslint](https://cli.vuejs.org/core-plugins/eslint.html#vue-cli-plugin-eslint)
  - [@vue/cli-plugin-typescript](https://www.npmjs.com/package/@vue/cli-plugin-typescript)
- [@vue/eslint-config-typescript](https://www.npmjs.com/package/@vue/eslint-config-typescript)
- [vue-cli-plugin-compression](https://www.npmjs.com/package/vue-cli-plugin-compression)
- [vue-cli-plugin-webpack-bundle-analyzer](https://www.npmjs.com/package/vue-cli-plugin-webpack-bundle-analyzer)

### TypeScript

- [typescript](https://www.npmjs.com/package/typescript)
- [@types/arcgis-js-api](https://www.npmjs.com/package/@types/arcgis-js-api)
- [@types/doubleclick-gpt](https://www.npmjs.com/package/@types/doubleclick-gpt)
  - [Google Publisher Tag](https://developers.google.com/publisher-tag/reference) type definitions
- [@types/webpack-env](https://www.npmjs.com/package/@types/webpack-env)
