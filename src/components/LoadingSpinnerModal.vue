<template>
  <div class ='w3-display-middle modalContainer'>
    <div class="w3-padding w3-display-middle modalBackground">
    </div>
    <div class="w3-padding w3-display-middle loadingModal">
      <table>
        <tr>
          <td><img class="loadingSpinner" src="@/assets/loadingSpinner.gif"></td>
        </tr>
        <tr>
          <td><label class="loadingLabel">Map Loading...</label></td>
        </tr>
      </table>
    </div> 
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onUpdated, ref, watch } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  props: {
    MapHeight: {
      required: true,
      type: String,
    },
  },
  setup() {
    const store = useStore();
    const containerRef = ref<HTMLDivElement>();
    const mapSize = computed(() => store.state.mapSize);
    const isOpen = ref(true);
    const displayStyle = ref("none");
    const height = ref("auto");
    onUpdated(() => {
      resizeContainer();
    });

    watch(mapSize, () => {
      resizeContainer();
    });
    const resizeContainer = () => {
      if (!containerRef.value) {
        return;
      }
      const top = containerRef.value.offsetTop;
      const h = mapSize.value.height - top * 2;
      height.value = h + "px";
    };
    return {
      containerRef,
      height,
      isOpen,
      displayStyle,
    };
  },
});
</script>

<style scoped>
.loadingModal{
    background-color: white;
}
.loadingSpinner{
  width: 50px;height:50px;
}
.loadingLabel{
  text-align: center;
}
.modalContainer {
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  z-index: 999;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}
.modalBackground{
  background-color: rgba(0, 0, 0, 0.767)
}
</style>