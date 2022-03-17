<template>
  <div v-if="!isHidden" v-on:click="isHidden = !isHidden" id="warningBannerDiv">
    <div id="warningBannerSymbol">
      <button id="closeWarningBannerButton">
        !
      </button>
    </div>
    <div id="warningBannerErrorLabel">
      {{`Failed to load layers: ${serviceAlerts}`}}
    </div>
    
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onUpdated, PropType, ref, watch } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  setup() {
    const store = useStore()
    const isHidden = ref<boolean>(false)
    const serviceAlerts = computed(()=>store.state.serviceAlerts.join(", "))
    return { serviceAlerts, isHidden };
  },
  watch: { 
    serviceAlerts() {
        this.isHidden = false
    }
  }
});
</script>
<style scoped>
#warningBannerDiv{
    background-color: #FFFAEC;
    border: 1pt solid ;
    position: absolute;
    text-align: left;
    vertical-align: middle;
  
    top: 0;
    height:35px;
    left:300px;
    width:calc(100% - 300px);
    /* overflow-y: auto; */
    border: 1px solid #FFC107;
    z-index: 10;
}
#closeWarningBannerButton{
  position: absolute;
  top: 6px;
  background-color: #FFC107;
  border: none;
  color: white;
  font-size: var(--type-scale-base2);
  font-weight: var(--font-weight-normal);
  line-height: var(--type-scale-base2);
  text-align: center;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  left: 3px;
  position: absolute;
}
#warningBannerErrorLabel{
  top: 4px;right: 0px;bottom: 0px;left: 30px;
  position: absolute;
  vertical-align: middle;
}
</style>