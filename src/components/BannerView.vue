<template>
  <transition name="fade">
    <div v-if="bannerVisible" id="warningBannerDiv">
      <div id="warningBannerErrorLabel">
        {{`The following layers are unavailable: ${serviceAlerts}`}}
      </div>
      <div
      title="Close error banner"
      aria-label="Close error banner"
      id="error-banner-close-btn"
      class="w3-button"
      @click="removeServiceAlertBanner"
      >
      X
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { computed, defineComponent, onUpdated, PropType, ref, watch } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  setup() {
    const store = useStore()
    const isHidden = ref<boolean>(false)
    const serviceAlerts = computed(()=>store.state.serviceAlerts.join(", "))
    watch(serviceAlerts,(alerts)=>{
      if(alerts.length>0){
        store.dispatch('setServiceAlertBannerVisibility',true)
      }
    })
    const bannerVisible = computed(()=>store.state.serviceAlertsBannerVisible)
    const removeServiceAlertBanner =()=> store.dispatch('setServiceAlertBannerVisibility',false)
    return { serviceAlerts, isHidden, removeServiceAlertBanner, bannerVisible, store};
  }
  
});
</script>
<style scoped>
.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
  transition: all .3s 
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
#warningBannerDiv{
    background-color: #FFFAEC;
    border: 1pt solid ;
    position: absolute;
    text-align: left;
    vertical-align: middle;
    top: 0;
    height:35px;
    width:100%;
    /* overflow-y: auto; */
    border: 1px solid #FFC107;
    z-index: 10;
}

#warningBannerErrorLabel{
  top: 4px;right: 0px;bottom: 0px;left: 30px;
  position: absolute;
  vertical-align: middle;
  text-align: center;
}

#error-banner-close-btn {
  position: absolute;
  background-color: #FFFAEC ;
  border: 1pt solid #FFC107;
  color: black;
  font-size: var(--type-scale-base1);
  font-weight: var(--font-weight-normal);
  line-height: var(--type-scale-base2);
  text-align: center;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  right: 5px
}
</style>