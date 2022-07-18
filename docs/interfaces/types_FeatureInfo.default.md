[wsdot-travel-center-map](../README.md) / [types/FeatureInfo](../modules/types_FeatureInfo.md) / default

# Interface: default

[types/FeatureInfo](../modules/types_FeatureInfo.md).default

## Table of contents

### Properties

- [attributes](types_FeatureInfo.default.md#attributes)
- [id](types_FeatureInfo.default.md#id)
- [layerId](types_FeatureInfo.default.md#layerid)
- [mapPoint](types_FeatureInfo.default.md#mappoint)
- [relatedInfos](types_FeatureInfo.default.md#relatedinfos)

## Properties

### attributes

• **attributes**: `Object`

If simply specify "Object" for the type of the attributes property, get the error when try to get the value dynamically. 
Error: "Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Object'.
No index signature with a parameter of type 'string' was found on type 'Object'."

#### Index signature

▪ [key: `string`]: `string` \| `number` \| `undefined`

#### Defined in

src/types/FeatureInfo.ts:14

___

### id

• **id**: `number`

#### Defined in

src/types/FeatureInfo.ts:8

___

### layerId

• **layerId**: `string`

#### Defined in

src/types/FeatureInfo.ts:7

___

### mapPoint

• **mapPoint**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Defined in

src/types/FeatureInfo.ts:17

___

### relatedInfos

• `Optional` **relatedInfos**: [`default`](types_RowInfo.default.md)[]

Attributes from the related table.

#### Defined in

src/types/FeatureInfo.ts:16
