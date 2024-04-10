import { nextTN, hasValue } from "./x-timeline-nullable.fs.js";
import { Timeline } from "./timeline.fs.js";
import { NullableT$1 } from "./x-nullable.fs.js";
import { taskT } from "./x1-timeline-task.fs.js";

export function taskOr(task1, task2, timelineResult12, previousResult12) {
    const task12 = (timelineResult, previousResult) => {
        if (hasValue(timelineResult12)) {
        }
        else {
            nextTN(previousResult, timelineResult12);
        }
    };
    const timelineStarter = Timeline(new NullableT$1(1, [true]));
    taskT(task12, taskT(task1, timelineStarter));
    taskT(task12, taskT(task2, timelineStarter));
}

export function op_PlusBar(task1, task2) {
    return (timelineResult) => ((previousResult) => {
        taskOr(task1, task2, timelineResult, previousResult);
    });
}

