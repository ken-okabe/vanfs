import { curry2, equals, defaultOf } from "../fable_modules/fable-library-js.4.16.0/Util.js";
import { singleton, append, iterate } from "../fable_modules/fable-library-js.4.16.0/List.js";
import { Timeline } from "./timeline.fs.js";
import { value as value_1 } from "../fable_modules/fable-library-js.4.16.0/Option.js";

export function Null() {
    return defaultOf();
}

export function nextTN(nullable, timeline) {
    timeline.lastVal = nullable;
    if (equals(nullable, Null())) {
    }
    else {
        iterate((nullableFn) => {
            nullableFn(nullable);
        }, timeline.lastFns);
    }
    return timeline;
}

export function bindTN(monadf, timelineA) {
    const timelineB = equals(timelineA.lastVal, Null()) ? Timeline(Null()) : monadf(value_1(timelineA.lastVal));
    const newFn = (nullable) => {
        if (equals(nullable, Null())) {
        }
        else {
            nextTN(monadf(value_1(nullable)).lastVal, timelineB);
        }
    };
    timelineA.lastFns = append(timelineA.lastFns, singleton(newFn));
    return timelineB;
}

export function mapTN(f) {
    return (timelineA) => bindTN((arg) => Timeline(f(arg)), timelineA);
}

export function taskT(coreTask, taskStart) {
    const taskResult = Timeline(Null());
    const task = curry2(coreTask)(taskResult);
    bindTN(task, taskStart);
    return taskResult;
}

