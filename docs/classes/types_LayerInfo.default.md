[wsdot-travel-center-map](../README.md) / [types/LayerInfo](../modules/types_LayerInfo.md) / default

# Class: default

[types/LayerInfo](../modules/types_LayerInfo.md).default

## Table of contents

### Constructors

- [constructor](types_LayerInfo.default.md#constructor)

### Properties

- [id](types_LayerInfo.default.md#id)
- [index](types_LayerInfo.default.md#index)
- [status](types_LayerInfo.default.md#status)
- [title](types_LayerInfo.default.md#title)
- [url](types_LayerInfo.default.md#url)
- [visible](types_LayerInfo.default.md#visible)

### Methods

- [isJson](types_LayerInfo.default.md#isjson)

## Constructors

### constructor

• **new default**(`id`, `title?`, `url?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `title?` | `string` |
| `url?` | `string` |

## Properties

### id

• `Readonly` **id**: `string`

#### Defined in

src/types/LayerInfo.ts:2

___

### index

• **index**: `number` = `-1`

#### Defined in

src/types/LayerInfo.ts:4

___

### status

• **status**: [`LayerStatus`](../enums/types_LayerInfo.LayerStatus.md) = `LayerStatus.NotLoaded`

#### Defined in

src/types/LayerInfo.ts:8

___

### title

• **title**: `string` = `""`

#### Defined in

src/types/LayerInfo.ts:3

___

### url

• **url**: `string` = `""`

#### Defined in

src/types/LayerInfo.ts:6

___

### visible

• **visible**: `undefined` \| `boolean`

#### Defined in

src/types/LayerInfo.ts:5

## Methods

### isJson

▸ **isJson**(): `boolean`

#### Returns

`boolean`
