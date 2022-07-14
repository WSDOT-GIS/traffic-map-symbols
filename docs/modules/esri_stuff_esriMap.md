[wsdot-travel-center-map](../README.md) / esri-stuff/esriMap

# Module: esri-stuff/esriMap

## Table of contents

### Interfaces

- [ZoomLevel](../interfaces/esri_stuff_esriMap.ZoomLevel.md)

### Variables

- [defaultLayerProps](esri_stuff_esriMap.md#defaultlayerprops)
- [mapView](esri_stuff_esriMap.md#mapview)
- [webmap](esri_stuff_esriMap.md#webmap)

### Functions

- [addOutOfExtentLayer](esri_stuff_esriMap.md#addoutofextentlayer)
- [checkPannedExtent](esri_stuff_esriMap.md#checkpannedextent)
- [getIdsFromCluster](esri_stuff_esriMap.md#getidsfromcluster)
- [getLayer](esri_stuff_esriMap.md#getlayer)
- [getLayers](esri_stuff_esriMap.md#getlayers)
- [getZoomLevel](esri_stuff_esriMap.md#getzoomlevel)
- [highlightFeature](esri_stuff_esriMap.md#highlightfeature)
- [init](esri_stuff_esriMap.md#init)
- [isLayer](esri_stuff_esriMap.md#islayer)
- [loadOperationalLayers](esri_stuff_esriMap.md#loadoperationallayers)
- [loadRegionalAlert](esri_stuff_esriMap.md#loadregionalalert)
- [panMap](esri_stuff_esriMap.md#panmap)
- [pixel2meter](esri_stuff_esriMap.md#pixel2meter)
- [refreshLayerData](esri_stuff_esriMap.md#refreshlayerdata)
- [removeHighlight](esri_stuff_esriMap.md#removehighlight)
- [toPoint](esri_stuff_esriMap.md#topoint)
- [toScreenXY](esri_stuff_esriMap.md#toscreenxy)
- [tryZoomToPoint](esri_stuff_esriMap.md#tryzoomtopoint)
- [tryZoomToPointAsync](esri_stuff_esriMap.md#tryzoomtopointasync)
- [validateLayerList](esri_stuff_esriMap.md#validatelayerlist)
- [zoomToExtent](esri_stuff_esriMap.md#zoomtoextent)
- [zoomToMax](esri_stuff_esriMap.md#zoomtomax)
- [zoomToMetroArea](esri_stuff_esriMap.md#zoomtometroarea)

## Variables

### defaultLayerProps

• `Const` **defaultLayerProps**: { `id`: `string` ; `visible`: `boolean`  }[] = `[]`

Store the default layer visibility. This is used by Saved Map function.

#### Defined in

src/esri-stuff/esriMap.ts:94

___

### mapView

• `Const` **mapView**: `MapView`

#### Defined in

src/esri-stuff/esriMap.ts:56

___

### webmap

• `Const` **webmap**: `Map`

#### Defined in

src/esri-stuff/esriMap.ts:53

## Functions

### addOutOfExtentLayer

▸ **addOutOfExtentLayer**(): `void`

Adds out of extent layer

#### Returns

`void`

___

### checkPannedExtent

▸ **checkPannedExtent**(`shiftX`, `shiftY`): ``"ii"`` \| ``"iw"`` \| ``"ie"`` \| ``"ni"`` \| ``"nw"`` \| ``"ne"`` \| ``"si"`` \| ``"sw"`` \| ``"se"``

Check the new extent after panning against the max extent allowed and report the direction from the extent.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shiftX` | `number` | Shift X |
| `shiftY` | `number` | Shift Y |

#### Returns

``"ii"`` \| ``"iw"`` \| ``"ie"`` \| ``"ni"`` \| ``"nw"`` \| ``"ne"`` \| ``"si"`` \| ``"sw"`` \| ``"se"``

A string matching the pattern /[ins][iwe]/
- First char: vertical direction = i/n/s (inside/north/south)
- Second char: horizontal direction = i/w/e (inside/west/east)

___

### getIdsFromCluster

▸ **getIdsFromCluster**(`clusterGraphic`, `layer`, `maxCount?`): `Promise`<`undefined` \| `number`[]\>

NOTE: This function only returns each feature if one of the following conditions is met:
- maxCount is not set  * 
- The number of features is less than the maxCount.
- All the features are at the identical location.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `clusterGraphic` | `Graphic` | Cluster Graphic |
| `layer` | `Layer` | Layer |
| `maxCount?` | `number` | Max count |

#### Returns

`Promise`<`undefined` \| `number`[]\>

An array of IDs or undefined

___

### getLayer

▸ **getLayer**(`id`): `Layer`

Gets the layer with the specified "id"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Layer ID |

#### Returns

`Layer`

A Layer.

___

### getLayers

▸ **getLayers**(): `Collection`<`Layer`\>

Gets the webmap layers.

#### Returns

`Collection`<`Layer`\>

A collection of layers.

___

### getZoomLevel

▸ **getZoomLevel**(`numLevelsFromMin`): [`ZoomLevel`](../interfaces/esri_stuff_esriMap.ZoomLevel.md)

Get the scale by the number levels from the minimum scale.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `numLevelsFromMin` | `number` | Number of levels from the minimum scale.   For example, 0 is the min scale. 3 is the fourth level from the min scale.  You can also specify number of levels from the maximum scale by using the negative value.  For example -1 is the max scale. -2 is the second level from the max scale. |

#### Returns

[`ZoomLevel`](../interfaces/esri_stuff_esriMap.ZoomLevel.md)

Zoom level information

___

### highlightFeature

▸ **highlightFeature**(`featureInfo`): `void`

Highlights the specified feature.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `featureInfo` | [`default`](../interfaces/types_FeatureInfo.default.md) | Feature info to be highlighted. |

#### Returns

`void`

___

### init

▸ **init**(`container`): `void`

Initialize the map view

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `container` | `HTMLDivElement` | Container HTML Element |

#### Returns

`void`

___

### isLayer

▸ **isLayer**(`layer`): layer is Layer

Type guard for the layer object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `layer` | `undefined` \| `Layer` | An object that may or may not be a layer. |

#### Returns

layer is Layer

A boolean indicating if the input is a layer.

___

### loadOperationalLayers

▸ **loadOperationalLayers**(): `Promise`<[`default`](../classes/types_LayerInfo.default.md)[]\>

Get config and get apiKey and URL, then initialize layers and add to map..

#### Returns

`Promise`<[`default`](../classes/types_LayerInfo.default.md)[]\>

The list of IDs of the layers that failed to load.

___

### loadRegionalAlert

▸ **loadRegionalAlert**(): `Promise`<[`default`](../classes/types_LayerInfo.default.md)[]\>

Load regional alert point and polygon layers separately from the other operational layers. 
Returns layer IDs of the layers that failed to load.

#### Returns

`Promise`<[`default`](../classes/types_LayerInfo.default.md)[]\>

___

### panMap

▸ **panMap**(`shiftX`, `shiftY`): `Promise`<`boolean` \| { `actualShift`: [`default`](../interfaces/types_XY.default.md)  }\>

Pan Map using GoTo()

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shiftX` | `number` | positive = pan east, negative = pan west |
| `shiftY` | `number` | Positive = pan south, negative = pan north |

#### Returns

`Promise`<`boolean` \| { `actualShift`: [`default`](../interfaces/types_XY.default.md)  }\>

If successful or exception, return true/false. Otherwise return the actual amount pan was panned.

___

### pixel2meter

▸ **pixel2meter**(`distancePixel`, `screenPoint?`, `mapPoint?`): `number`

Converts pixel to meters

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `distancePixel` | `number` | distance pixel |
| `screenPoint?` | [`default`](../interfaces/types_XY.default.md) | screen point |
| `mapPoint?` | `Point` | map point |

#### Returns

`number`

distance in meters

___

### refreshLayerData

▸ **refreshLayerData**(): `Promise`<[`default`](../classes/types_LayerInfo.default.md)[]\>

Reload data for some layers.

#### Returns

`Promise`<[`default`](../classes/types_LayerInfo.default.md)[]\>

___

### removeHighlight

▸ **removeHighlight**(): `void`

#### Returns

`void`

___

### toPoint

▸ **toPoint**(`mapX`, `mapY`): `Point`

Converts X and Y coordinates to a Point object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapX` | `number` | X |
| `mapY` | `number` | Y |

#### Returns

`Point`

a Point object.

___

### toScreenXY

▸ **toScreenXY**(`mapX`, `mapY`): `Object`

Converts map coordinates to screen coordinates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapX` | `number` | X coordinate |
| `mapY` | `number` | Y coordinate |

#### Returns

`Object`

a point object.

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

___

### tryZoomToPoint

▸ **tryZoomToPoint**(`point`, `numLevels?`): `boolean`

Attempts to zoom to a point

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `point` | `Point` | A point |
| `numLevels?` | `number` | The number of levels |

#### Returns

`boolean`

True if successful, false otherwise.

___

### tryZoomToPointAsync

▸ **tryZoomToPointAsync**(`point`, `zoomLevel`): `Promise`<`boolean`\>

Zoom centered at the specified location

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `point` | `Point` | The center location |
| `zoomLevel` | `number` | The zoom level to zoom into.  If numLevels is also specified, that will take precedence over this value. |

#### Returns

`Promise`<`boolean`\>

A boolean promise indicating of the zoom successfully occurred.

___

### validateLayerList

▸ **validateLayerList**(`list`): `Layer`[]

Filter out the layers that did not load.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `list` | (`undefined` \| `Layer`)[] | List of layers to validate |

#### Returns

`Layer`[]

An array of valid layers.

___

### zoomToExtent

▸ **zoomToExtent**(`extent`): `Promise`<`void`\>

Zooms to a given extent.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `extent` | `Extent` | An extent to zoom to. |

#### Returns

`Promise`<`void`\>

___

### zoomToMax

▸ **zoomToMax**(`point`): `Promise`<`void`\>

Zoom to the maximum level at the specified point.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `point` | `Point` | The point to zoom to |

#### Returns

`Promise`<`void`\>

___

### zoomToMetroArea

▸ **zoomToMetroArea**(`extent`): `void`

Zooms to the metro area of the given extent.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `extent` | `Extent` | An extent |

#### Returns

`void`
