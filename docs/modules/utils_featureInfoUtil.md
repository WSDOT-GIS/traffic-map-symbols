[wsdot-travel-center-map](../README.md) / utils/featureInfoUtil

# Module: utils/featureInfoUtil

## Table of contents

### Functions

- [getFeatureInfoById](utils_featureInfoUtil.md#getfeatureinfobyid)
- [getFeatureInfoByUniqueField](utils_featureInfoUtil.md#getfeatureinfobyuniquefield)
- [getFeatureInfosByIds](utils_featureInfoUtil.md#getfeatureinfosbyids)
- [getGraphicsInfoById](utils_featureInfoUtil.md#getgraphicsinfobyid)
- [getLineFromPointId](utils_featureInfoUtil.md#getlinefrompointid)

## Functions

### getFeatureInfoById

▸ **getFeatureInfoById**(`id`, `layer`): `Promise`<`undefined` \| [`default`](../interfaces/types_FeatureInfo.default.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `layer` | `FeatureLayer` |

#### Returns

`Promise`<`undefined` \| [`default`](../interfaces/types_FeatureInfo.default.md)\>

#### Defined in

src/utils/featureInfoUtil.ts:33

___

### getFeatureInfoByUniqueField

▸ **getFeatureInfoByUniqueField**(`fieldName`, `value`, `layer`): `Promise`<`undefined` \| [`default`](../interfaces/types_FeatureInfo.default.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fieldName` | `string` |
| `value` | `string` \| `number` |
| `layer` | `FeatureLayer` |

#### Returns

`Promise`<`undefined` \| [`default`](../interfaces/types_FeatureInfo.default.md)\>

#### Defined in

src/utils/featureInfoUtil.ts:78

___

### getFeatureInfosByIds

▸ **getFeatureInfosByIds**(`ids`, `layer`): `Promise`<[`default`](../interfaces/types_FeatureInfo.default.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ids` | `number`[] |
| `layer` | `FeatureLayer` |

#### Returns

`Promise`<[`default`](../interfaces/types_FeatureInfo.default.md)[]\>

#### Defined in

src/utils/featureInfoUtil.ts:50

___

### getGraphicsInfoById

▸ **getGraphicsInfoById**(`graphic`, `layer`): `Promise`<`undefined` \| [`default`](../interfaces/types_FeatureInfo.default.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `graphic` | `Graphic` |
| `layer` | `FeatureLayer` |

#### Returns

`Promise`<`undefined` \| [`default`](../interfaces/types_FeatureInfo.default.md)\>

#### Defined in

src/utils/featureInfoUtil.ts:15

___

### getLineFromPointId

▸ **getLineFromPointId**(`fieldName`, `value`, `layer`): `Promise`<`FeatureSet`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fieldName` | `string` |
| `value` | `string` \| `number` |
| `layer` | `FeatureLayer` |

#### Returns

`Promise`<`FeatureSet`\>

#### Defined in

src/utils/featureInfoUtil.ts:65
