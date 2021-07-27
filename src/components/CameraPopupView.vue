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
    PictureFieldName="ImageURL"
    @close="close"
    @idxUpdate="currentIdx = $event"
  >
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

