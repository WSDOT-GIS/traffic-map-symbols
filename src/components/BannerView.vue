<template>
  <transition name="fade">
    <div v-if="!isHidden" id="warningBannerDiv">
      <div id="warningBannerErrorLabel">
        {{`Failed to load layers: ${serviceAlerts}`}}
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
</style>