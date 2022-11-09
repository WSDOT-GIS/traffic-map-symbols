[wsdot-travel-center-map](../README.md) / utils/clusterUtil

# Module: utils/clusterUtil

## Table of contents

### Variables

- [clusterConfig](utils_clusterUtil.md#clusterconfig)
- [clusterMaxScale](utils_clusterUtil.md#clustermaxscale)

### Functions

- [getClusterExtent](utils_clusterUtil.md#getclusterextent)
- [getIdsFromCluster](utils_clusterUtil.md#getidsfromcluster)

## Variables

### clusterConfig

• `Const` **clusterConfig**: `FeatureReductionCluster`

#### Defined in

src/utils/clusterUtil.ts:17

___

### clusterMaxScale

• `Const` **clusterMaxScale**: ``19000``

#### Defined in

src/utils/clusterUtil.ts:11

## Functions

### getClusterExtent

▸ **getClusterExtent**(`clusterGraphic`, `layer`, `mapView`): `Promise`<`Extent`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `clusterGraphic` | `Graphic` |
| `layer` | `FeatureLayer` |
| `mapView` | `MapView` |

#### Returns

`Promise`<`Extent`\>

#### Defined in

src/utils/clusterUtil.ts:184

___

### getIdsFromCluster

▸ **getIdsFromCluster**(`clusterGraphic`, `layer`, `mapView`, `maxCount?`): `Promise`<`Extent` \| `number`[]\>

Returns IDs of each feature if one of the following conditions is met:
- maxCount is not set 
- The number of features is less than the maxCount.
- All the features are at the identical location.
Otherwise returns extent of all features.
 *
 *

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `clusterGraphic` | `Graphic` | * |
| `layer` | `FeatureLayer` | * |
| `mapView` | `MapView` | * |
| `maxCount?` | `number` |  |

#### Returns

`Promise`<`Extent` \| `number`[]\>

#### Defined in

src/utils/clusterUtil.ts:131
