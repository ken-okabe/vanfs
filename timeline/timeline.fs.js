import { Record } from "../fable_modules/fable-library-js.4.24.0/Types.js";
import { record_type, list_type, lambda_type, unit_type } from "../fable_modules/fable-library-js.4.24.0/Reflection.js";
import { singleton, append, iterate, empty } from "../fable_modules/fable-library-js.4.24.0/List.js";
import { defaultOf } from "../fable_modules/fable-library-js.4.24.0/Util.js";

export class Timeline$1 extends Record {
    constructor(_last, _fns) {
        super();
        this._last = _last;
        this._fns = _fns;
    }
}

export function Timeline$1_$reflection(gen0) {
    return record_type("Timeline.Timeline`1", [gen0], Timeline$1, () => [["_last", gen0], ["_fns", list_type(lambda_type(gen0, unit_type))]]);
}

export function Timeline(a) {
    return new Timeline$1(a, empty());
}

export function isNullT(value) {
    if (value === defaultOf()) {
        return true;
    }
    else {
        return false;
    }
}

export function TL_last(timeline) {
    return timeline._last;
}

export function TL_next(a, timeline) {
    timeline._last = a;
    iterate((f) => {
        f(a);
    }, timeline._fns);
}

export function TL_bind(monadf, timelineA) {
    const timelineB = monadf(timelineA._last);
    timelineA._fns = append(timelineA._fns, singleton((a) => {
        const timeline = monadf(a);
        TL_next(timeline._last, timelineB);
    }));
    return timelineB;
}

export function TL_map(f, timelineA) {
    const timelineB = Timeline(f(timelineA._last));
    timelineA._fns = append(timelineA._fns, singleton((a) => {
        TL_next(f(a), timelineB);
    }));
    return timelineB;
}

export function TL_unlink(timeline) {
    timeline._fns = empty();
}

export function TL_Or(timelineA, timelineB) {
    const timelineAB = Timeline(defaultOf());
    TL_map((a) => {
        if (!isNullT(a) && isNullT(TL_last(timelineAB))) {
            TL_next(a, timelineAB);
        }
    }, timelineA);
    TL_map((b) => {
        if (!isNullT(b) && isNullT(TL_last(timelineAB))) {
            TL_next(b, timelineAB);
        }
    }, timelineB);
    return timelineAB;
}

export class TL_AndResult$1 extends Record {
    constructor(result) {
        super();
        this.result = result;
    }
}

export function TL_AndResult$1_$reflection(gen0) {
    return record_type("Timeline.TL.AndResult`1", [gen0], TL_AndResult$1, () => [["result", list_type(gen0)]]);
}

export function TL_andResult(a) {
    if (a instanceof TL_AndResult$1) {
        const andResultA = a;
        return andResultA;
    }
    else {
        return new TL_AndResult$1(singleton(a));
    }
}

export function TL_bindResults(a, b) {
    return new TL_AndResult$1(append(TL_andResult(a).result, TL_andResult(b).result));
}

export function TL_And(timelineA, timelineB) {
    const timelineAB = Timeline(defaultOf());
    const updateAnd = () => {
        const lastA = TL_last(timelineA);
        const lastB = TL_last(timelineB);
        const matchValue = isNullT(lastA);
        const matchValue_1 = isNullT(lastB);
        let matchResult;
        if (matchValue) {
            matchResult = 1;
        }
        else if (matchValue_1) {
            matchResult = 1;
        }
        else {
            matchResult = 0;
        }
        switch (matchResult) {
            case 0: {
                TL_next(TL_bindResults(lastA, lastB), timelineAB);
                break;
            }
            case 1: {
                TL_next(defaultOf(), timelineAB);
                break;
            }
        }
    };
    TL_map((_arg) => {
        updateAnd();
    }, timelineA);
    TL_map((_arg_1) => {
        updateAnd();
    }, timelineB);
    return timelineAB;
}

