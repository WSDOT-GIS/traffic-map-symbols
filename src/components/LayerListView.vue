<template>
  <div class="top left ontop">
    {{JSON.stringify(layerList)}}
  </div>
</template>
<script lang="ts">
import { useStore } from "@/store";
import { defineComponent, onMounted, ref} from "vue";
import { mapState } from "vuex";

export default defineComponent({
  computed: mapState(["layerList"]),
  /*setup(){
    const store = useStore();
    console.log(store.state.layerList)
  },
  mounted(){
    const store = useStore();
    console.log(store.state.layerList)
  },
  updated(){
    const store = useStore();
    console.log(store.state.layerList)
  }*/
});
</script>
<style scoped>

</style>
