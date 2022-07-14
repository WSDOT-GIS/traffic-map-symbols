[wsdot-travel-center-map](../README.md) / utils/alertInfoUtil

# Module: utils/alertInfoUtil

## Table of contents

### Functions

- [getFerryAlerts](utils_alertInfoUtil.md#getferryalerts)
- [getStateAlerts](utils_alertInfoUtil.md#getstatealerts)
- [initFerryAlerts](utils_alertInfoUtil.md#initferryalerts)
- [initStateAlerts](utils_alertInfoUtil.md#initstatealerts)
- [reloadFerryAlerts](utils_alertInfoUtil.md#reloadferryalerts)

## Functions

### getFerryAlerts

▸ **getFerryAlerts**(`routeId`): `Promise`<[`default`](../interfaces/types_FerryAlertInfo.default.md)[]\>

Get the ferry alerts corresponding to the given route ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `routeId` | `number` \| ``"all"`` | Route identifier. |

#### Returns

`Promise`<[`default`](../interfaces/types_FerryAlertInfo.default.md)[]\>

an array of FerryAlertInfo objects.

___

### getStateAlerts

▸ **getStateAlerts**(): `Promise`<[`default`](../interfaces/types_AlertInfo.default.md)[]\>

Gets the state alerts.

#### Returns

`Promise`<[`default`](../interfaces/types_AlertInfo.default.md)[]\>

___

### initFerryAlerts

▸ **initFerryAlerts**(`url`): `void`

Initialize the ferry alerts.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | Ferry alerts URL |

#### Returns

`void`

___

### initStateAlerts

▸ **initStateAlerts**(`url`): `void`

Initialize state alerts

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | State Alert URL |

#### Returns

`void`

___

### reloadFerryAlerts

▸ **reloadFerryAlerts**(`force?`): `Promise`<`void`\>

Reloads the ferry alerts.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `force?` | `boolean` | Forces the alerts to be reloaded even if they have already been loaded. |

#### Returns

`Promise`<`void`\>
