import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

const firePerimeterFeatureIDs = async (fireIncidentLayer:FeatureLayer):Promise<string>=>{ 
    const fireIncidentQuery = fireIncidentLayer.createQuery();
    fireIncidentQuery.outFields = ["IncidentName"];
    const response = await fireIncidentLayer.queryFeatures(fireIncidentQuery)
    let queryString = 'IncidentName IN('
    for(let i=0;i<response.features.length;i++){
        if (i==0){
            queryString=queryString+`'${response.features[i].attributes.IncidentName}',`
        }
        else{
            queryString=queryString+`'${response.features[i].attributes.IncidentName}',`
        }
        if (i==response.features.length-1){
            queryString=queryString+`'${response.features[i].attributes.IncidentName}')`
        }
    }
    return queryString
}
export default firePerimeterFeatureIDs