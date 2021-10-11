<template>
  <div
    id="div-gpt-ad-1632317155034-0"
    class="w3-content ad-container"
    ref="containerDiv"
  ></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  emits: ["onResize"],
  props: {
    text: {
      require: true,
      type: String,
    },
  },
  setup(props, context) {
    const containerDiv = ref<HTMLDivElement>();
    onMounted(() => {
      // To make this code working, make sure to setup the followings...
      //  1. Import the gpt.js in the index.html
      //   script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
      //  2. Install doubleclick-gpt NPM package for type definitions.
      //  3. Declare the window extension in the globals.d.ts
      window.googletag = window.googletag || { cmd: [] };
      // GPT slots
      const gptAdSlots = [];
      const googletag = window.googletag;
      googletag.cmd.push(() => {
        // Define a size mapping object. The first parameter to addSize is
        // a viewport size, while the second is a list of allowed ad sizes.
        var mapping = googletag
          .sizeMapping()
          .addSize([100, 100], [88, 31])
          .addSize(
            [320, 200],
            [
              [320, 50],
              [300, 50],
              [320, 100],
              [300, 75],
            ]
          )
          .addSize([730, 200], [728, 90])
          .addSize(
            [1000, 200],
            [
              [970, 90],
              [728, 90],
            ]
          )
          .build();
        // Define the GPT slot
        gptAdSlots[0] = googletag
          .defineSlot(
            "/22447621233/WSDOT:driving-map:responsive",
            [320, 50],
            "div-gpt-ad-1632317155034-0"
          )
          .defineSizeMapping(mapping)
          .addService(googletag.pubads());
        googletag.pubads().enableSingleRequest();
        // This event is fired whenever the on-screen percentage of an ad slot's area changes.
        // Catch this so the controls can reposition accordingly to avoid overlapping with the ad.
        googletag.pubads().addEventListener("slotVisibilityChanged", () => {
          onResize();
        });
        // Start ad fetching
        googletag.enableServices();
      });

      googletag.cmd.push(() => {
        googletag.display("div-gpt-ad-1632317155034-0");
      });
    });
    const prevSize = { width: 0, height: 0 };
    const onResize = () => {
      if (containerDiv.value) {
        const newSize = {
          width: containerDiv.value.offsetWidth,
          height: containerDiv.value.offsetHeight,
        };
        if (
          newSize.width !== prevSize.width ||
          newSize.height !== prevSize.height
        ) {
          context.emit("onResize", newSize);
          prevSize.width = newSize.width;
          prevSize.height = newSize.height;
        }
      }
    };
    return { containerDiv, onResize };
  },
});
</script>

<style scoped>
.ad_container {
  color: var(--color-gray100);
  background-color: var(--color-gray40);
  min-height: 50px;
  min-width: 300px;
}
@media screen and (min-width: 730px) {
  .ad_container {
    min-height: 90px;
    min-width: 728px;
  }
}
p {
  margin: 0;
  padding: 5px;
}
</style>
