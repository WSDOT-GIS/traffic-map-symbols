[wsdot-travel-center-map](../README.md) / utils/themeUtil

# Module: utils/themeUtil

This module is for detecting temporary themes on the main WSDOT public
website, e.g., "Go Orange".

This file was copied from https://github.com/WSDOT-GIS/WsdotThemeUtils.
If you need to update this module, please update that version as well.

## Table of contents

### Variables

- [SAFETY\_CSS\_SELECTOR](utils_themeUtil.md#safety_css_selector)

### Functions

- [detectGoOrange](utils_themeUtil.md#detectgoorange)
- [detectThemeCss](utils_themeUtil.md#detectthemecss)

## Variables

### SAFETY\_CSS\_SELECTOR

• `Const` **SAFETY\_CSS\_SELECTOR**: ``"link[href*='safety.css'][rel='stylesheet']"``

#### Defined in

src/utils/themeUtil.ts:11

## Functions

### detectGoOrange

▸ **detectGoOrange**(`url?`, `selector?`): `Promise`<``null`` \| `NodeListOf`<`Element`\>\>

Fetches a webpage and looks for specific CSS links.

**`Example`**

//#region set theme and relevant colors
```typescript
import {detectGoOrange} from './utils/themeUtil';

detectGoOrange().then((goOrangeResponse)=>{//apply go orange theme
    if(goOrangeResponse){
        document.documentElement.style.setProperty('--color-primaryBrand100', '#FF6A13')
        document.documentElement.style.setProperty('--color-primaryBrand80', '#FF8842')
        document.documentElement.style.setProperty('--color-footerBackground', '#FF8F4E')
        document.documentElement.style.setProperty('--color-themeText', '#1d252dE')
        store.commit("setTheme","Go Orange")
    }
})
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `url` | `string` | `"https://www.wsdot.wa.gov"` | URL to search for go orange CSS links |
| `selector` | `string` | `SAFETY_CSS_SELECTOR` | CSS selector that will be used with Document.querySelectorAll |

#### Returns

`Promise`<``null`` \| `NodeListOf`<`Element`\>\>

Returns an array of links that match, or null if no matching CSS links were found in the document.

#### Defined in

src/utils/themeUtil.ts:35

___

### detectThemeCss

▸ **detectThemeCss**<`T`\>(`markup`, `selector?`): ``null`` \| `NodeListOf`<`T`\>

Looks for specific CSS links in an HTML document.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Element` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `markup` | `string` | `undefined` | HTML markup that will be parsed by DomParser |
| `selector` | `string` | `SAFETY_CSS_SELECTOR` | CSS selector that will be used with Document.querySelectorAll |

#### Returns

``null`` \| `NodeListOf`<`T`\>

Returns a [https://developer.mozilla.org/en-US/docs/Web/API/NodeList|NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList|NodeList) of links that match, or null if no matching CSS links were found in the document.

#### Defined in

src/utils/themeUtil.ts:50
