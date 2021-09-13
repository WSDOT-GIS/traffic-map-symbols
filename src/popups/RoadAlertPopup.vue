<template>
  <PopupBase
    LightThemeColor="#ffe1d0"
    DarkThemeColor="#ff8842"
    :Features="[feature]"
    :Config="{
      bannerText: { fieldName: 'EventCategoryDescription' },
      badgeText: { fieldName: 'EventPriorityDescription' },
      title: { custom: getTitle },
      content: [
        { label: 'Travel delay', value: { text: '???' } },
        { label: '', value: { fieldName: 'HeadlineMessage' } },
        {
          label: 'Last updated',
          value: {
            fieldName: 'LastModifiedDate',
            isDate: true,
            isTime: true,
          },
        },
      ],
    }"
    @close="close"
  >
    <template v-slot:icon>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z"
          fill="#FF6A13"
        />
        <path
          d="M22.4167 11.8316C22.4167 17.4986 17.7563 22.0986 12 22.0986C6.2437 22.0986 1.58334 17.4986 1.58334 11.8316C1.58334 6.16464 6.2437 1.56464 12 1.56464C17.7563 1.56464 22.4167 6.16464 22.4167 11.8316Z"
          fill="#FF6A13"
          stroke="white"
          stroke-width="0.5"
        />
        <path
          d="M11.5747 14.3438H12.3109C12.8632 14.3438 13.3109 13.8961 13.3109 13.3438V5.99536C13.3109 5.44308 12.8632 4.99536 12.3109 4.99536H11.5747C11.0225 4.99536 10.5747 5.44308 10.5747 5.99536V13.3438C10.5747 13.8961 11.0225 14.3438 11.5747 14.3438Z"
          fill="white"
        />
        <path
          d="M10.8144 16.9406C10.6581 17.1602 10.5747 17.4184 10.5747 17.6825C10.5755 18.0365 10.7256 18.3758 10.9921 18.6261C11.2587 18.8764 11.62 19.0173 11.997 19.018C12.2782 19.018 12.5532 18.9397 12.7871 18.7929C13.021 18.6462 13.2033 18.4376 13.3109 18.1936C13.4186 17.9496 13.4467 17.681 13.3919 17.422C13.337 17.1629 13.2015 16.925 13.0026 16.7382C12.8037 16.5514 12.5503 16.4242 12.2744 16.3727C11.9985 16.3212 11.7126 16.3476 11.4527 16.4487C11.1928 16.5498 10.9707 16.7209 10.8144 16.9406Z"
          fill="white"
        />
      </svg>
    </template>
  </PopupBase>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import PopupBase from "./PopupBase.vue";
import FeatureLayer from "@/layers/RoadAlertsLayer";
import { getFeatureInfoById } from "@/utils/featureInfoUtil";
import FeaturesetInfo from "@/types/FeaturesetInfo";
import FeatureInfo from "@/types/FeatureInfo";

export default defineComponent({
  components: { PopupBase },
  props: {
    Featureset: {
      type: Object as PropType<FeaturesetInfo>,
      required: true,
    },
  },
  setup(props) {
    const feature = ref<FeatureInfo>();

    watch(props, () => {
      if (props.Featureset.layerId === FeatureLayer("road-alerts-layer").id||props.Featureset.layerId === FeatureLayer("road-closures-layer").id) {
        show();
      } else {
        close();
      }
    });

    const show = () => {
      const setVal = () => {
        getFeatureInfoById(props.Featureset.ids[0], FeatureLayer("road-closures-layer")).then(
          (result) => {
            if (result) {
              feature.value = result;
            }
          }
        );
        getFeatureInfoById(props.Featureset.ids[0], FeatureLayer("road-alerts-layer")).then(
          (result) => {
            if (result) {
              feature.value = result;
            }
          }
        );
      };
      if (feature.value) {
        // Clean up the previous data...
        close();
        setVal();
      } else {
        setVal();
      }
    };
    // Setting features to undefined closes the popup...
    const close = () => {
      feature.value = undefined;
    };

    const getTitle = (feature: FeatureInfo): string => {
      const name = feature.attributes["Road"];
      const dir = feature.attributes["RoadDirection"];
      return `${name ? name : ""} ${dir ? dir : ""}`;
    };

    return {
      feature,
      close,
      getTitle,
    };
  },
});
</script>

