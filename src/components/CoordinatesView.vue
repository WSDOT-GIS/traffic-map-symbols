<template>
  <p class="bottom left ontop coord">X: {{ pointerX }}, Y: {{ pointerY }}</p>
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
