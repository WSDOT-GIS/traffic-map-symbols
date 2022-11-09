[wsdot-travel-center-map](../README.md) / utils/miscUtil

# Module: utils/miscUtil

## Table of contents

### Variables

- [WebMercator](utils_miscUtil.md#webmercator)
- [formattedEpochRe](utils_miscUtil.md#formattedepochre)

### Functions

- [fetchJson](utils_miscUtil.md#fetchjson)
- [formatEpoch](utils_miscUtil.md#formatepoch)
- [getGuid](utils_miscUtil.md#getguid)
- [getMediaSize](utils_miscUtil.md#getmediasize)
- [hasParent](utils_miscUtil.md#hasparent)
- [hasParentClass](utils_miscUtil.md#hasparentclass)

## Variables

### WebMercator

• `Const` **WebMercator**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `wkid` | `number` |

#### Defined in

src/utils/miscUtil.ts:90

___

### formattedEpochRe

• `Const` **formattedEpochRe**: `RegExp`

Miscellaneous utilities

#### Defined in

src/utils/miscUtil.ts:5

## Functions

### fetchJson

▸ **fetchJson**(`url`, `isUnicode?`): `Promise`<`unknown`\>

Fetches JSON from a URL.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | JSON URL |
| `isUnicode?` | `boolean` | Indicates if JSON is in utf-8 (true) or "windows-1252" (false) |

#### Returns

`Promise`<`unknown`\>

An object parsed from the JSON data.

#### Defined in

src/utils/miscUtil.ts:54

___

### formatEpoch

▸ **formatEpoch**(`epoch`, `isTime?`): `string`

Formats an epoch.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `epoch` | `number` | Epoch |
| `isTime?` | `boolean` | Indicates if the epoch is a time. |

#### Returns

`string`

epoch as a string. MM/DD/YYYY HH:mm  {AM|PM}

#### Defined in

src/utils/miscUtil.ts:14

___

### getGuid

▸ **getGuid**(): `string`

Generates a GUID

#### Returns

`string`

a GUID

#### Defined in

src/utils/miscUtil.ts:143

___

### getMediaSize

▸ **getMediaSize**(): ``"s"`` \| ``"l"``

Determines the media size

#### Returns

``"s"`` \| ``"l"``

s: small, l:large (add more as needed)

#### Defined in

src/utils/miscUtil.ts:80

___

### hasParent

▸ **hasParent**(`child`, `id`): `boolean`

Determines if the HTML element has a parent with the given "id" attribute.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `child` | `HTMLElement` | An HTML element |
| `id` | `string` | An "id" attribute value. |

#### Returns

`boolean`

a boolean indicating if the parent is present.

#### Defined in

src/utils/miscUtil.ts:123

___

### hasParentClass

▸ **hasParentClass**(`child`, `classname`): `boolean`

Determines if the HTML element has a parent with a specific class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `child` | ``null`` \| `Element` | HTML element |
| `classname` | `string` | CSS class name |

#### Returns

`boolean`

true or false indicating if the element's parent is in this class.

#### Defined in

src/utils/miscUtil.ts:100
