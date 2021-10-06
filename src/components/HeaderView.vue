<template>
  <!-- 1. Copy the header from the template, then make the following changes.
      - Update WSDOT logo image path to src="@/assets/wsdot-logo-white.svg"
      - Add @load="onImgLoad()" to the WSDOT logo
          <img src="@/assets/wsdot-logo-white.svg" alt="Home" @load="onImgLoad()" />
      - Update the link to the home page https://live-wsdot-wsdot.pantheonsite.io/
        Two places to update:
          <a class="logo navbar-btn pull-left" href="https://live-wsdot-wsdot.pantheonsite.io/" title="Home" rel="home">
          <a class="name navbar-brand" href="https://live-wsdot-wsdot.pantheonsite.io/" title="Home" rel="home">
    2. Copy the navigation bar section.
-->
  <header id="header">
    <div class="header-wrapper">
      <div class="logo-container">
        <div class="region region-header">
          <a class="logo navbar-btn pull-left" href="https://live-wsdot-wsdot.pantheonsite.io/" title="Home" rel="home"
            ><img
              src="@/assets/wsdot-logo-white.svg"
              alt="Home"
              @load="onImgLoad()"
          /></a>
          <a
            class="name navbar-brand"
            href="https://live-wsdot-wsdot.pantheonsite.io/"
            title="Home"
            rel="home"
            >WSDOT</a
          >
          <section
            id="block-externalsearchsearchformblock"
            class="
              contextual-region
              block
              block-wsdot-external-search-forms
              block-external-search-form-block
              clearfix
            "
          >
            <form
              action="https://www.wsdot.wa.gov/search-beta"
              method="GET"
              id="ext-search"
              class="form-inline external-search-form"
              data-drupal-form-fields="ext-search-input"
            >
              <div class="form-group">
                <label class="sr-only">Search</label>
                <input
                  type="text"
                  name="q"
                  class="form-control"
                  placeholder="Search"
                  id="ext-search-input"
                />
                <button type="submit" class="btn search-form__submit">
                  <span class="sr-only">Search</span>
                </button>
              </div>
            </form>
          </section>
          <a id="main-menu" href="#menu-schmenu" class="sidr-trigger"
            ><span class="sidr-trigger__icon"><i class="fa fa-bars"></i></span
          ></a>
        </div>
      </div>
    </div>
  </header>
  <div class="nav-outer-wrapper">
    <div class="navbar navbar-default container" id="navbar" role="nav">
      <div class="nav-tabs break-lg-control" aria-hidden="false">
        <nav aria-describedby="block-mainnavigation-8-menu">
          <h2 class="sr-only menu-heading" id="block-mainnavigation-8-menu">
            Main navigation
          </h2>
          <div class="container-fluid" id="menu-schmenu">
            <ul class="menu menu--main nav">
              <li class="first">
                <a
                  href="https://live-wsdot-wsdot.pantheonsite.io/travel"
                  data-drupal-link-system-path="node/403"
                  >Travel</a
                >
              </li>
              <li>
                <a
                  href="https://live-wsdot-wsdot.pantheonsite.io/construction-planning"
                  data-drupal-link-system-path="node/404"
                  >Construction &amp; planning</a
                >
              </li>
              <li>
                <a
                  href="https://live-wsdot-wsdot.pantheonsite.io/business-wsdot"
                  data-drupal-link-system-path="node/405"
                  >Business with WSDOT</a
                >
              </li>
              <li>
                <a
                  href="https://live-wsdot-wsdot.pantheonsite.io/engineering-standards"
                  data-drupal-link-system-path="node/406"
                  >Engineering &amp; standards</a
                >
              </li>
              <li class="last">
                <a
                  href="https://live-wsdot-wsdot.pantheonsite.io/about"
                  data-drupal-link-system-path="node/53"
                  >About</a
                >
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup(props, context) {
    // DOT icon is loaded slightly later, so let the app know when that is complete.
    const onImgLoad = () => {
      context.emit("onLoadComplete");
    };
    return { onImgLoad };
  },
});
</script>

