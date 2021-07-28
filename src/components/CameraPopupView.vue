<template>
  <PopupView
    :MapX="mapX"
    :MapY="mapY"
    Width="w"
    LightThemeColor="#cce5df"
    DarkThemeColor="#007b5f"
    :BannerText="
      'Camera' + (features.length > 1 ? ' (' + features.length + ')' : '')
    "
    :Features="features"
    TitleFieldName="CameraTitle"
    ImageFieldName="ImageURL"
    @close="close"
    @idxUpdate="currentIdx = $event"
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
              fill="#007B5F"
            />
            <path
              d="M22.4167 11.8319C22.4167 17.4989 17.7563 22.0989 12 22.0989C6.2437 22.0989 1.58334 17.4989 1.58334 11.8319C1.58334 6.16495 6.2437 1.56494 12 1.56494C17.7563 1.56494 22.4167 6.16495 22.4167 11.8319Z"
              fill="#007B5F"
              stroke="white"
              stroke-width="0.5"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.7778 7.48944C6.67323 7.48944 5.7778 8.38487 5.7778 9.48944V13.9706C5.7778 15.0751 6.67323 15.9706 7.7778 15.9706H14.1C15.2046 15.9706 16.1 15.0751 16.1 13.9706V9.48944C16.1 8.38487 15.2046 7.48944 14.1 7.48944H7.7778ZM18.4557 8.33777H18.6108C18.887 8.33777 19.1108 8.56163 19.1108 8.83777V13.7746C19.1108 14.0507 18.887 14.2746 18.6108 14.2746H18.4557C18.3243 14.2746 18.1982 14.2229 18.1046 14.1306L16.2491 12.3011C16.1538 12.2072 16.1002 12.0789 16.1002 11.9451V10.6672C16.1002 10.5334 16.1538 10.4052 16.2491 10.3112L18.1046 8.48173C18.1982 8.38948 18.3243 8.33777 18.4557 8.33777Z"
              fill="white"
            />
          </svg>
    </template>
    <template v-slot:default>
      <div>
        <b>Camera Direction: </b
        >{{ features[currentIdx].attributes["CompassDirection"] }}
      </div>
      <div><b>Refresh Rate: </b>Data is not available</div>
      <!-- <table>
        <tr>
          <td class="popupKey">ID</td>
          <td class="popupValue">{{ features[currentIdx].id }}</td>
        </tr>
        <tr>
          <td class="popupKey">SR</td>
          <td class="popupValue">
            {{ features[currentIdx].attributes["WSDOTSRID"] }}
          </td>
        </tr>
        <tr>
          <td class="popupKey">Milepost</td>
          <td class="popupValue">
            {{ features[currentIdx].attributes["StateRouteMilepost"] }}
          </td>
        </tr>
        <tr>
          <td class="popupKey">Direction</td>
          <td class="popupValue">
            {{ features[currentIdx].attributes["CompassDirection"] }}
          </td>
        </tr>
        <tr>
          <td class="popupKey">Owner Name</td>
          <td class="popupValue">
            {{ features[currentIdx].attributes["CameraOwnerName"] }}
          </td>
        </tr>
        <tr>
          <td class="popupKey">Owner URL</td>
          <td class="popupValue">
            {{ features[currentIdx].attributes["CameraOwnerURL"] }}
          </td>
        </tr>
      </table> -->
    </template>
  </PopupView>
</template>
<script lang="ts">
import { defineComponent, nextTick, PropType, ref, watch } from "vue";
import "vue3-carousel/dist/carousel.css";

import PopupView from "./PopupView.vue";
import FeaturesetInfo from "@/types/FeaturesetInfo";
import { getFeatureInfosByIds } from "@/utils/featureInfoUtil";
import CameraLayer from "@/layers/CameraLayer";
import FeatureInfo from "@/types/FeatureInfo";

export default defineComponent({
  components: { PopupView },
  props: {
    Featureset: {
      type: Object as PropType<FeaturesetInfo>,
      required: true,
    },
    MapX: {
      type: Number,
      required: true,
    },
    MapY: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const features = ref<FeatureInfo[]>([]);
    const currentIdx = ref(0);
    const mapX = ref(0);
    const mapY = ref(0);

    watch(props, () => {
      if (props.Featureset.layerTitle === CameraLayer.title) {
        console.log("Camera Layer Popup!");
        show();
      } else {
        close();
      }
    });
    const show = () => {
      const setVal = () => {
        getFeatureInfosByIds(props.Featureset.ids, CameraLayer).then(
          (results) => {
            features.value = results;
            mapX.value = props.MapX;
            mapY.value = props.MapY;
          }
        );
      };
      if (mapX.value !== 0 || mapY.value !== 0 || features.value.length > 0) {
        // console.log("Clean and set popup value");
        // Clean up the previous data...
        close();
        // Wait for the next update. Without doing this, scrolling won't work correctly.
        nextTick(() => {
          // console.log("nextTick callback...");
          setVal();
        });
      } else {
        // console.log("Set popup value.");
        setVal();
      }
    };
    // Setting XY to 0 closes the popup...
    const close = () => {
      // console.log("close CameraPopup");
      mapX.value = 0;
      mapY.value = 0;
      features.value = [];
    };

    return {
      mapX,
      mapY,
      features,
      close,
      currentIdx,
    };
  },
});
</script>

