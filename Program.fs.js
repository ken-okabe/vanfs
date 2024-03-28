import { add, tags } from "./van-api/fs/basic.fs.js";
import { componentTags } from "./van-api/fs/web-components.fs.js";
import { nextT, logT, bindT, Timeline } from "./van-api/fs/timeline.fs.js";
import { singleton, ofArray } from "./fable_modules/fable-library-js.4.16.0/List.js";

export const div = (() => {
    const clo = tags.div;
    return clo;
})();

export const h2 = (() => {
    const clo = tags.h1;
    return clo;
})();

export const icon = (() => {
    const clo = componentTags["md-icon"];
    return clo;
})();

export const iconButton = (() => {
    const clo = componentTags["md-icon-button"];
    return clo;
})();

export function Counter(_arg) {
    const counter = Timeline(0);
    bindT(logT, counter);
    return div(ofArray([h2(ofArray(["❤️ ", counter.el])), iconButton(ofArray([{
        onclick: (_arg_1) => nextT(counter.lastVal + 1, counter),
    }, icon(singleton("thumb_up"))])), iconButton(ofArray([{
        onclick: (_arg_2) => nextT(counter.lastVal - 1, counter),
    }, icon(singleton("thumb_down"))]))]));
}

add(ofArray([document.body, Counter(void 0)]));

