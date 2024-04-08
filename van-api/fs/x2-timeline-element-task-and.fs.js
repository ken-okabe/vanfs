import { Timeline } from "./timeline-element.fs.js";
import { NullableT$1 } from "./x-nullable.fs.js";
import { taskT } from "./x1-timeline-element-task.fs.js";
import { nextTN, hasValue } from "./x-timeline-element-nullable.fs.js";
import { ofArray } from "../../fable_modules/fable-library-js.4.16.0/List.js";

export function taskAnd(task1, task2, timelineResult12, previousResult12) {
    const timelineResult1 = Timeline(new NullableT$1(0, []));
    const timelineResult2 = Timeline(new NullableT$1(0, []));
    const timelineStarter = Timeline(new NullableT$1(1, [true]));
    taskT((timelineResult, previousResult) => {
        if (hasValue(timelineResult2)) {
            nextTN(new NullableT$1(1, [ofArray([timelineResult1.lastVal, timelineResult2.lastVal])]), timelineResult12);
        }
        return timelineResult;
    }, taskT(task1, timelineStarter));
    taskT((timelineResult_1, previousResult_1) => {
        if (hasValue(timelineResult1)) {
            nextTN(new NullableT$1(1, [ofArray([timelineResult1.lastVal, timelineResult2.lastVal])]), timelineResult12);
        }
        return timelineResult_1;
    }, taskT(task2, timelineStarter));
    return timelineResult12;
}

export function op_PlusAmp(task1, task2) {
    return (timelineResult) => ((previousResult) => taskAnd(task1, task2, timelineResult, previousResult));
}

