import { Timeline } from "./timeline.fs.js";
import { NullableT, NullableT$1 } from "./x-nullable.fs.js";
import { nextTN, bindTN } from "./x-timeline-nullable.fs.js";
import { uncurry2 } from "../fable_modules/fable-library-js.4.16.0/Util.js";

export function taskT(task, timelineStarter) {
    const timelineResult = Timeline(new NullableT$1(0, []));
    const monadF = (arg) => {
        const _arg_1 = task(timelineResult, timelineStarter.lastVal);
        return Timeline(new NullableT$1(0, []));
    };
    bindTN(monadF, timelineStarter);
    return timelineResult;
}

export function taskConcat(task1, task2, timelineResult12, previousResult12) {
    const taskComplete = (timelineResult, previousResult) => {
        nextTN(previousResult, timelineResult12);
    };
    const timelineStarter = Timeline(NullableT(previousResult12));
    taskT(taskComplete, taskT(task2, taskT(task1, timelineStarter)));
}

export function op_PlusGreater() {
    return (task) => ((task_1) => ((timelineResult) => ((previousResult) => {
        taskConcat(uncurry2(task), uncurry2(task_1), timelineResult, previousResult);
    })));
}

