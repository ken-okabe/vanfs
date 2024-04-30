import { Record } from "../fable_modules/fable-library-js.4.16.0/Types.js";
import { record_type, list_type } from "../fable_modules/fable-library-js.4.16.0/Reflection.js";
import { NullableT, NullableT$1, NullableT$1__get_Value } from "./x-nullable.fs.js";
import { append, singleton } from "../fable_modules/fable-library-js.4.16.0/List.js";
import { Timeline } from "./timeline.fs.js";
import { hasValue, nextTN } from "./x-timeline-nullable.fs.js";
import { taskT } from "./x1-timeline-task.fs.js";
import { curry4, uncurry2 } from "../fable_modules/fable-library-js.4.16.0/Util.js";

export class ListResult$1 extends Record {
    constructor(results) {
        super();
        this.results = results;
    }
}

export function ListResult$1_$reflection(gen0) {
    return record_type("Timeline.TimelineTaskAnd.ListResult`1", [gen0], ListResult$1, () => [["results", list_type(gen0)]]);
}

export function ListResult(a) {
    return new ListResult$1(a);
}

export function toList(nullable) {
    const matchValue = NullableT$1__get_Value(nullable);
    if (matchValue instanceof ListResult$1) {
        const listResult = matchValue;
        return listResult.results;
    }
    else {
        return singleton(nullable);
    }
}

export function taskAnd(task1, task2, timelineResult12, previousResult12) {
    let timelineStarter_2, timelineStarter_4;
    const timelineResult1 = Timeline(new NullableT$1(0, []));
    const timelineResult2 = Timeline(new NullableT$1(0, []));
    const task_ = (timelineCurrent, timelineToCheck, timelineResult, previousResult) => {
        nextTN(previousResult, timelineCurrent);
        if (hasValue(timelineToCheck)) {
            const list1 = toList(timelineResult1.lastVal);
            const list2 = toList(timelineResult2.lastVal);
            const listResult12 = ListResult(append(list1, list2));
            nextTN(NullableT(listResult12), timelineResult12);
        }
    };
    const timelineStarter = Timeline(NullableT(previousResult12));
    (timelineStarter_2 = taskT(task1, timelineStarter), taskT(uncurry2(curry4(task_)(timelineResult1)(timelineResult2)), timelineStarter_2));
    (timelineStarter_4 = taskT(task2, timelineStarter), taskT(uncurry2(curry4(task_)(timelineResult2)(timelineResult1)), timelineStarter_4));
}

export function op_PlusAmp() {
    return (task) => ((task_1) => ((timelineResult) => ((previousResult) => {
        taskAnd(uncurry2(task), uncurry2(task_1), timelineResult, previousResult);
    })));
}

