import { Record } from "../../fable_modules/fable-library-js.4.16.0/Types.js";
import { list_type, lambda_type, unit_type, record_type } from "../../fable_modules/fable-library-js.4.16.0/Reflection.js";
import { state as state_1 } from "../ts/state";
import { singleton, append, iterate, empty } from "../../fable_modules/fable-library-js.4.16.0/List.js";
import { printf, toConsole } from "../../fable_modules/fable-library-js.4.16.0/String.js";

export class StateElement$1 extends Record {
    constructor(val) {
        super();
        this.val = val;
    }
}

export function StateElement$1_$reflection(gen0) {
    return record_type("Van.Timeline.StateElement`1", [gen0], StateElement$1, () => [["val", gen0]]);
}

export const state = state_1;

export class Timeline$1 extends Record {
    constructor(lastVal, lastFns, el) {
        super();
        this.lastVal = lastVal;
        this.lastFns = lastFns;
        this.el = el;
    }
}

export function Timeline$1_$reflection(gen0) {
    return record_type("Van.Timeline.Timeline`1", [gen0], Timeline$1, () => [["lastVal", gen0], ["lastFns", list_type(lambda_type(gen0, unit_type))], ["el", StateElement$1_$reflection(gen0)]]);
}

export function Timeline(a) {
    return new Timeline$1(a, empty(), state(a));
}

export function nextT(a, timeline) {
    timeline.lastVal = a;
    iterate((f) => {
        f(a);
    }, timeline.lastFns);
    timeline.el.val = a;
    return timeline;
}

export function bindT(monadf, timelineA) {
    const timelineB = monadf(timelineA.lastVal);
    const newFn = (a) => {
        nextT(monadf(a).lastVal, timelineB);
    };
    timelineA.lastFns = append(timelineA.lastFns, singleton(newFn));
    return timelineB;
}

export function mapT(f) {
    return (timelineA) => bindT((arg) => Timeline(f(arg)), timelineA);
}

export function log(a) {
    toConsole(printf("%A"))(a);
}

export function logT(a) {
    log(a);
    return Timeline(a);
}

