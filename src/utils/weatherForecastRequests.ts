
export const getForecastSummary = async(NWSZoneId: string)=>{
    console.log(`https://webteamtest/travel/service/api/ForecastSummary/${NWSZoneId}`)
    fetch(`https://webteamtest/travel/service/api/ForecastSummary/${NWSZoneId}`)
    .then((response) => {
       response.json().then(data => {
            console.log(data)
            return data
        })
    })
    
}