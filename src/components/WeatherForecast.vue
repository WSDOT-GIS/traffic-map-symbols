<template>
    <div>
        <table>
            <tr>
                {{visible}}
            </tr>
        </table>
    </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onUpdated,
  Prop,
  PropType,
  ref,
  toRefs,
  watch,
} from "vue";
//import {WeatherForecastInfo,Forecast} from "@/types/WeatherForecastInfo"
export default defineComponent({
    setup(props) {
        const propData = toRefs(props)
        //console.log(propData)
        watch(propData,()=>{console.log(propData)})
        return {}
    }
})
</script>