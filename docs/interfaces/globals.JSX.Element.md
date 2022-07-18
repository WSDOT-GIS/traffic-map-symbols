[wsdot-travel-center-map](../README.md) / [globals](../modules/globals.md) / [JSX](../modules/globals.JSX.md) / Element

# Interface: Element

[globals](../modules/globals.md).[JSX](../modules/globals.JSX.md).Element

## Hierarchy

- `VNode`

  ↳ **`Element`**

## Table of contents

### Properties

- [anchor](globals.JSX.Element.md#anchor)
- [appContext](globals.JSX.Element.md#appcontext)
- [children](globals.JSX.Element.md#children)
- [component](globals.JSX.Element.md#component)
- [dirs](globals.JSX.Element.md#dirs)
- [el](globals.JSX.Element.md#el)
- [key](globals.JSX.Element.md#key)
- [patchFlag](globals.JSX.Element.md#patchflag)
- [props](globals.JSX.Element.md#props)
- [ref](globals.JSX.Element.md#ref)
- [scopeId](globals.JSX.Element.md#scopeid)
- [shapeFlag](globals.JSX.Element.md#shapeflag)
- [suspense](globals.JSX.Element.md#suspense)
- [target](globals.JSX.Element.md#target)
- [targetAnchor](globals.JSX.Element.md#targetanchor)
- [transition](globals.JSX.Element.md#transition)
- [type](globals.JSX.Element.md#type)

## Properties

### anchor

• **anchor**: ``null`` \| `RendererNode`

#### Inherited from

VNode.anchor

#### Defined in

node_modules/@vue/runtime-core/dist/runtime-core.d.ts:1848

___

### appContext

• **appContext**: ``null`` \| `AppContext`

#### Inherited from

VNode.appContext

#### Defined in

node_modules/@vue/runtime-core/dist/runtime-core.d.ts:1859

___

### children

• **children**: `VNodeNormalizedChildren`

#### Inherited from

VNode.children

#### Defined in

node_modules/@vue/runtime-core/dist/runtime-core.d.ts:1843

___

### component

• **component**: ``null`` \| `ComponentInternalInstance`

#### Inherited from

VNode.component

#### Defined in

node_modules/@vue/runtime-core/dist/runtime-core.d.ts:1844

___

### dirs

• **dirs**: ``null`` \| `DirectiveBinding`<`any`\>[]

#### Inherited from

VNode.dirs

#### Defined in

node_modules/@vue/runtime-core/dist/runtime-core.d.ts:1845

___

### el

• **el**: ``null`` \| `RendererNode`

#### Inherited from

VNode.el

#### Defined in

node_modules/@vue/runtime-core/dist/runtime-core.d.ts:1847

___

### key

• **key**: ``null`` \| `string` \| `number` \| `symbol`

#### Inherited from

VNode.key

#### Defined in

node_modules/@vue/runtime-core/dist/runtime-core.d.ts:1835

___

### patchFlag

• **patchFlag**: `number`

#### Inherited from

VNode.patchFlag

#### Defined in

node_modules/@vue/runtime-core/dist/runtime-core.d.ts:1856

___

### props

• **props**: ``null`` \| `VNodeProps` & { `[key: string]`: `any`;  }

#### Inherited from

VNode.props

#### Defined in

node_modules/@vue/runtime-core/dist/runtime-core.d.ts:1834

___

### ref

• **ref**: ``null`` \| `VNodeNormalizedRef`

#### Inherited from

VNode.ref

#### Defined in

node_modules/@vue/runtime-core/dist/runtime-core.d.ts:1836

___

### scopeId

• **scopeId**: ``null`` \| `string`

SFC only. This is assigned on vnode creation using currentScopeId
which is set alongside currentRenderingInstance.

#### Inherited from

VNode.scopeId

#### Defined in

node_modules/@vue/runtime-core/dist/runtime-core.d.ts:1841

___

### shapeFlag

• **shapeFlag**: `number`

#### Inherited from

VNode.shapeFlag

#### Defined in

node_modules/@vue/runtime-core/dist/runtime-core.d.ts:1855

___

### suspense

• **suspense**: ``null`` \| `SuspenseBoundary`

#### Inherited from

VNode.suspense

#### Defined in

node_modules/@vue/runtime-core/dist/runtime-core.d.ts:1852

___

### target

• **target**: ``null`` \| `RendererElement`

#### Inherited from

VNode.target

#### Defined in

node_modules/@vue/runtime-core/dist/runtime-core.d.ts:1849

___

### targetAnchor

• **targetAnchor**: ``null`` \| `RendererNode`

#### Inherited from

VNode.targetAnchor

#### Defined in

node_modules/@vue/runtime-core/dist/runtime-core.d.ts:1850

___

### transition

• **transition**: ``null`` \| `TransitionHooks`<`RendererElement`\>

#### Inherited from

VNode.transition

#### Defined in

node_modules/@vue/runtime-core/dist/runtime-core.d.ts:1846

___

### type

• **type**: `VNodeTypes`

#### Inherited from

VNode.type

#### Defined in

node_modules/@vue/runtime-core/dist/runtime-core.d.ts:1833
