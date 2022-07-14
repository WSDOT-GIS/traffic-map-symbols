[wsdot-travel-center-map](../README.md) / utils/cookieUtil

# Module: utils/cookieUtil

## Table of contents

### Functions

- [checkCookie](utils_cookieUtil.md#checkcookie)
- [deleteCookie](utils_cookieUtil.md#deletecookie)
- [getCookie](utils_cookieUtil.md#getcookie)
- [setCookie](utils_cookieUtil.md#setcookie)

## Functions

### checkCookie

▸ **checkCookie**(`name`): `boolean`

Checks to see if a cookie for the given name exits.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | A cookie name |

#### Returns

`boolean`

A boolean value indicating if the cookie exists.

___

### deleteCookie

▸ **deleteCookie**(`name`): `void`

Deletes the cookie corresponding to the input name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the cookie to delete. |

#### Returns

`void`

___

### getCookie

▸ **getCookie**(`name`): `string`

Gets a cookie matching the given name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of cookie. |

#### Returns

`string`

a string of the value corresponding to the given name.

___

### setCookie

▸ **setCookie**(`name`, `val`): `void`

Sets a cookie

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | name |
| `val` | `string` | value |

#### Returns

`void`
