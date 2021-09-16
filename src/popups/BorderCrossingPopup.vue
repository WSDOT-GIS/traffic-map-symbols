<template>
  <PopupBase
    LightThemeColor="#d6d6d6"
    DarkThemeColor="#b2b2b2"
    :Features="[feature]"
    :Config="{
      bannerText: { text: 'Border Crossing' },
      badgeText: { custom: getBadgeText },
      title: { fieldName: 'location_description' },
      content: [
        { label: 'Travel delay', value: { text: '???' } },
        { label: '', value: { fieldName: 'restriction_comment' } },
        {
          label: 'Date effective',
          value: {
            fieldName: 'date_effective',
            isDate: true,
            isTime: true,
          },
        },
        {
          label: 'Last updated',
          value: {
            fieldName: 'RecordUpdateDate',
            isDate: true,
            isTime: true,
          },
        },
      ],
    }"
    @close="close"
  >
    <template v-slot:icon>
      <svg xmlns:i="http://ns.adobe.com/AdobeIllustrator/10.0/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="24" height="24" viewBox="0 0 24 24" fill="none" version="1.1" id="svg1390" sodipodi:docname="Border Crossing Icon.svg" inkscape:version="0.92.3 (2405546, 2018-03-11)">
        <metadata id="metadata1396">
            <rdf:RDF>
            <cc:Work rdf:about="">
                <dc:format>image/svg+xml</dc:format>
                <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
                <dc:title/>
            </cc:Work>
            </rdf:RDF>
        </metadata>
        <defs id="defs1394"/>
        <sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="1920" inkscape:window-height="986" id="namedview1392" showgrid="false" inkscape:zoom="8" inkscape:cx="-24.957312" inkscape:cy="6.0076406" inkscape:window-x="-11" inkscape:window-y="-11" inkscape:window-maximized="1" inkscape:current-layer="svg1390"/>
        <path d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z" id="path1382" style="fill:#cccccc;fill-opacity:1" fill="#FF6A13"/>
        <path d="m 22.41668,11.99998 c 0,5.667 -4.6604,10.267 -10.4167,10.267 -5.7563,0 -10.41666,-4.6 -10.41666,-10.267 0,-5.66696 4.66036,-10.26696 10.41666,-10.26696 5.7563,0 10.4167,4.6 10.4167,10.26696 z" id="path1384" style="fill:#cccccc;fill-opacity:1;stroke:#ffffff;stroke-width:0.5" inkscape:connector-curvature="0"/>
        <g transform="matrix(0.20460301,0,0,0.20460301,1.7797119,1.7698495)" i:extraneous="self" id="g851" style="fill:#ffffff">
            <g id="g849" style="fill:#ffffff">
            <path inkscape:connector-curvature="0" d="M 21,45.6 H 6.9 c -2.4,0 -4.4,2 -4.4,4.4 0,2.4 2,4.4 4.4,4.4 H 21 Z" id="path839" style="fill:#ffffff"/>
            <rect x="43.900002" y="45.599998" width="12.3" height="8.8999996" id="rect841" style="fill:#ffffff"/>
            <path inkscape:connector-curvature="0" d="M 93.1,45.6 H 79 v 8.9 h 14 c 2.5,0 4.4,-2 4.4,-4.4 0.1,-2.6 -1.9,-4.5 -4.3,-4.5 z" id="path843" style="fill:#ffffff"/>
            <path inkscape:connector-curvature="0" d="M 43.7,65 H 38.8 V 24 c 0,-1.7 -1.4,-3.2 -3.2,-3.2 H 29 c -1.7,0 -3.2,1.4 -3.2,3.2 v 41 h -4.9 c -2.6,0 -4.1,3 -2.5,5.1 l 11.3,14.6 c 1.3,1.6 3.7,1.6 5,0 L 46,70.1 C 47.8,68 46.4,65 43.7,65 Z" id="path845" style="fill:#ffffff"/>
            <path inkscape:connector-curvature="0" d="M 81.4,29.9 70.1,15.3 c -1.3,-1.6 -3.7,-1.6 -5,0 L 53.8,29.9 C 52.2,32 53.7,35 56.3,35 h 4.9 v 41 c 0,1.7 1.4,3.2 3.2,3.2 H 71 c 1.7,0 3.2,-1.4 3.2,-3.2 V 35 h 4.9 c 2.4,0 3.9,-3 2.3,-5.1 z" id="path847" style="fill:#ffffff"/>
            </g>
        </g>
        </svg>
    </template>
  </PopupBase>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import PopupBase from "./PopupBase.vue";
import FeatureLayer from "@/layers/BorderCrossingsLayer";
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
      if (props.Featureset.layerId === FeatureLayer().id) {
        show();
      } else {
        close();
      }
    });

    const show = () => {
      const setVal = () => {
        getFeatureInfoById(props.Featureset.ids[0], FeatureLayer()).then(
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
    // Setting XY to 0 closes the popup...
    const close = () => {
      feature.value = undefined;
    };

    const getBadgeText = (feature: FeatureInfo): string => {
      const ttype = feature.attributes["TType"];
      let text = "";
      switch (ttype) {
        case "R":
          text = "Road";
          break;
        case "B":
          text = "Bridge";
          break;
      }
      return text;
    };

    return {
      feature,
      close,
      getBadgeText,
    };
  },
});
</script>

