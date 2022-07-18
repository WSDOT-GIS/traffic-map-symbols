[wsdot-travel-center-map](../README.md) / store

# Module: store

## Table of contents

### Interfaces

- [State](../interfaces/store.State.md)

### Variables

- [key](store.md#key)
- [store](store.md#store)

### Functions

- [cloneProxyTarget](store.md#cloneproxytarget)
- [useStore](store.md#usestore)

## Variables

### key

• `Const` **key**: `InjectionKey`<`Store`<[`State`](../interfaces/store.State.md)\>\>

#### Defined in

src/store.ts:46

___

### store

• `Const` **store**: `Store`<[`State`](../interfaces/store.State.md)\>

#### Defined in

src/store.ts:48

## Functions

### cloneProxyTarget

▸ **cloneProxyTarget**<`T`\>(`proxy`): `T`

Clone the target of proxy (i.e. removing the reactivity)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `proxy` | `T` | The reactive object |

#### Returns

`T`

Non-reactive copy of the object

___

### useStore

▸ **useStore**(): `Store`<[`State`](../interfaces/store.State.md)\>

define custom useStore that supply key so do not have to do this in each component...

#### Returns

`Store`<[`State`](../interfaces/store.State.md)\>
