import { add, tags } from "./van-api/fs/basic.fs.js";
import { ofArray, singleton } from "./fable_modules/fable-library-js.4.16.0/List.js";

export const div = (() => {
    const clo = tags.div;
    return clo;
})();

export const form = (() => {
    const clo = tags.form;
    return clo;
})();

export const fluentCard = (() => {
    const clo = tags["fluent-card"];
    return clo;
})();

export const mdFilledTextField = (() => {
    const clo = tags["md-filled-text-field"];
    return clo;
})();

export const mdTextButton = (() => {
    const clo = tags["md-text-button"];
    return clo;
})();

export const mdOutlinedButton = (() => {
    const clo = tags["md-outlined-button"];
    return clo;
})();

export function Form(_arg) {
    return fluentCard(ofArray([{
        class: "custom3",
    }, form(ofArray([div(ofArray([{
        class: "row",
    }, mdFilledTextField(singleton({
        autocomplete: "given-name",
        label: "First name",
        name: "first-name",
        required: "",
    })), mdFilledTextField(singleton({
        autocomplete: "family-name",
        label: "Last name",
        name: "last-name",
        required: "",
    }))])), div(ofArray([{
        class: "row buttons",
    }, mdTextButton(ofArray([{
        type: "reset",
    }, "Reset"])), mdOutlinedButton(ofArray([{
        type: "submit",
    }, "Submit"]))]))]))]));
}

add(ofArray([document.body, Form(void 0)]));

