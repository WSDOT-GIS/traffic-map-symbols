[wsdot-travel-center-map](../README.md) / layers/ZoomExtentLayer

# Module: layers/ZoomExtentLayer

## Table of contents

### Variables

- [default](layers_ZoomExtentLayer.md#default)
- [layerId](layers_ZoomExtentLayer.md#layerid)

### Functions

- [getFeatureById](layers_ZoomExtentLayer.md#getfeaturebyid)
- [getFeatureByName](layers_ZoomExtentLayer.md#getfeaturebyname)
- [validateName](layers_ZoomExtentLayer.md#validatename)

## Variables

### default

• `Const` **default**: `FeatureLayer`

#### Defined in

src/layers/ZoomExtentLayer.ts:106

___

### layerId

• `Const` **layerId**: ``"zoom-areas-layer"``

#### Defined in

src/layers/ZoomExtentLayer.ts:105

## Functions

### getFeatureById

▸ **getFeatureById**(`id`): `Promise`<`Graphic`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |

#### Returns

`Promise`<`Graphic`\>

#### Defined in

src/layers/ZoomExtentLayer.ts:145

___

### getFeatureByName

▸ **getFeatureByName**(`name`): `Promise`<`Graphic`\>

Get the extent feature by name.
Note: Case insensitive

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of the extent area |

#### Returns

`Promise`<`Graphic`\>

Returns the extent feature (graphic).

#### Defined in

src/layers/ZoomExtentLayer.ts:162

___

### validateName

▸ **validateName**(`name`): `boolean`

Check to make sure the name is valid. 
NOTE: Case insensitive

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of the extent area |

#### Returns

`boolean`

Returns true if the name is valid, false otherwise.

#### Defined in

src/layers/ZoomExtentLayer.ts:180
