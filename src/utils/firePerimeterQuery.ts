import type Graphic from "@arcgis/core/Graphic";
import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";



const firePerimeterFeatureIDs = async (fireIncidentLayer: FeatureLayer): Promise<string> => {
    const fireIncidentQuery = fireIncidentLayer.createQuery();
    fireIncidentQuery.outFields = ["IncidentName"];
    let features: Graphic[];
    try {
        const response = await fireIncidentLayer.queryFeatures(fireIncidentQuery);
        features = response.features;
    } catch (ex) {
        console.error(ex)
        return "1=0";
    }
    if (features.length === 0) {
        return "1=0";
    }
    let queryString = 'IncidentName IN('
    for (let i = 0; i < features.length; i++) {
        if (i == 0) {
            queryString = queryString + `'${features[i].attributes.IncidentName}',`
        }
        else {
            queryString = queryString + `'${features[i].attributes.IncidentName}',`
        }
        if (i == features.length - 1) {
            queryString = queryString + `'${features[i].attributes.IncidentName}')`
        }
    }
    return queryString

}
export default firePerimeterFeatureIDs