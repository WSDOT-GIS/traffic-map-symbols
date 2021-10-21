<template>
  <div @click.prevent="toggle">
    <slot>
      <button type="button" class="burger-button" title="Menu">
        <span class="burger-bar"></span>
      </button>
    </slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  setup() {
    const store = useStore();
    const isActive = computed(() => {
      return store.state.isMobileMenuOpen;
    });
    const toggle = () => {
      store.commit("toggleIsMobileMenuOpen");
    };
    return { isActive, toggle };
  },
});
</script>

<style scoped>
@font-face {
    font-family: "Font Awesome 5 Pro";
    font-style: normal;
    font-weight: 900;
    font-display: block;
    src: url(https://live-wsdot-wsdot.pantheonsite.io/libraries/fontawesome/webfonts/fa-solid-900.eot);
    src: url(https://live-wsdot-wsdot.pantheonsite.io/libraries/fontawesome/webfonts/fa-solid-900.eot#iefix) format("embedded-opentype"), url(https://live-wsdot-wsdot.pantheonsite.io/libraries/fontawesome/webfonts/fa-solid-900.woff2) format("woff2"), url(https://live-wsdot-wsdot.pantheonsite.io/libraries/fontawesome/webfonts/fa-solid-900.woff) format("woff"), url(https://live-wsdot-wsdot.pantheonsite.io/libraries/fontawesome/webfonts/fa-solid-900.ttf) format("truetype"), url(https://live-wsdot-wsdot.pantheonsite.io/libraries/fontawesome/webfonts/fa-solid-900.svg#fontawesome) format("svg");
}

.hidden {
  visibility: hidden;
}

button {
  cursor: pointer;
}

/* remove blue outline */
button:focus {
  outline: 0;
}

.burger-button {
  position: relative;
  height: 34px;
  width: 33px;
  display: block;
  z-index: 999;
  border: 0;
  border-radius: 4px;
  text-align: center;
  background-color: var(--color-secondaryBrandLight);
  pointer-events: all;
}

.burger-bar {
  color: #000;
  font-family: "Font Awesome 5 Pro";
  font-weight: 900;
  font-size: 2rem;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
  text-align: center;
}

.burger-bar::before {
  content: "\f0c9";
}
</style>
