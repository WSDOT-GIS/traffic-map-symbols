import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

const firePerimeterFeatureIDs = async (fireIncidentLayer:FeatureLayer)=>{ 
    const fireIncidentQuery = fireIncidentLayer.createQuery();
    fireIncidentQuery.where = `POOState= 'US-WA'`;
    fireIncidentQuery.outFields = ["IrwinID"];
    const response = await fireIncidentLayer.queryFeatures(fireIncidentQuery)
    let queryString = "IrwinID = "
    for(let i=0;i<response.features.length;i++){
        if (i==0){
            queryString=queryString+`'${response.features[i].attributes.IrwinID}'`
        }
        else{
            queryString=queryString+` OR IrwinID = '${response.features[i].attributes.IrwinID}'`
        }
    }
    return queryString
}
export default firePerimeterFeatureIDs