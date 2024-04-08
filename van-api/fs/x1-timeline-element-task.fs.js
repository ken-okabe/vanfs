import { Timeline } from "./timeline-element.fs.js";
import { NullableT$1 } from "./x-nullable.fs.js";
import { bindTN } from "./x-timeline-element-nullable.fs.js";
import { curry2 } from "../../fable_modules/fable-library-js.4.16.0/Util.js";

export function taskT(task, timelineStarter) {
    const timelineResult = Timeline(new NullableT$1(0, []));
    bindTN(curry2(task)(timelineResult), timelineStarter);
    return timelineResult;
}

export function op_PlusGreater(task1, task2, timelineResult, previousResult) {
    return taskT(task2, task1(timelineResult, previousResult));
}

