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
      <label>Name:
      <input
        class="w3-input w3-border w3-round"
        title="Input Map Name"
        type="text"
        v-model="newTitle"
        id="new-map-title"
        placeholder="Enter a name for this map."
      />
      </label>
      <p>
        WARNING: Saved Maps are stored as cookies on your computer. All saved
        maps will be deleted when your browser cache is cleared.
      </p>
    </template>
  </ModalView>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, watch } from "vue";

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
      } else {
        warningMsg.value = "Please enter the name for this map.";
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
    const visible = toRefs(props).Visible;
    watch(visible, (newValue) => {
      // Reset warning msg and input box when form is closed, so they won't show next time......
      if (!newValue) {
        warningMsg.value = "";
        newTitle.value = "";
      }
    });

    return { newTitle, warningMsg, onOk, onClose };
  },
});
</script>
<style scoped>
</style>
