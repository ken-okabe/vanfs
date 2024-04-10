import { Record } from "../fable_modules/fable-library-js.4.16.0/Types.js";
import { record_type, list_type, lambda_type, unit_type } from "../fable_modules/fable-library-js.4.16.0/Reflection.js";
import { singleton, append, iterate, empty } from "../fable_modules/fable-library-js.4.16.0/List.js";
import { printf, toConsole } from "../fable_modules/fable-library-js.4.16.0/String.js";

export class Timeline$1 extends Record {
    constructor(lastVal, _fns) {
        super();
        this.lastVal = lastVal;
        this._fns = _fns;
    }
}

export function Timeline$1_$reflection(gen0) {
    return record_type("Timeline.Timeline.Timeline`1", [gen0], Timeline$1, () => [["lastVal", gen0], ["_fns", list_type(lambda_type(gen0, unit_type))]]);
}

export function Timeline(a) {
    return new Timeline$1(a, empty());
}

export function nextT(a, timeline) {
    timeline.lastVal = a;
    iterate((f) => {
        f(a);
    }, timeline._fns);
    return timeline;
}

export function bindT(monadf, timelineA) {
    const timelineB = monadf(timelineA.lastVal);
    const newFn = (a) => {
        nextT(monadf(a).lastVal, timelineB);
    };
    timelineA._fns = append(timelineA._fns, singleton(newFn));
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

