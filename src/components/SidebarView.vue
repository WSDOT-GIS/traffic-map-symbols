<template>
  <div class="sidebar">
    <div class="sidebar-backdrop" @click="close" v-if="isOpen">
      <div class="sidebar-close-icon">&times;</div>
    </div>
    <transition name="slide">
      <div v-if="isOpen" class="sidebar-panel">
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

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  transition: all 150ms ease-in 0s;
}

.sidebar {
  font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
  font-size: 15px;
}

.right {
  transition: right 0.2s ease 0s;
  right: 0px;
}
.sidebar-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  cursor: pointer;
  z-index: 998;
}

.sidebar-close-icon {
  position: absolute;
  top: 10px;
  right: 85vw;
  color: #fff;
  font-size: var(--type-scale-base9);
  line-height: 30px;
  font-weight: var(--font-weight-normal);
  text-align: center;
  /* Circle */
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: #000;
}

.sidebar-panel {
  overflow-y: auto;
  background: #97d700;
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  z-index: 999;
  padding: 0;
  width: 80vw;
  text-align: left;
}

.sidebar-panel ul {
  border-bottom: none;
  list-style-type: none;
  padding-left: 0;
}

.sidebar-panel ul li {
  border-top: none;
  border-bottom: 1px solid #1a1a1a;
  padding: 8px 0 4px 0;
}

.sidebar-panel ul li a {
  color: #1d252d;
  font-weight: 600;
  line-height: 1.8rem;
  padding: 3px 10px 5px 10px;
  border-bottom: none;
}

.sidebar-panel ul li a .caret {
  display: none;
}

.sidebar-panel ul li:focus,
.sidebar-panel ul li:hover {
  background-color: transparent;
  /* padding: 0; */
  text-decoration: underline;
  border: none;
  outline-color: none;
  box-shadow: 0 0 15px 3px var(--color-gray60) inset;
  width: 100%;
}

.sidebar-panel ul li.active a {
  box-shadow: none !important;
}

.sidebar-panel ul li ul li {
  border: none;
  list-style-type: none;
  padding: 5px 0;
}

.sidebar-panel ul li ul li a {
  border: none;
}
@media screen and (min-width: 401px) {
  .sidebar-panel {
    width: 300px;
  }
  .sidebar-close-icon {
    right: 320px;
  }
}
</style>
