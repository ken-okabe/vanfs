import { Timeline } from "./timeline.fs.js";
import { bindTN, Null } from "./x-timeline-nullable.fs.js";
import { curry2 } from "../fable_modules/fable-library-js.4.16.0/Util.js";

export function taskT(task, taskStarter) {
    const timelineResult = Timeline(Null());
    const coreTask = curry2(task)(timelineResult);
    bindTN(coreTask, taskStarter);
    return timelineResult;
}

export function op_PlusGreater(task1, task2, timelineResult, previousResult) {
    return taskT(task2, task1(timelineResult, previousResult));
}

