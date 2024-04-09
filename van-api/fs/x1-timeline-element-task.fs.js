import { Timeline } from "./timeline-element.fs.js";
import { NullableT$1 } from "./x-nullable.fs.js";
import { uncurry2, curry2 } from "../../fable_modules/fable-library-js.4.16.0/Util.js";
import { bindTN } from "./x-timeline-element-nullable.fs.js";

export function taskT(task, timelineStarter) {
    const timelineResult = Timeline(new NullableT$1(0, []));
    const coreTask = curry2(task)(timelineResult);
    bindTN(coreTask, timelineStarter);
    return timelineResult;
}

export function composeTask(task1, task2, timelineResult, previousResult) {
    return taskT(task2, task1(timelineResult, previousResult));
}

export function op_PlusGreater() {
    return (task) => ((task_1) => ((timelineResult) => ((previousResult) => composeTask(uncurry2(task), uncurry2(task_1), timelineResult, previousResult))));
}

