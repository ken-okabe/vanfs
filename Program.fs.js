import { add, tags } from "./van-api/fs/basic.fs.js";
import { Timeline } from "./van-api/fs/timeline-element.fs.js";
import { NullableT, NullableT$1 } from "./van-api/fs/x-nullable.fs.js";
import { nextTN, mapTN } from "./van-api/fs/x-timeline-element-nullable.fs.js";
import { ofArray, singleton } from "./fable_modules/fable-library-js.4.16.0/List.js";
import { equals } from "./fable_modules/fable-library-js.4.16.0/Util.js";

export const h4 = (() => {
    const clo = tags.h4;
    return clo;
})();

export const fluentCard = (() => {
    const clo = tags["fluent-card"];
    return clo;
})();

export const fluentTextField = (() => {
    const clo = tags["fluent-text-field"];
    return clo;
})();

export function Number$(_arg) {
    const number = Timeline(new NullableT$1(0, []));
    const numberX2 = mapTN((n) => NullableT(n * 2))(number);
    return fluentCard(ofArray([{
        class: "custom1",
    }, h4(singleton("Number")), fluentTextField(singleton({
        appearance: "outline",
        oninput: (e) => {
            const value = (e.target.value === "") ? (new NullableT$1(0, [])) : NullableT(e.target.value);
            if (equals(value, new NullableT$1(0, []))) {
                nextTN(new NullableT$1(0, []), numberX2);
                document.getElementById("output-field").value = "Null";
            }
            nextTN(value, number);
        },
        placeholder: "1",
        required: true,
        type: "number",
    })), h4(singleton("Number × 2")), fluentTextField(singleton({
        appearance: "outline",
        id: "output-field",
        readonly: true,
        value: numberX2.el,
    }))]));
}

add(ofArray([document.body, Number$(void 0)]));

