<template>
  <p>X: {{ pointerX }}, Y: {{ pointerY }}</p>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  computed: mapState(["pointerX", "pointerY"]),
});
</script>
