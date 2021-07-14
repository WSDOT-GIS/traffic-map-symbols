<template>
  <ModalView OkCaption="Save Map" :Visible="visible">
    <template v-slot>
      <div>Test</div>
    </template>
  </ModalView>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import ModalView from "@/components/ModalView.vue";

export default defineComponent({
  components: { ModalView },
  setup() {
    return {  };
  },
});
</script>
<style scoped>

</style>
