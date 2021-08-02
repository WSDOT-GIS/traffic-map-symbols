<template>
  <PopupBase
    :MapX="mapX"
    :MapY="mapY"
    LightThemeColor="#eaf7cc"
    DarkThemeColor="#97D700"
    BannerText="Park and Ride"
    :Features="[feature]"
    TitleFieldName="Lot_Name"
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
          fill="#97D700"
        />
        <path
          d="M22.4167 11.8233C22.4167 17.4861 17.7565 22.083 12 22.083C6.24354 22.083 1.58334 17.4861 1.58334 11.8233C1.58334 6.16059 6.24354 1.56371 12 1.56371C17.7565 1.56371 22.4167 6.16059 22.4167 11.8233Z"
          fill="#97D700"
          stroke="white"
          stroke-width="0.5"
        />
        <path
          d="M10.8996 14.1445C10.7726 14.1445 10.6696 14.2475 10.6696 14.3745V18.6005C10.6696 18.7275 10.5666 18.8305 10.4396 18.8305H8.67531C8.54829 18.8305 8.44531 18.7275 8.44531 18.6005V5.74827C8.44531 5.62125 8.54829 5.51827 8.67531 5.51827H12.3399C13.1392 5.51827 13.831 5.62261 14.4153 5.83129C14.9997 6.03996 15.482 6.33149 15.8624 6.70588C16.2427 7.08027 16.5239 7.5283 16.7058 8.04999C16.8877 8.57168 16.9786 9.14246 16.9786 9.76235C16.9786 10.4068 16.8822 10.9991 16.6892 11.5392C16.4963 12.0731 16.2069 12.5334 15.821 12.9201C15.4351 13.3067 14.9528 13.6075 14.374 13.8223C13.7952 14.0371 13.1171 14.1445 12.3399 14.1445H10.8996ZM10.6696 11.9812C10.6696 12.1082 10.7726 12.2112 10.8996 12.2112H12.3399C12.7478 12.2112 13.1034 12.156 13.4066 12.0455C13.7097 11.9289 13.9606 11.7662 14.159 11.5576C14.3575 11.3428 14.5063 11.085 14.6055 10.7842C14.7047 10.4774 14.7544 10.1367 14.7544 9.76235C14.7544 9.40637 14.7047 9.08416 14.6055 8.79569C14.5063 8.50723 14.3575 8.26173 14.159 8.05919C13.9606 7.85666 13.7097 7.70322 13.4066 7.59888C13.1034 7.48841 12.7478 7.43317 12.3399 7.43317H10.8996C10.7726 7.43317 10.6696 7.53615 10.6696 7.66317V11.9812Z"
          fill="white"
        />
      </svg>
    </template>
    <template v-slot:default>
      <PopupRow
        Label="Street location"
        :TextOptions="{ feature: feature, fieldName: 'Street_Location' }"
      />
      <PopupRow
        Label="Address"
        :TextOptions="{ feature: feature, fieldName: 'Address' }"
      />
      <PopupRow
        Label="County"
        :TextOptions="{ feature: feature, fieldName: 'CountyName' }"
      />
      <PopupRow
        Label="Approx. number of spaces"
        :TextOptions="{ feature: feature, fieldName: 'Approx_Numb_Spaces' }"
      />
      <PopupRow Label="Transit organization" :TextOptions="{ text: '???' }" />
      <PopupRow
        Label="Last updated"
        :TextOptions="{
          feature: feature,
          fieldName: 'PublishDate',
          isDate: true,
        }"
      />
    </template>
  </PopupBase>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import PopupBase from "./PopupBase.vue";
import PopupRow from "./PopupRow.vue";
import FeatureLayer from "@/layers/ParkRideLayer";
import { getFeatureInfoById } from "@/utils/featureInfoUtil";
import FeaturesetInfo from "@/types/FeaturesetInfo";
import FeatureInfo from "@/types/FeatureInfo";

export default defineComponent({
  components: { PopupBase, PopupRow },
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
    const feature = ref<FeatureInfo>();
    const mapX = ref(0);
    const mapY = ref(0);

    watch(props, () => {
      if (props.Featureset.layerTitle === FeatureLayer.title) {
        show();
      } else {
        close();
      }
    });

    const show = () => {
      const setVal = () => {
        getFeatureInfoById(props.Featureset.ids[0], FeatureLayer).then(
          (result) => {
            if (result) {
              feature.value = result;
              mapX.value = props.MapX;
              mapY.value = props.MapY;
            }
          }
        );
      };
      if (mapX.value !== 0 || mapY.value !== 0 || feature.value) {
        // Clean up the previous data...
        close();
        setVal();
      } else {
        setVal();
      }
    };
    // Setting XY to 0 closes the popup...
    const close = () => {
      mapX.value = 0;
      mapY.value = 0;
      feature.value = undefined;
    };

    return {
      mapX,
      mapY,
      feature,
      close,
    };
  },
});
</script>

