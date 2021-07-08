<template>
  <div title="Cursor Coordinates" class="w3-border w3-round w3-card-2 w3-white w3-panel w3-small">
      Lat: {{ pointerY }}, Long: {{ pointerX }}
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  // Using a utility function to make states available in this view.
  computed: mapState(["pointerX", "pointerY"]),
});
</script>

<style scoped>
.coord {
  background-color: white;
}
</style>
