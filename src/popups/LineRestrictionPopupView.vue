<template>
  <PopupView
    :MapX="mapX"
    :MapY="mapY"
    LightThemeColor="#fff3cd"
    DarkThemeColor="#FFC107"
    BannerText="Vehicle Restriction"
    :Features="[feature]"
    TitleFieldName="location_description"
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
          fill="#FFC107"
        />
        <path
          d="M22.4167 11.8316C22.4167 17.4986 17.7563 22.0987 12 22.0987C6.2437 22.0987 1.58334 17.4986 1.58334 11.8316C1.58334 6.16465 6.2437 1.56464 12 1.56464C17.7563 1.56464 22.4167 6.16465 22.4167 11.8316Z"
          fill="#FFC107"
          stroke="white"
          stroke-width="0.5"
        />
        <path
          d="M17.0449 14.7393C16.4711 14.7393 16.006 15.1982 16.006 15.7637C16.006 16.3297 16.4711 16.7883 17.0449 16.7883C17.6189 16.7883 18.0844 16.3294 18.0844 15.7637C18.0844 15.198 17.6189 14.7393 17.0449 14.7393Z"
          fill="white"
        />
        <path
          d="M7.86442 14.7393C7.29064 14.7393 6.8252 15.1982 6.8252 15.7637C6.8252 16.3297 7.29064 16.7883 7.86442 16.7883C8.43819 16.7883 8.90364 16.3294 8.90364 15.7637C8.90364 15.198 8.43819 14.7393 7.86442 14.7393Z"
          fill="white"
        />
        <path
          d="M13.883 8.32593H5.29106C5.07002 8.32593 4.88889 8.53038 4.88889 8.7808V14.9671C4.88889 15.2175 5.07002 15.4219 5.29106 15.4219H5.9327C5.92321 15.4883 5.91651 15.5554 5.91428 15.6236C5.91316 15.6567 5.92572 15.6886 5.94888 15.7125C5.97205 15.7362 6.00414 15.75 6.03764 15.75H6.42279C6.48893 15.75 6.54307 15.6988 6.54614 15.6338C6.55005 15.551 6.56205 15.4704 6.58075 15.393C6.74374 14.8325 7.26649 14.4222 7.88747 14.4222C8.16266 14.4222 8.41886 14.5028 8.63321 14.6415C8.94803 14.8653 9.15874 15.2233 9.178 15.6338C9.18135 15.6988 9.23549 15.75 9.30136 15.75H9.68651C9.68679 15.75 9.68707 15.75 9.68735 15.75C9.75572 15.75 9.81098 15.6952 9.81098 15.6281C9.81098 15.6212 9.81043 15.6146 9.80903 15.6082C9.80624 15.5452 9.80038 15.483 9.79145 15.4219H13.8827C14.104 15.4219 14.2849 15.2175 14.2849 14.9671V8.7808C14.2851 8.53038 14.1043 8.32593 13.883 8.32593Z"
          fill="white"
        />
        <path
          d="M19.8395 12.4984L19.0502 12.2227C18.8347 12.1476 18.5983 11.9338 18.5308 11.7043C18.4867 11.5546 17.9394 9.95331 17.9394 9.95331C17.8908 9.70675 17.6637 9.54302 17.4041 9.5466C17.2983 9.5466 15.012 9.55073 15.012 9.55073C14.9132 9.55073 14.8211 9.58072 14.7452 9.63218C14.7301 9.64456 14.7041 9.66052 14.6921 9.674C14.597 9.75986 14.5518 9.88286 14.5518 10.0194V10.4274V14.5447V14.953C14.5518 15.2109 14.7812 15.4219 15.0427 15.4219H15.1189C15.1097 15.4882 15.1032 15.5554 15.1007 15.6236C15.0993 15.6567 15.1122 15.6886 15.1353 15.7125C15.1588 15.7362 15.1909 15.7499 15.2241 15.7499H15.6092C15.6751 15.7499 15.7298 15.6988 15.7326 15.6338C15.7415 15.4404 15.7937 15.2587 15.8786 15.0969C16.113 14.6941 16.5531 14.4222 17.0583 14.4222C17.4278 14.4222 17.7619 14.568 18.0069 14.8033C18.2157 15.0215 18.3491 15.3113 18.3642 15.6341C18.3675 15.699 18.4217 15.7502 18.4878 15.7502H18.8727C18.9411 15.7502 18.9972 15.6954 18.9972 15.6283C18.9972 15.6214 18.9966 15.6148 18.9952 15.6085C18.9924 15.5455 18.9866 15.4833 18.9776 15.4222C19.0223 15.4222 19.0672 15.4222 19.1119 15.4222C19.2545 15.4222 19.3924 15.4222 19.5015 15.4222H19.5191H19.8116C20.0731 15.4222 20.2869 15.2111 20.2869 14.9533V13.1242C20.2877 12.8661 20.0859 12.5848 19.8395 12.4984Z"
          fill="white"
        />
      </svg>
    </template>
    <template v-slot:default>
      <PopupRow Label="Travel delay" Text="???" />
      <PopupRow :Feature="feature" FieldName="restriction_comment" />
      <PopupRow
        Label="Date effective"
        :Feature="feature"
        FieldName="date_effective"
        :IsDate="true"
      />
      <PopupRow
        Label="Last updated"
        :Feature="feature"
        FieldName="RecordUpdateDate"
        :IsDate="true"
      />

      <!--<table>
        <tr>
          <td class="popupKey">Unique Id</td>
          <td class="popupValue">{{ feature?.attributes["UniqueId"] }}</td>
        </tr>
        <tr>
          <td class="popupKey">State</td>
          <td class="popupValue">{{ feature?.attributes["state"] }}</td>
        </tr>
        <tr>
          <td class="popupKey">Route</td>
          <td class="popupValue">{{ feature?.attributes["route_nr"] }}</td>
        </tr>
        <tr>
          <td class="popupKey">Sequence</td>
          <td class="popupValue">{{ feature?.attributes["seq_nr"] }}</td>
        </tr>
        <tr>
          <td class="popupKey">Direction</td>
          <td class="popupValue">{{ feature?.attributes["direction"] }}</td>
        </tr>
        <tr>
          <td class="popupKey">Cardinal Direction</td>
          <td class="popupValue">
            {{ feature?.attributes["cardinal_direction"] }}
          </td>
        </tr>
        <tr>
          <td class="popupKey">Start Milepost</td>
          <td class="popupValue">
            {{ feature?.attributes["restriction_start_mp"] }}
          </td>
        </tr>
        <tr>
          <td class="popupKey">End Milepost</td>
          <td class="popupValue">
            {{ feature?.attributes["restriction_end_mp"] }}
          </td>
        </tr>
        <tr>
          <td class="popupKey">Comment</td>
          <td class="popupValue">
            {{ feature?.attributes["restriction_comment"] }}
          </td>
        </tr>
        <tr>
          <td class="popupKey">Location</td>
          <td class="popupValue">{{ feature?.attributes["location_name"] }}</td>
        </tr>
        <tr>
          <td class="popupKey">Description</td>
          <td class="popupValue">
            {{ feature?.attributes["location_description"] }}
          </td>
        </tr>
        <tr>
          <td class="popupKey">Date Posted</td>
          <td class="popupValue">{{ feature?.attributes["date_posted"] }}</td>
        </tr>
        <tr>
          <td class="popupKey">Date Effective</td>
          <td class="popupValue">
            {{ feature?.attributes["date_effective"] }}
          </td>
        </tr>
        <tr>
          <td class="popupKey">Date Expires</td>
          <td class="popupValue">{{ feature?.attributes["date_expires"] }}</td>
        </tr>
        <tr>
          <td class="popupKey">Width</td>
          <td class="popupValue">
            {{ feature?.attributes["restriction_width"] }}
          </td>
        </tr>
        <tr>
          <td class="popupKey">Height</td>
          <td class="popupValue">
            {{ feature?.attributes["restriction_height"] }}
          </td>
        </tr>
        <tr>
          <td class="popupKey">Length</td>
          <td class="popupValue">
            {{ feature?.attributes["restriction_length"] }}
          </td>
        </tr>
        <tr>
          <td class="popupKey">Weight</td>
          <td class="popupValue">
            {{ feature?.attributes["restriction_weight"] }}
          </td>
        </tr>
        <tr>
          <td class="popupKey">Vehicle Type</td>
          <td class="popupValue">{{ feature?.attributes["road_veh_type"] }}</td>
        </tr>
        <tr>
          <td class="popupKey">Commerical Vehicle</td>
          <td class="popupValue">
            {{ feature?.attributes["commercial_veh_yn"] }}
          </td>
        </tr>
        <tr>
          <td class="popupKey">Detour Available</td>
          <td class="popupValue">
            {{ feature?.attributes["detour_available_yn"] }}
          </td>
        </tr>
        <tr>
          <td class="popupKey">Permanent</td>
          <td class="popupValue">
            {{ feature?.attributes["permanent_restriction_yn"] }}
          </td>
        </tr>
        <tr>
          <td class="popupKey">Exceptions Allowed</td>
          <td class="popupValue">
            {{ feature?.attributes["exceptions_allowed_yn"] }}
          </td>
        </tr>
        <tr>
          <td class="popupKey">Warning</td>
          <td class="popupValue">{{ feature?.attributes["warning_yn"] }}</td>
        </tr>
        <tr>
          <td class="popupKey">Bridge Number</td>
          <td class="popupValue">{{ feature?.attributes["bridge_nr"] }}</td>
        </tr>
        <tr>
          <td class="popupKey">Max Gross Vehicle Weight</td>
          <td class="popupValue">{{ feature?.attributes["max_gvw"] }}</td>
        </tr>
        <tr>
          <td class="popupKey">Bridge Type</td>
          <td class="popupValue">{{ feature?.attributes["bridge_type"] }}</td>
        </tr>
        <tr>
          <td class="popupKey">Bridge Name</td>
          <td class="popupValue">{{ feature?.attributes["bridge_name"] }}</td>
        </tr>
        <tr>
          <td class="popupKey">bl_max_axle</td>
          <td class="popupValue">{{ feature?.attributes["bl_max_axle"] }}</td>
        </tr>
        <tr>
          <td class="popupKey">cl8_max_axle</td>
          <td class="popupValue">{{ feature?.attributes["cl8_max_axle"] }}</td>
        </tr>
        <tr>
          <td class="popupKey">sa_max_axle</td>
          <td class="popupValue">{{ feature?.attributes["sa_max_axle"] }}</td>
        </tr>
        <tr>
          <td class="popupKey">td_max_axle</td>
          <td class="popupValue">{{ feature?.attributes["td_max_axle"] }}</td>
        </tr>
        <tr>
          <td class="popupKey">Type</td>
          <td class="popupValue">{{ feature?.attributes["TType"] }}</td>
        </tr>
        <tr>
          <td class="popupKey">Posted Restriction Flag</td>
          <td class="popupValue">
            {{ feature?.attributes["PostedRestrictionFlag"] }}
          </td>
        </tr>
        <tr>
          <td class="popupKey">Record Update Date</td>
          <td class="popupValue">
            {{
              feature?.attributes["RecordUpdateDate"]
                ? new Date(feature?.attributes["RecordUpdateDate"]).toString()
                : ""
            }}
          </td>
        </tr>
        <tr>
          <td class="popupKey">Related Route Type</td>
          <td class="popupValue">
            {{ feature?.attributes["RelatedRouteType"] }}
          </td>
        </tr>
        <tr>
          <td class="popupKey">Related Route Qualifier</td>
          <td class="popupValue">
            {{ feature?.attributes["RelatedRouteQualifier"] }}
          </td>
        </tr>
        <tr>
          <td class="popupKey">Ahead Back Indicator</td>
          <td class="popupValue">
            {{ feature?.attributes["AheadBackIndicator"] }}
          </td>
        </tr>
        <tr>
          <td class="popupKey">ESRI_OID</td>
          <td class="popupValue">{{ feature?.attributes["ESRI_OID"] }}</td>
        </tr>
        <tr>
          <td class="popupKey"></td>
          <td class="popupValue">{{ feature?.attributes[""] }}</td>
        </tr>
      </table> -->
    </template>
  </PopupView>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import PopupView from "./PopupBase.vue";
import PopupRow from "./PopupRow.vue";
import LineRestrictionsLayer from "@/layers/LineRestrictionsLayer";
// import RestrictionInfo from "@/types/RestrictionInfo";
import { getFeatureInfoById } from "@/utils/featureInfoUtil";
import FeaturesetInfo from "@/types/FeaturesetInfo";
import FeatureInfo from "@/types/FeatureInfo";

export default defineComponent({
  components: { PopupView, PopupRow },
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
      if (props.Featureset.layerTitle === LineRestrictionsLayer.title) {
        show();
      } else {
        close();
      }
    });

    const show = () => {
      const setVal = () => {
        getFeatureInfoById(props.Featureset.ids[0], LineRestrictionsLayer).then(
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
        // console.log("Clean and set popup value");
        // Clean up the previous data...
        close();
        setVal();
      } else {
        // console.log("Set popup value.");
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

