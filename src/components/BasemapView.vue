<template>
  <button @click="toggleBasemap">{{ store.state.basemap }}</button>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent } from "vue";
import { mapMutations } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
  methods: {
    ...mapMutations(["toggleBasemap"]),
  },
});
</script>

<style scoped>
</style>
