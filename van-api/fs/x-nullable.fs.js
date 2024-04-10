import { defaultOf, equals } from "../../fable_modules/fable-library-js.4.16.0/Util.js";
import { Union } from "../../fable_modules/fable-library-js.4.16.0/Types.js";
import { union_type } from "../../fable_modules/fable-library-js.4.16.0/Reflection.js";

export function isNullableT(obj) {
    const check = null;
    if (equals(check, defaultOf())) {
        return false;
    }
    else {
        return true;
    }
}

export class NullableT$1 extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Null", "NullableT"];
    }
}

export function NullableT$1_$reflection(gen0) {
    return union_type("Van.Nullable.NullableT`1", [gen0], NullableT$1, () => [[], [["Item", gen0]]]);
}

export function NullableT$1__get_NullableType(this$) {
    return true;
}

export function NullableT$1__get_Value(this$) {
    if (this$.tag === 1) {
        const a = this$.fields[0];
        if (isNullableT(a)) {
            return NullableT$1__get_Value(a);
        }
        else {
            return a;
        }
    }
    else {
        throw new Error("Value is null");
    }
}

