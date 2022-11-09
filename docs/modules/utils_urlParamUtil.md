[wsdot-travel-center-map](../README.md) / utils/urlParamUtil

# Module: utils/urlParamUtil

## Table of contents

### Functions

- [getBasemapFromUrl](utils_urlParamUtil.md#getbasemapfromurl)
- [getExtentFromUrl](utils_urlParamUtil.md#getextentfromurl)
- [getFeatureIdFromUrl](utils_urlParamUtil.md#getfeatureidfromurl)
- [getFeatureTypeFromUrl](utils_urlParamUtil.md#getfeaturetypefromurl)
- [getLayerVisibilityFromUrl](utils_urlParamUtil.md#getlayervisibilityfromurl)
- [validateAreaName](utils_urlParamUtil.md#validateareaname)
- [validateLayerName](utils_urlParamUtil.md#validatelayername)

## Functions

### getBasemapFromUrl

▸ **getBasemapFromUrl**(): [`default`](../interfaces/types_BasemapInfo.default.md)

#### Returns

[`default`](../interfaces/types_BasemapInfo.default.md)

#### Defined in

src/utils/urlParamUtil.ts:333

___

### getExtentFromUrl

▸ **getExtentFromUrl**(`route`): `Promise`<`Extent`\>

Assign extent if it is specified.
Check namedextent property first, then check the extent property, if nothing or invalid, return full state.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `route` | `RouteLocationNormalizedLoaded` | Vue route URL object. |

#### Returns

`Promise`<`Extent`\>

Returns the extent specified in the URL if available, or "full" if not specified or invalid.

#### Defined in

src/utils/urlParamUtil.ts:247

___

### getFeatureIdFromUrl

▸ **getFeatureIdFromUrl**(`route`): ``null`` \| `string`

Get feature ID from a URL.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `route` | `RouteLocationNormalizedLoaded` | Route URL |

#### Returns

``null`` \| `string`

Returns a feature ID string if one was found, null otherwise.

#### Defined in

src/utils/urlParamUtil.ts:191

___

### getFeatureTypeFromUrl

▸ **getFeatureTypeFromUrl**(`route`): ``null`` \| `string`

Get feature type based on the URL.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `route` | `RouteLocationNormalizedLoaded` | Vue route object |

#### Returns

``null`` \| `string`

Returns a feature type string if one can be determined from the URL. 
Otherwise, returns null.

#### Defined in

src/utils/urlParamUtil.ts:208

___

### getLayerVisibilityFromUrl

▸ **getLayerVisibilityFromUrl**(`route`): `Object`

Get layer IDs of layers that should be visible from URL

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `route` | `RouteLocationNormalizedLoaded` | URL routing |

#### Returns

`Object`

object of visible and invisible layer ID arrays

| Name | Type |
| :------ | :------ |
| `invisible` | `string`[] |
| `visible` | `string`[] |

#### Defined in

src/utils/urlParamUtil.ts:107

___

### validateAreaName

▸ **validateAreaName**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

src/utils/urlParamUtil.ts:325

___

### validateLayerName

▸ **validateLayerName**(`name`): `boolean`

Check to make sure the ID is valid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the name of a layer |

#### Returns

`boolean`

Returns true if valid, false otherwise.

#### Defined in

src/utils/urlParamUtil.ts:173
