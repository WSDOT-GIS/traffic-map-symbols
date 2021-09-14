<template>
  <header id="header" role="header">
    <div class="header-wrapper">
      <div class="logo-container">
        <div class="region region-header">
          <a class="logo navbar-btn pull-left" href="/" title="Home" rel="home">
            <!-- NOTE:
              - Make sure to change the path when replacing this with new version.
              - The image is loaded later and changes the size of the header. 
              So let app know when it is loaded so the app can size map view correctly. -->
            <img
              src="@/assets/wsdot-logo-white.svg"
              alt="Home"
              @load="onImgLoad()"
            />
          </a>
          <a class="name navbar-brand" href="/" title="Home" rel="home"
            >WSDOT</a
          >
          <section
            id="block-headerlinks"
            class="
              col-lg-3 col-md-3 col-sm-12 col-xs-12
              block
              block-block-content
              block-block-content7289c7a7-b6dd-4b1f-b3a9-1ce517572c24
              clearfix
            "
          >
            <div
              class="
                field
                field--name-body
                field--type-text-with-summary
                field--label-hidden
                field--item
              "
            >
              <ul>
                <li><a href="/about/news">News</a></li>
                <li><a href="/employment">Employment</a></li>
              </ul>
            </div>
          </section>
          <section
            class="
              search-api-page-block-form-search
              search-api-page-block-form
              search-form
              search-block-form
              container-inline
              block block-search-api-page block-search-api-page-form-block
              clearfix
            "
            data-drupal-selector="search-api-page-block-form-search"
            id="block-searchapipagesearchblockform"
          >
            <h2 class="block-title">Search Api Page search block form</h2>
            <form
              action="https://dev-wsdot-wsdot.pantheonsite.io/search"
              method="post"
              id="search-api-page-block-form-search"
              accept-charset="UTF-8"
            >
              <div
                class="
                  form-item
                  js-form-item
                  form-type-search
                  js-form-type-search
                  form-item-keys
                  js-form-item-keys
                  form-no-label form-group
                "
              >
                <label for="edit-keys" class="control-label sr-only"
                  ><span class="form-value">Search</span></label
                >
                <input
                  title="Enter the terms you wish to search for."
                  data-drupal-selector="edit-keys"
                  class="form-search form-control"
                  placeholder="Search"
                  type="search"
                  id="edit-keys"
                  name="keys"
                  value=""
                  size="15"
                  maxlength="128"
                />
              </div>
              <input
                autocomplete="off"
                data-drupal-selector="form-f9u4aflua-hfsq9yzdazxizistbtrzmivm-e7c1yg6c"
                type="hidden"
                name="form_build_id"
                value="form-f9u4AFlUA_HfSQ9YzdAZxIZISTbTRzmIVM-e7C1YG6c"
              />
              <input
                data-drupal-selector="edit-search-api-page-block-form-search"
                type="hidden"
                name="form_id"
                value="search_api_page_block_form_search"
              />
              <div
                data-drupal-selector="edit-actions"
                class="form-actions form-group js-form-wrapper form-wrapper"
                id="edit-actions"
              >
                <button
                  class="
                    search-form__submit
                    button
                    js-form-submit
                    form-submit
                    btn-default btn
                  "
                  data-drupal-selector="edit-submit"
                  type="submit"
                  id="edit-submit"
                  name="op"
                  value="Search"
                >
                  <span class="sr-only">Search</span>
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  </header>
  <div class="nav-outer-wrapper">
    <div class="navbar navbar-default container" id="navbar" role="nav">
      <button role="button" id="menu-button" class="menu-toggle">
        <i class="far fa-bars"></i><span class="”sr-only”"></span>
      </button>
      <nav role="navigation">
        <div class="navbar-header">
          <div class="region region-navigation">
            <section
              id="block-mainnavigation"
              class="
                block block-we-megamenu block-we-megamenu-blockmain
                clearfix
              "
            >
              <div class="region-we-mega-menu">
                <a class="navbar-toggle collapsed">
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </a>
                <nav
                  class="
                    main
                    navbar navbar-default navbar-we-mega-menu
                    mobile-collapse
                    hover-action
                  "
                >
                  <div class="container-fluid">
                    <ul class="we-mega-menu-ul nav nav-tabs">
                      <li class="we-mega-menu-li" data-level="0">
                        <a class="we-mega-menu-li" title="" href="/" target="">
                          Home
                        </a>
                      </li>
                      <li class="we-mega-menu-li" data-level="0">
                        <a
                          class="we-mega-menu-li"
                          title=""
                          href="/travel"
                          target=""
                        >
                          Travel
                        </a>
                      </li>
                      <li class="we-mega-menu-li" data-level="0">
                        <a
                          class="we-mega-menu-li"
                          title=""
                          href="/construction-planning"
                          target=""
                        >
                          Construction &amp; Planning
                        </a>
                      </li>
                      <li class="we-mega-menu-li" data-level="0">
                        <a
                          class="we-mega-menu-li"
                          title=""
                          href="/business-wsdot"
                          target=""
                        >
                          Business with WSDOT
                        </a>
                      </li>
                      <li class="we-mega-menu-li" data-level="0">
                        <a
                          class="we-mega-menu-li"
                          title=""
                          href="/engineering-standards"
                          target=""
                        >
                          Engineering &amp; Standards
                        </a>
                      </li>
                      <li class="we-mega-menu-li" data-level="0">
                        <a
                          class="we-mega-menu-li"
                          title=""
                          href="/about"
                          target=""
                        >
                          About
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </section>
          </div>
        </div>
      </nav>
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

