<template>
  <div class="sidebar">
    <div class="sidebar-backdrop" @click="close" v-if="isOpen"></div>
    <transition name="slide">
      <div v-if="isOpen" class="sidr right">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  setup() {
    const store = useStore();
    const isOpen = computed(() => {
      return store.state.isMobileMenuOpen;
    });
    const close = () => {
      store.commit("toggleIsMobileMenuOpen");
    };
    return { isOpen, close };
  },
});
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
  transition: all 150ms ease-in 0s;
}

.sidebar {
  display: block;
  position: fixed;
  top: 0;
  height: 100%;
  z-index: 999999;
  width: 260px;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
  font-size: 15px;
  box-shadow: none;
  color: #fff;
}

.right {
  transition: right 0.2s ease 0s;
  right: 0px;
}
/* .sidebar-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  cursor: pointer;
} */

.sidebar-panel {
  overflow-y: auto;
  background: #97d700;
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  z-index: 999;
  padding: 3rem 20px 2rem 20px;
  width: 300px;
  text-align: left;
}
</style>
