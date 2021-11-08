<template>
  <div
    v-if="!smallMedia"
    title="Cursor Coordinates"
    class="w3-border w3-round w3-card-2 w3-white w3-container w3-small"
  >
    Lat: {{ pointerY }}, Long: {{ pointerX }}
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { mapState } from "vuex";
import { useStore } from "@/store";
import { isSmallMedia } from "@/utils/mediaUtil";

export default defineComponent({
  computed: mapState(["pointerX", "pointerY"]),
  setup() {
    const store = useStore();
    const smallMedia = ref(isSmallMedia());
    const mapSize = computed(() => store.state.mapSize);
    watch(mapSize, () => {
      smallMedia.value = isSmallMedia();
    });
    return {
      smallMedia,
    };
  },
});
</script>

<style scoped>
.coord {
  background-color: white;
}
</style>
