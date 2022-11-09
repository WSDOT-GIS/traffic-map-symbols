[wsdot-travel-center-map](../README.md) / [store](../modules/store.md) / State

# Interface: State

[store](../modules/store.md).State

## Table of contents

### Properties

- [appTheme](store.State.md#apptheme)
- [basemap](store.State.md#basemap)
- [center](store.State.md#center)
- [currentExtent](store.State.md#currentextent)
- [errors](store.State.md#errors)
- [initializingMessage](store.State.md#initializingmessage)
- [isInitializing](store.State.md#isinitializing)
- [isLoading](store.State.md#isloading)
- [isMobileMenuOpen](store.State.md#ismobilemenuopen)
- [isToastReady](store.State.md#istoastready)
- [layerList](store.State.md#layerlist)
- [leftPaneIsOpen](store.State.md#leftpaneisopen)
- [mapSize](store.State.md#mapsize)
- [mediaSize](store.State.md#mediasize)
- [pointerX](store.State.md#pointerx)
- [pointerY](store.State.md#pointery)
- [scale](store.State.md#scale)
- [serviceAlerts](store.State.md#servicealerts)
- [serviceAlertsBannerVisible](store.State.md#servicealertsbannervisible)
- [userLocation](store.State.md#userlocation)

## Properties

### appTheme

• **appTheme**: `string`

#### Defined in

src/store.ts:38

___

### basemap

• **basemap**: `string`

#### Defined in

src/store.ts:18

___

### center

• **center**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Defined in

src/store.ts:22

___

### currentExtent

• **currentExtent**: [`default`](types_ExtentInfo.default.md)

#### Defined in

src/store.ts:25

___

### errors

• **errors**: `string`[]

#### Defined in

src/store.ts:34

___

### initializingMessage

• **initializingMessage**: `string`

#### Defined in

src/store.ts:30

___

### isInitializing

• **isInitializing**: `boolean`

#### Defined in

src/store.ts:28

___

### isLoading

• **isLoading**: `boolean`

#### Defined in

src/store.ts:29

___

### isMobileMenuOpen

• **isMobileMenuOpen**: `boolean`

#### Defined in

src/store.ts:27

___

### isToastReady

• **isToastReady**: `boolean`

#### Defined in

src/store.ts:37

___

### layerList

• **layerList**: [`default`](../classes/types_LayerInfo.default.md)[]

#### Defined in

src/store.ts:24

___

### leftPaneIsOpen

• **leftPaneIsOpen**: `boolean`

#### Defined in

src/store.ts:31

___

### mapSize

• **mapSize**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `number` |
| `width` | `number` |

#### Defined in

src/store.ts:21

___

### mediaSize

• **mediaSize**: ``"s"`` \| ``"l"``

s: small, l:large

#### Defined in

src/store.ts:33

___

### pointerX

• **pointerX**: `number`

#### Defined in

src/store.ts:19

___

### pointerY

• **pointerY**: `number`

#### Defined in

src/store.ts:20

___

### scale

• **scale**: `number`

#### Defined in

src/store.ts:23

___

### serviceAlerts

• **serviceAlerts**: `string`[]

#### Defined in

src/store.ts:35

___

### serviceAlertsBannerVisible

• **serviceAlertsBannerVisible**: `boolean`

#### Defined in

src/store.ts:36

___

### userLocation

• **userLocation**: ``null`` \| `number`[]

#### Defined in

src/store.ts:26
