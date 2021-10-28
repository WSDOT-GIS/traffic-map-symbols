<template>
  <HeaderView @onLoadComplete="resizeMapContainer()" :WsdotRootUrl="config.wsdotRoot" />
  <main>
    <div
      id="map-container"
      class="w3-display-container"
      :class="[isLoading ? disabledClass : activeClass]"
      :style="{ height: mapHeight, opacity: isLoading ? 0.5 : 1 }"
    >
      <EsriMapView />
    </div>
    <LoadingSpinnerModal v-if="isLoading" />
  </main>
  <FooterView :WsdotRootUrl="config.wsdotRoot" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import EsriMapView from "./components/EsriMapView.vue";
import HeaderView from "./components/HeaderView.vue";
import FooterView from "./components/FooterView.vue";
import { useStore } from "@/store";
import { mapState } from "vuex";
import LoadingSpinnerModal from "@/components/LoadingSpinnerModal.vue";
import { getConfig } from "@/utils/appConfigUtil";

export default defineComponent({
  name: "App",
  components: {
    EsriMapView,
    HeaderView,
    LoadingSpinnerModal,
    FooterView,
  },
  setup() {
    const mapHeight = ref("500px");
    const store = useStore();
    const config = getConfig();
    const activeClass = "active";
    const disabledClass = "disabled";
    store.commit("setIsLoading", { loading: true, message: "Map is loading..." });
    // Make map fill the screen below the header...
    const resizeMapContainer = () => {
      const headDiv = document.querySelector("#header") as HTMLElement;
      const footDiv = document.querySelector("footer") as HTMLElement;
      // The menu button has some extra height that is not reflected in the container height, so measure the menu button's height.
      //const menuDiv = document.querySelector(".we-mega-menu-li") as HTMLElement;
      const navDiv = document.querySelector(".nav-outer-wrapper") as HTMLElement;
      let navH = 0;
      if (navDiv && navDiv.offsetHeight) {
        navH = navDiv.offsetHeight;
      }
      const h = window.innerHeight - headDiv.offsetHeight - navH - footDiv.offsetHeight;
      mapHeight.value = h + "px";
    };
    window.addEventListener("resize", resizeMapContainer);

    return {
      config,
      mapHeight,
      store,
      resizeMapContainer,
      activeClass,
      disabledClass,
    };
  },

  computed: mapState(["isLoading"]),
});
</script>

<style>
html,
body,
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  /** Got these from internal website */
  font-family: "Lato", sans-serif;
}
hr.horizontal-divider {
  border-top: 1px solid #bbb;
  margin: 1vh 1vw;
}
.loadingSpinnerBackground {
  background-color: red;
}
.disabled {
  pointer-events: none;
}
#app {
  position: absolute;
  z-index: 0;
}
#map-container {
  padding: 0;
  margin: 0;
  position: relative;
  width: 100%;
  height: 80%;
  overflow: hidden;
}

#map-container > * {
  position: absolute;
}
</style>
