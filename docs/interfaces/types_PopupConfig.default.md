[wsdot-travel-center-map](../README.md) / [types/PopupConfig](../modules/types_PopupConfig.md) / default

# Interface: default

[types/PopupConfig](../modules/types_PopupConfig.md).default

## Table of contents

### Properties

- [badgeText](types_PopupConfig.default.md#badgetext)
- [bannerText](types_PopupConfig.default.md#bannertext)
- [content](types_PopupConfig.default.md#content)
- [imageFieldName](types_PopupConfig.default.md#imagefieldname)
- [moreInfoURL](types_PopupConfig.default.md#moreinfourl)
- [paging](types_PopupConfig.default.md#paging)
- [subtitle](types_PopupConfig.default.md#subtitle)
- [title](types_PopupConfig.default.md#title)
- [weatherForecast](types_PopupConfig.default.md#weatherforecast)

## Properties

### badgeText

• `Optional` **badgeText**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `custom?` | (`feature`: [`default`](types_FeatureInfo.default.md)) => `string` |
| `fieldName?` | `string` |
| `text?` | `string` |

#### Defined in

src/types/PopupConfig.ts:14

___

### bannerText

• **bannerText**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `custom?` | (`feature`: [`default`](types_FeatureInfo.default.md)) => `string` |
| `fieldName?` | `string` |
| `text?` | `string` |

#### Defined in

src/types/PopupConfig.ts:8

___

### content

• **content**: [`default`](types_PopupRowConfig.default.md)[]

#### Defined in

src/types/PopupConfig.ts:28

___

### imageFieldName

• `Optional` **imageFieldName**: `string`

#### Defined in

src/types/PopupConfig.ts:26

___

### moreInfoURL

• `Optional` **moreInfoURL**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `custom?` | (`feature`: [`default`](types_FeatureInfo.default.md)) => [`default`](types_MoreInfoURLInfo.default.md) |
| `fieldName?` | `string` |
| `text?` | `string` |

#### Defined in

src/types/PopupConfig.ts:29

___

### paging

• `Optional` **paging**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `direction` | ``"horizontal"`` \| ``"vertical"`` |
| `maxPage` | `number` |

#### Defined in

src/types/PopupConfig.ts:34

___

### subtitle

• `Optional` **subtitle**: [`default`](types_PopupRowConfig.default.md)

#### Defined in

src/types/PopupConfig.ts:25

___

### title

• `Optional` **title**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `custom?` | (`feature`: [`default`](types_FeatureInfo.default.md)) => `string` |
| `fieldName?` | `string` |
| `isHTML?` | `boolean` |
| `text?` | `string` |

#### Defined in

src/types/PopupConfig.ts:19

___

### weatherForecast

• `Optional` **weatherForecast**: [`default`](types_ForecastListInfo.default.md)

#### Defined in

src/types/PopupConfig.ts:27
