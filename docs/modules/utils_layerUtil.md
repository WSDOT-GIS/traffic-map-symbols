[wsdot-travel-center-map](../README.md) / utils/layerUtil

# Module: utils/layerUtil

## Table of contents

### Functions

- [createLayerGroupInfos](utils_layerUtil.md#createlayergroupinfos)
- [fetchJsonData](utils_layerUtil.md#fetchjsondata)
- [getFeature](utils_layerUtil.md#getfeature)
- [getLayerIds](utils_layerUtil.md#getlayerids)
- [initLayer](utils_layerUtil.md#initlayer)
- [reloadData](utils_layerUtil.md#reloaddata)
- [replaceFeatures](utils_layerUtil.md#replacefeatures)
- [resizeFeature](utils_layerUtil.md#resizefeature)
- [setLayerVisibility](utils_layerUtil.md#setlayervisibility)
- [updateScaleDependentRendering](utils_layerUtil.md#updatescaledependentrendering)

## Functions

### createLayerGroupInfos

▸ **createLayerGroupInfos**(`config`): `void`

Create the layer group list

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`default`](../interfaces/types_AppConfig.default.md) | Application configuration to get the JSON URLs from. |

#### Returns

`void`

___

### fetchJsonData

▸ **fetchJsonData**(`jsonUrl`): `Promise`<`Graphic`[]\>

Fetches JSON data and converts them to graphics.

**`Throws`**

TypeError Thrown if the JSON is not in Esri features format.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jsonUrl` | `string` | URL for a JSON file |

#### Returns

`Promise`<`Graphic`[]\>

An array of Graphic objects.

___

### getFeature

▸ **getFeature**(`uniqueValue`, `groupId`, `map`): `Promise`<`undefined` \| `Graphic`\>

Get a feature from the layer group.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uniqueValue` | `string` \| `number` | Value from the unique field specified in the layerGroups. |
| `groupId` | `string` | ID of the layer group (type). If the specified group has more than one layer, query is done against the first layer only. |
| `map` | `Map` | ESRI map object |

#### Returns

`Promise`<`undefined` \| `Graphic`\>

Graphic or nothing

___

### getLayerIds

▸ **getLayerIds**(`groupId`): `string`[]

Get layer IDs from the layer group ID

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `groupId` | `string` | ID of the layer group |

#### Returns

`string`[]

array of layer IDs

___

### initLayer

▸ **initLayer**(`layerId`, `layerTitle`, `renderer`, `fields`, `geometryType`, `visible`, `graphics?`, `definitionExpression?`): `Promise`<`FeatureLayer`\>

Initialize a feature layer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `layerId` | `string` | Layer ID |
| `layerTitle` | `string` | Title |
| `renderer` | `Renderer` | Renderer |
| `fields` | `Field`[] | Array of field |
| `geometryType` | ``"point"`` \| ``"multipoint"`` \| ``"polyline"`` \| ``"polygon"`` | geometry type |
| `visible` | `boolean` | default visibility |
| `graphics?` | `Graphic`[] | (Optional) Array of graphics to load |
| `definitionExpression?` | `string` | Selection expression. |

#### Returns

`Promise`<`FeatureLayer`\>

Promise<FeatureLayer>

___

### reloadData

▸ **reloadData**(`jsonUrl`, `layer`): `Promise`<`undefined` \| [`default`](../classes/types_LayerInfo.default.md)\>

Reloads the data for a layer from the JSON URL.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jsonUrl` | `string` | URL of JSON data |
| `layer` | `undefined` \| `FeatureLayer` | A feature Layer |

#### Returns

`Promise`<`undefined` \| [`default`](../classes/types_LayerInfo.default.md)\>

Either a LayerInfo or undefined.

___

### replaceFeatures

▸ **replaceFeatures**(`layer`, `newFeatures`): `Promise`<`void`\>

Replaces the features in a feature layer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `layer` | `FeatureLayer` | A feature layer |
| `newFeatures` | `Graphic`[] | The new features that will replace the current ones. |

#### Returns

`Promise`<`void`\>

___

### resizeFeature

▸ **resizeFeature**(`graphic`): `void`

Resizes a graphic

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `graphic` | `Graphic` | A graphic |

#### Returns

`void`

___

### setLayerVisibility

▸ **setLayerVisibility**(`layer`, `layerInfo`, `visible`): `Promise`<[`LayerStatus`](../enums/types_LayerInfo.LayerStatus.md)\>

Set the visibility of the specified layer in the layer list.
NOTE: The layer list need to be committed to the state store.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `layer` | `Layer` | Layer |
| `layerInfo` | [`default`](../classes/types_LayerInfo.default.md) | LayerInfo |
| `visible` | `boolean` | visibility: true/false |

#### Returns

`Promise`<[`LayerStatus`](../enums/types_LayerInfo.LayerStatus.md)\>

Layer status

___

### updateScaleDependentRendering

▸ **updateScaleDependentRendering**(`layer`, `scale`): `void`

Updates scale dependent rendering.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `layer` | `FeatureLayer` | layer |
| `scale` | `number` | scale |

#### Returns

`void`
