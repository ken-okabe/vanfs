import { add, tags } from "./van-api/fs/basic.fs.js";
import { ofArray, singleton } from "./fable_modules/fable-library-js.4.16.0/List.js";

export const a = (() => {
    const clo = tags.a;
    return clo;
})();

export const p = (() => {
    const clo = tags.p;
    return clo;
})();

export const div = (() => {
    const clo = tags.div;
    return clo;
})();

export const ul = (() => {
    const clo = tags.ul;
    return clo;
})();

export const li = (() => {
    const clo = tags.li;
    return clo;
})();

export function Hello(_arg) {
    return div(ofArray([p(singleton("👋Hello")), ul(ofArray([li(singleton("🗺️World")), li(singleton(a(ofArray([{
        href: "https://vanjs.org/",
    }, "🍦VanJS"]))))]))]));
}

add(ofArray([document.body, Hello(void 0)]));

