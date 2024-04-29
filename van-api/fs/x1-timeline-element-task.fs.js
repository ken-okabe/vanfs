import { Timeline } from "./timeline-element.fs.js";
import { NullableT$1 } from "./x-nullable.fs.js";
import { bindTN } from "./x-timeline-element-nullable.fs.js";

export function taskT(task, timelineStarter) {
    const timelineResult = Timeline(new NullableT$1(0, []));
    bindTN((arg) => {
        const _arg_1 = task(timelineResult, timelineStarter.lastVal);
        return Timeline(new NullableT$1(0, []));
    }, timelineStarter);
    return timelineResult;
}

