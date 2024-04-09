import { Timeline } from "./timeline-element.fs.js";
import { NullableT$1 } from "./x-nullable.fs.js";
import { nextTN, bindTN } from "./x-timeline-element-nullable.fs.js";
import { uncurry2 } from "../../fable_modules/fable-library-js.4.16.0/Util.js";

export function taskT(task, timelineStarter) {
    const timelineResult = Timeline(new NullableT$1(0, []));
    const monadF = (arg) => {
        const _arg_1 = task(timelineResult, timelineStarter.lastVal);
        return timelineResult;
    };
    bindTN(monadF, timelineStarter);
    return timelineResult;
}

export function composeTask(task1, task2, timelineResult, previousResult) {
    const completeTask = (_timelineResult, _previousResult) => {
        nextTN(new NullableT$1(1, [_previousResult]), timelineResult);
    };
    taskT(completeTask, taskT(task2, taskT(task1, Timeline(new NullableT$1(1, [true])))));
}

export function op_PlusGreater() {
    return (task) => ((task_1) => ((timelineResult) => ((previousResult) => {
        composeTask(uncurry2(task), uncurry2(task_1), timelineResult, previousResult);
    })));
}

