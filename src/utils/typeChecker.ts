type EsriFeatures = {
    features: { attributes: Record<string, unknown> }[]
}

export const isEsriFeatures = (obj: any): obj is EsriFeatures => {
    return "features" in obj && Array.isArray(obj.features) && obj.features.every((x: any) => { return "attributes" in x });
}