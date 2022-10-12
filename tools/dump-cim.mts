import * as symbols from "../src/symbols/index";


for (const key in symbols) {
    if (Object.prototype.hasOwnProperty.call(symbols, key)) {
        const element = (symbols as never)[key];
        console.log(key, element)
    }
}

// for (const name of Object.keys(symbols)) {
//     console.log(name);
//     const s = (symbols as any)[name];
//     console.log(JSON.stringify(s));
// }