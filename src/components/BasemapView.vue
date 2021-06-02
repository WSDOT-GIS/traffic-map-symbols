<template>
  <div class="bottom right ontop">
    <button @click="toggleBasemap">
      {{ store.state.basemap }}
    </button>
  </div>
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
    // Using a utility function to get a mutation and make it available in the view.
    ...mapMutations(["toggleBasemap"]),
  },
});
</script>

