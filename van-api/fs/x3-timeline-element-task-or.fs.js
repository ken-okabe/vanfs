import { nextTN, hasValue } from "./x-timeline-element-nullable.fs.js";
import { Timeline } from "./timeline-element.fs.js";
import { NullableT } from "./x-nullable.fs.js";
import { taskT } from "./x1-timeline-element-task.fs.js";
import { uncurry2 } from "../../fable_modules/fable-library-js.4.16.0/Util.js";

export function taskOr(task1, task2, timelineResult12, previousResult12) {
    const task12 = (timelineResult, previousResult) => {
        if (hasValue(timelineResult12)) {
        }
        else {
            nextTN(previousResult, timelineResult12);
        }
    };
    const timelineStarter = Timeline(NullableT(previousResult12));
    taskT(task12, taskT(task1, timelineStarter));
    taskT(task12, taskT(task2, timelineStarter));
}

export function op_PlusBar() {
    return (task) => ((task_1) => ((timelineResult) => ((previousResult) => {
        taskOr(uncurry2(task), uncurry2(task_1), timelineResult, previousResult);
    })));
}

