import { add, tags } from "./van-api/fs/basic.fs.js";
import { TLE_last, TLE_next, TLE_map, TimelineE } from "./van-api/fs/timelineElement.fs.js";
import { some } from "./fable_modules/fable-library-js.4.24.0/Option.js";
import { singleton, ofArray } from "./fable_modules/fable-library-js.4.24.0/List.js";

export const div = (() => {
    const clo = tags.div;
    return clo;
})();

export const h2 = (() => {
    const clo = tags.h2;
    return clo;
})();

export const icon = (() => {
    const clo = tags["md-icon"];
    return clo;
})();

export const iconButton = (() => {
    const clo = tags["md-icon-button"];
    return clo;
})();

export function Counter(_arg) {
    const counter = TimelineE(0);
    TLE_map((value) => {
        console.log(some(`Counter: ${value}`));
    }, counter);
    return div(ofArray([h2(ofArray(["❤️ ", counter.el])), iconButton(ofArray([{
        onclick: (_arg_1) => {
            TLE_next(TLE_last(counter) + 1, counter);
        },
    }, icon(singleton("thumb_up"))])), iconButton(ofArray([{
        onclick: (_arg_2) => {
            TLE_next(TLE_last(counter) - 1, counter);
        },
    }, icon(singleton("thumb_down"))]))]));
}

add(ofArray([document.body, Counter(undefined)]));

