<template>
  <HeaderView @onLoadComplete="resizeMapContainer()" />
  <main>
    <div
      id="map-container"
      :style="{ height: mapHeight }"
      class="w3-display-container"
    >
      <EsriMap />
    </div>
  </main>
  <FooterView />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import EsriMap from "./components/EsriMap.vue";
import HeaderView from "./components/HeaderView.vue";
// import AdView from "./components/AdView.vue";
import FooterView from "./components/FooterView.vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "App",
  components: {
    EsriMap,
    HeaderView,
    // AdView,
    FooterView,
  },
  setup() {
    const mapHeight = ref("500px");
    const store = useStore();
    onMounted(() => {
      resizeMapContainer();
    });
    // Make map fill the screen below the header...
    const resizeMapContainer = () => {
      // if (topRef.value && bottomRef.value) {
      //   const h =
      //   window.innerHeight -
      //   topRef.value.offsetHeight -
      //   bottomRef.value.offsetHeight;
      //   mapHeight.value = h + "px";
      // }
      const headDiv = document.querySelector("#header") as HTMLElement;
      // The menu button has some extra height that is not reflected in the container height, so measure the menu button's height.
      const menuDiv = document.querySelector(".we-mega-menu-li") as HTMLElement;
      let navH = 0;
      if (menuDiv && menuDiv.offsetHeight) {
        navH = menuDiv.offsetHeight;
      }
      const h = window.innerHeight - headDiv.offsetHeight - navH;
      mapHeight.value = h + "px";
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
  line-height: 1.6;
  font-family: "Lato", sans-serif;
  font-weight: 400;
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
