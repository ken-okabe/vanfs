import { nextTN } from "./x-timeline-element-nullable.fs.js";
import { Timeline } from "./timeline-element.fs.js";
import { NullableT } from "./x-nullable.fs.js";
import { taskT } from "./x1-timeline-element-task.fs.js";
import { uncurry2 } from "../../fable_modules/fable-library-js.4.17.0/Util.js";

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

