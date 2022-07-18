[wsdot-travel-center-map](../README.md) / utils/typeUtil

# Module: utils/typeUtil

## Table of contents

### Type Aliases

- [EsriFeatures](utils_typeUtil.md#esrifeatures)
- [EsriRows](utils_typeUtil.md#esrirows)

### Functions

- [isEsriFeatures](utils_typeUtil.md#isesrifeatures)
- [isEsriRows](utils_typeUtil.md#isesrirows)

## Type Aliases

### EsriFeatures

Ƭ **EsriFeatures**: `Object`

Represents results of a feature layer query.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `features` | { `attributes`: `Record`<`string`, `unknown`\> ; `geometry`: `unknown`  }[] |
| `spatialReference` | { `latestWkid`: `number` ; `wkid`: `number`  } |
| `spatialReference.latestWkid` | `number` |
| `spatialReference.wkid` | `number` |

#### Defined in

src/utils/typeUtil.ts:11

___

### EsriRows

Ƭ **EsriRows**: `Object`

Represents rows returned from an Esri query.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `features` | { `attributes`: `Record`<`string`, `unknown`\>  }[] |

#### Defined in

src/utils/typeUtil.ts:4

## Functions

### isEsriFeatures

▸ **isEsriFeatures**(`obj`): obj is EsriFeatures

Determines if an object represents Esri formatted features by checking the following
- Contains a "features" property which is an array.
- Contains a "spatialReference" property
- Each object in "features" contains:
     - "attributes"
     - "geometry"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `any` | An object to be tested. |

#### Returns

obj is EsriFeatures

Returns true if it the object is an [EsriFeatures](utils_typeUtil.md#esrifeatures) object, false otherwise.

___

### isEsriRows

▸ **isEsriRows**(`obj`): obj is EsriRows

Determines if an object is an [EsriRows](utils_typeUtil.md#esrirows).
- Contains "features" property.
- "features" is an array
- Every item in "features" has an "attributes" property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `any` | An object to be tested. |

#### Returns

obj is EsriRows

True if object is [EsriRows](utils_typeUtil.md#esrirows), false otherwise.
