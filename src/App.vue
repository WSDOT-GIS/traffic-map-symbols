<script lang="ts">
import { defineComponent, onBeforeUnmount, ref } from "vue";
// import EsriMapView from "./components/EsriMapView.vue";
import HeaderView from "./components/HeaderView.vue";
import FooterView from "./components/FooterView.vue";
import { useStore } from "@/store";
import { mapState } from "vuex";
import SetupModal from "@/components/SetupModal.vue";
import { getConfig } from "@/utils/appConfigUtil";
export default defineComponent({
  name: "App",
  components: {
    // EsriMapView,
    HeaderView,
    SetupModal,
    FooterView,
  },
  setup() {
    
    
    const mapHeight = ref("500px");
    const store = useStore();
    const config = getConfig();
    const activeClass = "active";
    const disabledClass = "disabled";
    store.commit("setInitializing", {
      isInitializing: true,
      isLoading: true,
      initializingMessage: "Map is loading...",
    });
    // Make map fill the screen between the header and footer...
    const resizeMapContainer = () => {
      const headDiv = document.querySelector("#header") as HTMLElement;
      const footDiv = document.querySelector("footer") as HTMLElement;
      // The menu button has some extra height that is not reflected in the container height, so measure the menu button's height.
      const navDiv = document.querySelector(".nav-outer-wrapper") as HTMLElement;
      let navH = 0;
      if (navDiv && navDiv.offsetHeight) {
        navH = navDiv.offsetHeight;
      }
      const h = window.innerHeight - headDiv.offsetHeight - navH - footDiv.offsetHeight;
      mapHeight.value = h + "px";
    };
    window.addEventListener("resize", resizeMapContainer);
    // Prevent memory leak...https://nolanlawson.com/2020/02/19/fixing-memory-leaks-in-web-applications/
    onBeforeUnmount(() => {
      window.removeEventListener("resize", resizeMapContainer);
    });

    return {
      config,
      mapHeight,
      store,
      resizeMapContainer,
      activeClass,
      disabledClass,
       
    };
  },
  computed: mapState(["isInitializing"]),
});
</script>

<template>
  <HeaderView @onLoadComplete="resizeMapContainer()" :WsdotRootUrl="config.wsdotRoot" />
  <main>
    <div
      id="map-container"
      class="w3-display-container"
      :class="[isInitializing ? disabledClass : activeClass]"
      :style="{ height: mapHeight, opacity: isInitializing ? 0.5 : 1 }"
    >
      <router-view />
      <!-- <EsriMapView /> -->
    </div>
    <SetupModal v-if="isInitializing" />
  </main>
  <FooterView :WsdotRootUrl="config.wsdotRoot" />
</template>

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
  overflow: hidden;
  /** Got these from internal website */
  font-family: "Lato", sans-serif;
}
hr.horizontal-divider {
  border-top: 1px solid #bbb;
  margin: 1vh 1vw;
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
  /* overflow: hidden; */
}

#map-container > * {
  position: absolute;
}

</style>
