<template>
  <ModalView
    :Visible="Visible"
    Title="Save This Map"
    OkCaption="Save"
    :WarningMsg="warningMsg"
    @ok-modal="onOk"
    @close-modal="onClose"
  >
    <template v-slot>
      <input
        class="w3-input w3-border"
        title="Input Map Name"
        type="text"
        v-model="newTitle"
        id="new-map-title"
        placeholder="Enter a name for this map."
      />
      <p>
        WARNING: Saved Maps are stored as cookies on your computer. All saved
        maps will be deleted when your browser cache is cleared.
      </p>
    </template>
  </ModalView>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import ModalView from "@/components/ModalView.vue";

export default defineComponent({
  components: { ModalView },
  props: {
    Visible: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, context) {
    const newTitle = ref("");
    const warningMsg = ref("");
    const onOk = () => {
      const title = newTitle.value.trim();
      if (title.length > 0) {
        context.emit("ok-save-map-form", title);
        // Reset...
        newTitle.value = "";
      } else {
        warningMsg.value = "Please enter the title for this map.";
      }
    };
    const onClose = () => {
      context.emit("close-save-map-form");
    };
    watch(newTitle, (newValue) => {
      if (warningMsg.value.length > 0 && newValue.length > 0) {
        warningMsg.value = "";
      }
    });

    return { newTitle, warningMsg, onOk, onClose };
  },
});
</script>
<style scoped>
</style>
