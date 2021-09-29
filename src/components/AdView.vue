<template>
  <div id="div-gpt-ad-1632317155034-0" class="w3-content ad-container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  props: {
    text: {
      require: true,
      type: String,
    },
  },
  setup() {
    onMounted(() => {
      // Import JS...
      const script1 = document.createElement("script");
      script1.setAttribute(
        "src",
        "https://securepubads.g.doubleclick.net/tag/js/gpt.js"
      );
      document.head.appendChild(script1);
      // Add script supplied by the communication team...
      const script2 = document.createElement("script");
      script2.innerHTML = `
      window.googletag = window.googletag || {cmd: []};
      // GPT slots
      var gptAdSlots = [];
      googletag.cmd.push(function() {
        // Define a size mapping object. The first parameter to addSize is
        // a viewport size, while the second is a list of allowed ad sizes.
        var mapping = googletag.sizeMapping().
          addSize([100, 100], [88, 31]).
          addSize([320, 200], [[320, 50], [300, 50], [320, 100], [300,75]]).
          addSize([730, 200], [728, 90]).
          addSize([1000, 200], [[970, 90], [728, 90]]).
          build();

        // Define the GPT slot
        gptAdSlots[0] = googletag.defineSlot('/22447621233/WSDOT:driving-map:responsive', [320, 50], 'div-gpt-ad-1632317155034-0').
            defineSizeMapping(mapping).
            addService(googletag.pubads());
        googletag.pubads().enableSingleRequest();

        // Start ad fetching
        googletag.enableServices();
      });`;
      document.head.appendChild(script2);
      // Add script inside the div...
      const script3 = document.createElement("script");
      script3.innerHTML = `googletag.cmd.push(function() { googletag.display('div-gpt-ad-1632317155034-0'); });`;
      document
        .getElementById("div-gpt-ad-1632317155034-0")
        ?.appendChild(script3);
    });
    return {};
  },
});
</script>

<style scoped>
.ad_container {
  color: var(--color-gray100);
  background-color: var(--color-gray40);
  height: 90px;
  width: 728px;
}
@media screen and (max-width: 727px) {
  #ad_container {
    min-height: 50px;
    min-width: 320px;
  }
}
p {
  margin: 0;
  padding: 5px;
}
</style>
