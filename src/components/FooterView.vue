<template>
  <footer class="w3-container">
    <ul>
      <li>
        Copyright WSDOT&copy;
      </li>
      <li>
        <a
          data-entity-substitution="canonical"
          data-entity-type="node"
          data-entity-uuid="695c71b2-1d46-4c46-8254-43c89acc6a97"
          href="/about/policies/web-privacy-notice"
          title="Privacy Policy"
          >Privacy Policy</a
        >
      </li>
      <li>
        <a href="/about/policies/traveler-information-disclaimer">Disclaimer</a>
      </li>
    </ul>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { isSmallMedia } from "@/utils/mediaUtil";

export default defineComponent({
  setup() {
    return { isSmallMedia };
  },
});
</script>

<style>
footer, footer ul li a {
  color: #fff;
  background-color: var(--color-primaryBrand100);
}
footer ul {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0;
  margin: 0;
  font-size: var(--type-scale-base2);
  line-height: var(--type-scale-base4);
}
footer li {
  list-style-type: none;
  padding: 4px 1em !important;
}
@media screen and (max-width: 901px) {
  footer ul {
    flex-wrap: wrap;
    font-size: var(--type-scale-base0);
    line-height: var(--type-scale-base2);
  }

  footer li {
    padding: 2px 8px !important;
  }
}
</style>
