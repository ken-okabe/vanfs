import { taskT } from "./x1-timeline-task.fs.js";
import { nextTN } from "./x-timeline-nullable.fs.js";
import { Timeline } from "./timeline.fs.js";
import { NullableT } from "./x-nullable.fs.js";
import { uncurry2 } from "../fable_modules/fable-library-js.4.16.0/Util.js";

export function taskConcat(task1, task2, timelineResult12, previousResult12) {
    taskT((timelineResult, previousResult) => {
        nextTN(previousResult, timelineResult12);
    }, taskT(task2, taskT(task1, Timeline(NullableT(previousResult12)))));
}

export function op_PlusGreater() {
    return (task) => ((task_1) => ((timelineResult) => ((previousResult) => {
        taskConcat(uncurry2(task), uncurry2(task_1), timelineResult, previousResult);
    })));
}

