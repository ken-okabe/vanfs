import { Record } from "../../fable_modules/fable-library-js.4.24.0/Types.js";
import { list_type, lambda_type, unit_type, record_type } from "../../fable_modules/fable-library-js.4.24.0/Reflection.js";
import { state as state_1 } from "../ts/state";
import { singleton, append, iterate, empty } from "../../fable_modules/fable-library-js.4.24.0/List.js";
import { defaultOf } from "../../fable_modules/fable-library-js.4.24.0/Util.js";

export class StateElement$1 extends Record {
    constructor(val) {
        super();
        this.val = val;
    }
}

export function StateElement$1_$reflection(gen0) {
    return record_type("Van.TimelineElement.StateElement`1", [gen0], StateElement$1, () => [["val", gen0]]);
}

export const state = state_1;

export class TimelineE$1 extends Record {
    constructor(_last, _fns, el) {
        super();
        this._last = _last;
        this._fns = _fns;
        this.el = el;
    }
}

export function TimelineE$1_$reflection(gen0) {
    return record_type("Van.TimelineElement.TimelineE`1", [gen0], TimelineE$1, () => [["_last", gen0], ["_fns", list_type(lambda_type(gen0, unit_type))], ["el", StateElement$1_$reflection(gen0)]]);
}

export function TimelineE(a) {
    return new TimelineE$1(a, empty(), state(a));
}

export function isNullT(value) {
    if (value === defaultOf()) {
        return true;
    }
    else {
        return false;
    }
}

export function TLE_last(timeline) {
    return timeline._last;
}

export function TLE_next(a, timeline) {
    timeline._last = a;
    iterate((f) => {
        f(a);
    }, timeline._fns);
    timeline.el.val = a;
}

export function TLE_bind(monadf, timelineA) {
    const timelineB = monadf(timelineA._last);
    timelineA._fns = append(timelineA._fns, singleton((a) => {
        const timeline = monadf(a);
        TLE_next(timeline._last, timelineB);
    }));
    return timelineB;
}

export function TLE_map(f, timelineA) {
    const timelineB = TimelineE(f(timelineA._last));
    timelineA._fns = append(timelineA._fns, singleton((a) => {
        TLE_next(f(a), timelineB);
    }));
    return timelineB;
}

export function TLE_unlink(timeline) {
    timeline._fns = empty();
}

export function TLE_Or(timelineA, timelineB) {
    const timelineAB = TimelineE(defaultOf());
    TLE_map((a) => {
        if (!isNullT(a) && isNullT(TLE_last(timelineAB))) {
            TLE_next(a, timelineAB);
        }
    }, timelineA);
    TLE_map((b) => {
        if (!isNullT(b) && isNullT(TLE_last(timelineAB))) {
            TLE_next(b, timelineAB);
        }
    }, timelineB);
    return timelineAB;
}

export class TLE_AndResult$1 extends Record {
    constructor(result) {
        super();
        this.result = result;
    }
}

export function TLE_AndResult$1_$reflection(gen0) {
    return record_type("Van.TimelineElement.TLE.AndResult`1", [gen0], TLE_AndResult$1, () => [["result", list_type(gen0)]]);
}

export function TLE_andResult(a) {
    if (a instanceof TLE_AndResult$1) {
        const andResultA = a;
        return andResultA;
    }
    else {
        return new TLE_AndResult$1(singleton(a));
    }
}

export function TLE_bindResults(a, b) {
    return new TLE_AndResult$1(append(TLE_andResult(a).result, TLE_andResult(b).result));
}

export function TLE_And(timelineA, timelineB) {
    const timelineAB = TimelineE(defaultOf());
    const updateAnd = () => {
        const lastA = TLE_last(timelineA);
        const lastB = TLE_last(timelineB);
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
                TLE_next(TLE_bindResults(lastA, lastB), timelineAB);
                break;
            }
            case 1: {
                TLE_next(defaultOf(), timelineAB);
                break;
            }
        }
    };
    TLE_map((_arg) => {
        updateAnd();
    }, timelineA);
    TLE_map((_arg_1) => {
        updateAnd();
    }, timelineB);
    return timelineAB;
}

