import { add, tags } from "./van-api/fs/basic.fs.js";
import { Timeline } from "./van-api/fs/timeline-element.fs.js";
import { nextTN, mapTN, Null } from "./van-api/fs/x-timeline-nullable-element.fs.js";
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
    const number = Timeline(Null());
    const numberX2 = mapTN((n) => (n * 2))(number);
    return fluentCard(ofArray([{
        class: "custom1",
    }, h4(singleton("Number")), fluentTextField(singleton({
        appearance: "outline",
        oninput: (e) => {
            const value = (e.target.value === "") ? Null() : e.target.value;
            if (equals(value, Null())) {
                nextTN(Null(), numberX2);
                document.getElementById("output-field").value = "";
            }
            nextTN(value, number);
        },
        placeholder: "1",
        required: true,
        type: "number",
    })), h4(singleton("Number × 2")), fluentTextField(singleton({
        appearance: "outline",
        id: "output-field",
        placeholder: "2",
        readonly: true,
        value: numberX2.el,
    }))]));
}

add(ofArray([document.body, Number$(void 0)]));

