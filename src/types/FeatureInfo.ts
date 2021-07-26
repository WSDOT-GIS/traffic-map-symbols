interface FeatureInfo {
    layerTitle: string;
    id: number; // Unique ID. Can be used as v-for key.
    /**
     * If simply specify "Object" for the type of the attribtes property, get the error below when try to get the value dynamically. 
     * Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Object'.
     * No index signature with a parameter of type 'string' was found on type 'Object'.
     */
    attributes: { [key: string]: string | undefined };
}

export default FeatureInfo;

export const getAttribute = (info: FeatureInfo, fieldName: string) => {
    const x = info.attributes[fieldName];
}
