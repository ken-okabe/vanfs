import { Timeline } from "./timeline-element.fs.js";
import { NullableT$1 } from "./x-nullable.fs.js";
import { nextTN, hasValue } from "./x-timeline-element-nullable.fs.js";
import { ofArray } from "../../fable_modules/fable-library-js.4.16.0/List.js";
import { taskT } from "./x1-timeline-element-task.fs.js";

export function taskAnd(task1, task2, timelineResult12, previousResult12) {
    const timelineResult1 = Timeline(new NullableT$1(0, []));
    const timelineResult2 = Timeline(new NullableT$1(0, []));
    const task1_ = (timelineResult, previousResult) => {
        if (hasValue(timelineResult2)) {
            const listResult12 = ofArray([timelineResult1.lastVal, timelineResult2.lastVal]);
            nextTN(new NullableT$1(1, [listResult12]), timelineResult12);
        }
        return timelineResult;
    };
    const task2_ = (timelineResult_1, previousResult_1) => {
        if (hasValue(timelineResult1)) {
            const listResult12_1 = ofArray([timelineResult1.lastVal, timelineResult2.lastVal]);
            nextTN(new NullableT$1(1, [listResult12_1]), timelineResult12);
        }
        return timelineResult_1;
    };
    const timelineStarter = Timeline(new NullableT$1(1, [true]));
    taskT(task1_, taskT(task1, timelineStarter));
    taskT(task2_, taskT(task2, timelineStarter));
    return timelineResult12;
}

export function op_PlusAmp(task1, task2) {
    return (timelineResult) => ((previousResult) => taskAnd(task1, task2, timelineResult, previousResult));
}

