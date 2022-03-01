/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
type EsriRows = {
    features: { attributes: Record<string, unknown> }[]
}

type EsriFeatures = {
    spatialReference: { wkid: number, latestWkid: number },
    features: {
        attributes: Record<string, unknown>,
        geometry: unknown
    }[]
}

/**
 * @param obj
 */
export const isEsriRows = (obj: any): obj is EsriRows => {
    return "features" in obj && Array.isArray(obj.features)
        && obj.features.every((x: any) => { return "attributes" in x });
}

/**
 * @param obj
 */
export const isEsriFeatures = (obj: any): obj is EsriFeatures => {
    return "features" in obj && "spatialReference" in obj
        && Array.isArray(obj.features)
        && obj.features.every((x: any) => {
            return "attributes" in x && "geometry" in x
        });
}