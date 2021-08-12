<template>
    <div>
        <table>
            <tr>
                <td>Weather</td>
                <td>Forecast</td>
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
import WeatherForecastInfo from "@/types/WeatherForecastInfo"
export default defineComponent({
    props:{
        WeatherForecastData:{
            type: Object as PropType<Array<WeatherForecastInfo>>
        }
    }
})
</script>