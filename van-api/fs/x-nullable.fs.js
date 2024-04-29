import { Union } from "../../fable_modules/fable-library-js.4.16.0/Types.js";
import { union_type } from "../../fable_modules/fable-library-js.4.16.0/Reflection.js";

export class NullableT$1 extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Null", "T"];
    }
}

export function NullableT$1_$reflection(gen0) {
    return union_type("Van.Nullable.NullableT`1", [gen0], NullableT$1, () => [[], [["Item", gen0]]]);
}

export function NullableT$1__get_Value(this$) {
    if (this$.tag === 1) {
        return this$.fields[0];
    }
    else {
        throw new Error("Value is null");
    }
}

export function NullableT(a) {
    const matchValue = a;
    if (matchValue instanceof NullableT$1) {
        const nullable = matchValue;
        return nullable;
    }
    else {
        return new NullableT$1(1, [a]);
    }
}

