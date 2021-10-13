<template>
  <HeaderView @onLoadComplete="resizeMapContainer()" />
  <main>
    <div id="map-container" :style="{ height: mapHeight }" class="w3-display-container">
      <EsriMapView />
    </div>
  </main>
  <FooterView />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import EsriMapView from "./components/EsriMapView.vue";
import HeaderView from "./components/HeaderView.vue";
import FooterView from "./components/FooterView.vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "App",
  components: {
    EsriMapView,
    HeaderView,
    FooterView,
  },
  setup() {
    const mapHeight = ref("500px");
    const store = useStore();
    onMounted(() => {
      //resizeMapContainer();
    });
    // Make map fill the screen below the header...
    const resizeMapContainer = () => {
      const headDiv = document.querySelector("#header") as HTMLElement;
      // The menu button has some extra height that is not reflected in the container height, so measure the menu button's height.
      //const menuDiv = document.querySelector(".we-mega-menu-li") as HTMLElement;
      const navDiv = document.querySelector(".nav-outer-wrapper") as HTMLElement;
      //console.log("*** resizeMapContainer() headDiv: " + headDiv.offsetHeight + ", menu: " + menuDiv.offsetHeight);
      let navH = 0;
      if (navDiv && navDiv.offsetHeight) {
        navH = navDiv.offsetHeight;
      }
      const h = window.innerHeight - headDiv.offsetHeight - navH;
      mapHeight.value = h + "px";
      //console.log("*** resizeMapContainer() " + mapHeight.value + " navH:" + navH + " head:" + headDiv.offsetHeight);
    };
    window.addEventListener("resize", resizeMapContainer);

    return {
      mapHeight,
      store,
      resizeMapContainer,
    };
  },
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
  font-size: var(--type-scale-base2);
  font-weight: var(--font-weight-normal);
  line-height: var(--type-scale-base4);
}
hr.horizontal-divider {
  border-top: 1px solid #bbb;
  margin: 1vh 1vw;
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
