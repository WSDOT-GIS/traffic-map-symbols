[wsdot-travel-center-map](../README.md) / layers/Basemaps

# Module: layers/Basemaps

## Table of contents

### Functions

- [getBasemapInfo](layers_Basemaps.md#getbasemapinfo)
- [getDefaultBasemapInfo](layers_Basemaps.md#getdefaultbasemapinfo)
- [initBasemap](layers_Basemaps.md#initbasemap)
- [toggleBasemapInfo](layers_Basemaps.md#togglebasemapinfo)
- [validateBasemapName](layers_Basemaps.md#validatebasemapname)

## Functions

### getBasemapInfo

▸ **getBasemapInfo**(`name`): [`default`](../interfaces/types_BasemapInfo.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`default`](../interfaces/types_BasemapInfo.default.md)

___

### getDefaultBasemapInfo

▸ **getDefaultBasemapInfo**(): [`default`](../interfaces/types_BasemapInfo.default.md)

#### Returns

[`default`](../interfaces/types_BasemapInfo.default.md)

___

### initBasemap

▸ **initBasemap**(`basemapUrl`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `basemapUrl` | `string` |

#### Returns

`Promise`<`void`\>

___

### toggleBasemapInfo

▸ **toggleBasemapInfo**(`currentName`): [`default`](../interfaces/types_BasemapInfo.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `currentName` | `string` |

#### Returns

[`default`](../interfaces/types_BasemapInfo.default.md)

___

### validateBasemapName

▸ **validateBasemapName**(`name`): `boolean`

Make sure the base map name is valid...

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`
