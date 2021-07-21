<template>
  <label class="Toggle">
    <input
      type="checkbox"
      name="toggle"
      class="Toggle__input"
      @change="onToggle"
      :checked="Checked"
      :value="Value"
    />
    <span class="Toggle__display" hidden> </span>
    <slot></slot>
  </label>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    Checked: {
      type: Boolean,
      required: true,
    },
    Value: {
      type: String,
      required: false,
    },
  },
  setup(props, context) {
    const onToggle = (evt: Event) => {
      const target = evt.currentTarget as HTMLInputElement;
      console.log("checked: " + target.checked + " value: " + target.value);
      context.emit("toggle", { checked: target.checked, value: target.value });
    };
    return { onToggle };
  },
});
</script>

<style scoped>
/*https://kittygiraudel.com/2021/04/05/an-accessible-toggle*/
/* Uncomment this rule to effectively break the stylesheet, thus simulating no-CSS styles. */
/* .selector { [property: value; } */

.Toggle {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  /* margin-bottom: 1em; */
  cursor: pointer;
  gap: 1ch;
}

/* button.Toggle {
  border: 0;
  padding: 0;
  background-color: transparent;
  font: inherit;
} */

.Toggle__input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
}

.Toggle__display {
  --offset: 0.05em;
  --diameter: 0.9em;

  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: content-box;
  width: calc(var(--diameter) * 1.5 + var(--offset) * 4);
  height: calc(var(--diameter) + var(--offset) * 0);
  border: 0.1em solid rgb(0 0 0 / 0.2);
  position: relative;
  border-radius: 100vw;
  background-color: var(--color-gray20);
  transition: 250ms;
}

.Toggle__display::before {
  content: "";
  z-index: 2;
  position: absolute;
  top: 50%;
  left: var(--offset);
  box-sizing: border-box;
  width: var(--diameter);
  height: var(--diameter);
  border: 0.1em solid rgb(0 0 0 / 0.2);
  border-radius: 50%;
  background-color: white;
  transform: translate(0, -50%);
  will-change: transform;
  transition: inherit;
}

.Toggle:focus .Toggle__display,
.Toggle__input:focus + .Toggle__display {
  outline: 1px dotted #212121;
  outline: 1px auto -webkit-focus-ring-color;
  outline-offset: 2px;
}

.Toggle:focus,
.Toggle:focus:not(:focus-visible) .Toggle__display,
.Toggle__input:focus:not(:focus-visible) + .Toggle__display {
  outline: 0;
}

.Toggle[aria-pressed="true"] .Toggle__display,
.Toggle__input:checked + .Toggle__display {
  background-color: var(--color-primaryBrand100);
}

.Toggle[aria-pressed="true"] .Toggle__display::before,
.Toggle__input:checked + .Toggle__display::before {
  transform: translate(60%, -50%);
}

.Toggle[disabled] .Toggle__display,
.Toggle__input:disabled + .Toggle__display {
  opacity: 0.6;
  filter: grayscale(40%);
  cursor: not-allowed;
}

[dir="rtl"] .Toggle__display::before {
  left: auto;
  right: var(--offset);
}

[dir="rtl"] .Toggle[aria-pressed="true"] + .Toggle__display::before,
[dir="rtl"] .Toggle__input:checked + .Toggle__display::before {
  transform: translate(-100%, -50%);
}

/* .Toggle__icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  color: inherit;
  fill: currentcolor;
  vertical-align: middle;
  overflow: hidden;
}

.Toggle__icon--cross {
  color: #747474;
  font-size: 85%;
}

.Toggle__icon--checkmark {
  color: #33957f;
} */
</style>