<template>
  <div id="div-gpt-ad-1632317155034-0" class="w3-content ad-container" ref="containerDiv">
    <button
      title="Close advertisement"
      aria-label="Close advertisement"
      class="ad-close-btn w3-button"
      @click="close"
    >
      &times;
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import {} from "doubleclick-gpt";

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
    // GPT slots
    const gptAdSlots: Slot[] = [];
    //
    window.googletag = window.googletag || { cmd: [] };
    const googletag = window.googletag;
    
    onMounted(() => {
      // To make this code working, make sure to setup the followings...
      //  1. Import the gpt.js in the index.html
      //   script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
      //  2. Install doubleclick-gpt NPM package for type definitions.
      //  3. Declare the window extension in the globals.d.ts
      //window.googletag = window.googletag || { cmd: [] };
      // GPT slots
      //const gptAdSlots = [];
      // const googletag = window.googletag;
      /* Use googletag.cmd to queue callbacks for when GPT is ready. 
        These callbacks do not have to check googletag.apiReady as they are guaranteed to execute once the API is set up.*/
      googletag.cmd.push(() => {
        // Define a size mapping object. The first parameter to addSize is
        // a viewport size, while the second is a list of allowed ad sizes.
        var mapping = googletag
          .sizeMapping()
          .addSize([0, 0], [])
          .addSize([320, 200], [320, 50])
          .addSize([730, 200], [728, 90])
          .addSize([1000, 200], [728, 90])
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
        // Debug - The event properties should be populated, otherwise the ad did not return probably.
        // googletag.pubads().addEventListener("slotRenderEnded", function (event) {
        //   var slot = event.slot;
        //   console.group("Slot", slot.getSlotElementId(), "finished rendering.");
        //   // Log details of the rendered ad.
        //   console.log("Advertiser ID:", event.advertiserId);
        //   console.log("Campaign ID: ", event.campaignId);
        //   console.log("Creative ID: ", event.creativeId);
        //   console.log("Is empty?:", event.isEmpty);
        //   console.log("Line Item ID:", event.lineItemId);
        //   console.log("Size:", event.size);
        //   console.log("Source Agnostic Creative ID:", event.sourceAgnosticCreativeId);
        //   console.log("Source Agnostic Line Item ID:", event.sourceAgnosticLineItemId);
        //   console.groupEnd();
        // });
        // This should get triggered after the ad was rendered.
        // googletag.pubads().addEventListener("slotOnload", function (event) {
        //   var slot = event.slot;
        //   console.log("Creative iframe for slot", slot.getSlotElementId(), "has loaded.");
        // });
        // Start ad fetching
        googletag.enableServices();
        //
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
        if (newSize.width !== prevSize.width || newSize.height !== prevSize.height) {
          context.emit("onResize", newSize);
          prevSize.width = newSize.width;
          prevSize.height = newSize.height;
        }
      }
    };
    const close = () => {
      window.googletag.destroySlots(gptAdSlots);
    };
    return { containerDiv, onResize, close };
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
#ad-close-btn {
  background-color: #000;
  border: none;
  color: #fff;
  font-size: var(--type-scale-base2);
  font-weight: var(--font-weight-normal);
  line-height: var(--type-scale-base-2);
  text-align: center;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  padding: 0.1rem;
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
