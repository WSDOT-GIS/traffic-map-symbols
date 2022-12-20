export interface CimObject extends Record<string, unknown> {
    type: `CIM${string}`;
}

export interface CimSymbol extends CimObject {
    type: `CIM${string}Symbol`
}

export interface CimSymbolReference extends CimObject {
    type: `CIMSymbolReference`;
    symbol: CimSymbol;
}

export interface CimSymbolDefinition {
    data: CimSymbolReference
}

export function isCimSymbolReference(item: Record<string, unknown>): item is CimSymbolReference {
    return Object.prototype.hasOwnProperty.call(item, "type") && item.type === "CIMSymbolReference";
}

export function isCimObject(item: Record<string, unknown>): item is CimObject {
    return Object.prototype.hasOwnProperty.call(item, "type") && item.type === "string" && /^CIM/.test(item.type);
}