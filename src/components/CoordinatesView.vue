<template>
  <div v-if="fullScreen==true" title="Cursor Coordinates" class="w3-border w3-round w3-card-2 w3-white w3-container w3-small">
      Lat: {{ pointerY }}, Long: {{ pointerX }}
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  computed: mapState(["pointerX", "pointerY"]),
  setup(){
    const fullScreen = ref<boolean>(true)
    return{
      fullScreen
    }
  },
  mounted() {
    if(window.innerWidth <=500){
        this.fullScreen=false
      }
      if(window.innerWidth >=500){
        this.fullScreen=true
      }
    window.addEventListener("resize",() => {
      if(window.innerWidth <=500){
        this.fullScreen=false
      }
      if(window.innerWidth >=500){
        this.fullScreen=true
      }
    })
  },
  // Using a utility function to make states available in this view.
  
});
</script>

<style scoped>
.coord {
  background-color: white;
}
</style>
