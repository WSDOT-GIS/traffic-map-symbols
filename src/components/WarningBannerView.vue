<template>
  <div id="warningBannerDiv">
      Warning Message
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onUpdated, PropType, ref, watch } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  setup(props) {
    const store = useStore()
    const messageRef = ref<string>("")
    const displayWarningBanner = ref<boolean>(false)
    return { messageRef };
  },
});
</script>

<style scoped>
#warningBannerDiv{
    background-color: yellow;
    position: absolute;
    top: 0;
    height:350px;
    left:300px;
    width:calc(100% - 300px);
    /* overflow-y: auto; */
    border: 1px solid var(--color-gray20);
    z-index: 10;
}
</style>