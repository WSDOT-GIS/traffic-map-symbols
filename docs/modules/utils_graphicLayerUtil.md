[wsdot-travel-center-map](../README.md) / utils/graphicLayerUtil

# Module: utils/graphicLayerUtil

## Table of contents

### Functions

- [addGraphicsByType](utils_graphicLayerUtil.md#addgraphicsbytype)
- [buildGraphicsByType](utils_graphicLayerUtil.md#buildgraphicsbytype)
- [displayPointInteractionGraphics](utils_graphicLayerUtil.md#displaypointinteractiongraphics)
- [hidePointInteractionGraphics](utils_graphicLayerUtil.md#hidepointinteractiongraphics)
- [removeGraphicsByType](utils_graphicLayerUtil.md#removegraphicsbytype)

## Functions

### addGraphicsByType

▸ **addGraphicsByType**(`graphicType`, `graphic`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `graphicType` | `string` |
| `graphic` | `Graphic` |

#### Returns

`void`

#### Defined in

src/utils/graphicLayerUtil.ts:70

___

### buildGraphicsByType

▸ **buildGraphicsByType**(`type`, `data`): `Graphic`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | The type of data being passed: "coordinates" or "CIMSymbol" |
| `data` | `any` | The data object |

#### Returns

`Graphic`

A graphic

#### Defined in

src/utils/graphicLayerUtil.ts:21

___

### displayPointInteractionGraphics

▸ **displayPointInteractionGraphics**(`layerId`, `map`, `targetField`, `targetValue`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerId` | `string` |
| `map` | `Map` |
| `targetField` | `string` |
| `targetValue` | `undefined` \| `string` \| `number` |

#### Returns

`void`

#### Defined in

src/utils/graphicLayerUtil.ts:80

___

### hidePointInteractionGraphics

▸ **hidePointInteractionGraphics**(`layerId`, `map`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `layerId` | `string` |
| `map` | `Map` |

#### Returns

`void`

#### Defined in

src/utils/graphicLayerUtil.ts:100

___

### removeGraphicsByType

▸ **removeGraphicsByType**(`graphicType`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `graphicType` | `string` |

#### Returns

`void`

#### Defined in

src/utils/graphicLayerUtil.ts:114
