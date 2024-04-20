import Timer from "./fable_modules/fable-library-js.4.16.0/Timer.js";
import { add } from "./fable_modules/fable-library-js.4.16.0/Observable.js";
import { add as add_1, tags } from "./van-api/fs/basic.fs.js";
import { log, nextT, Timeline } from "./van-api/fs/timeline-element.fs.js";
import { nextTN } from "./van-api/fs/x-timeline-element-nullable.fs.js";
import { NullableT$1, NullableT } from "./van-api/fs/x-nullable.fs.js";
import { op_PlusGreater } from "./van-api/fs/x2-timeline-element-task-concat.fs.js";
import { uncurry2, curry2 } from "./fable_modules/fable-library-js.4.16.0/Util.js";
import { taskT } from "./van-api/fs/x1-timeline-element-task.fs.js";
import { ofArray, singleton, empty } from "./fable_modules/fable-library-js.4.16.0/List.js";

export function setTimeout(f, delay) {
    const timer = new Timer(delay);
    timer.AutoReset = false;
    add((_arg) => {
        f();
    }, timer.Elapsed());
    timer.Start();
}

export const br = (() => {
    const clo = tags.br;
    return clo;
})();

export const fluentCard = (() => {
    const clo = tags["fluent-card"];
    return clo;
})();

export const linerProgress = (() => {
    const clo = tags["md-linear-progress"];
    return clo;
})();

export function Tasks(_arg) {
    const progressInit = false;
    const progressStart = true;
    const progressDone = false;
    const percentInit = 0;
    const percentStart = 0;
    const percentDone = 1;
    const timelineProgress1 = Timeline(progressInit);
    const timelineProgress2 = Timeline(progressInit);
    const timelineProgress3 = Timeline(progressInit);
    const timelinePercent1 = Timeline(percentInit);
    const timelinePercent2 = Timeline(percentInit);
    const timelinePercent3 = Timeline(percentInit);
    const taskStart = (timelineProgress, timelinePercent) => {
        nextT(progressStart, timelineProgress);
        nextT(percentStart, timelinePercent);
    };
    const taskDone = (timelineProgress_1, timelinePercent_1, timelineResult) => {
        nextT(progressDone, timelineProgress_1);
        nextT(percentDone, timelinePercent_1);
        nextTN(NullableT(999), timelineResult);
    };
    const task1 = (timelineResult_1, previousResult) => {
        log("-----------task1 started...");
        taskStart(timelineProgress1, timelinePercent1);
        const f = (_arg_1) => {
            log("...task1 done");
            taskDone(timelineProgress1, timelinePercent1, timelineResult_1);
        };
        setTimeout(f, 2500);
        return timelineResult_1;
    };
    const task2 = (timelineResult_2, previousResult_1) => {
        log("-----------task2 started...");
        taskStart(timelineProgress2, timelinePercent2);
        const f_1 = (_arg_2) => {
            log("...task2 done");
            taskDone(timelineProgress2, timelinePercent2, timelineResult_2);
        };
        setTimeout(f_1, 2500);
        return timelineResult_2;
    };
    const task3 = (timelineResult_3, previousResult_2) => {
        log("-----------task3 started...");
        taskStart(timelineProgress3, timelinePercent3);
        const f_2 = (_arg_3) => {
            log("...task3 done");
            taskDone(timelineProgress3, timelinePercent3, timelineResult_3);
        };
        setTimeout(f_2, 2500);
        return timelineResult_3;
    };
    const timelineStarter = Timeline(new NullableT$1(0, []));
    const task123 = op_PlusGreater()(op_PlusGreater()(curry2(task1))(curry2(task2)))(curry2(task3));
    taskT(uncurry2(task123), timelineStarter);
    const start = (_arg_4) => {
        nextTN(NullableT(0), timelineStarter);
    };
    setTimeout(start, 2000);
    return fluentCard(ofArray([{
        class: "custom2",
    }, br(empty()), linerProgress(singleton({
        indeterminate: timelineProgress1.el,
        value: timelinePercent1.el,
    })), br(empty()), linerProgress(singleton({
        indeterminate: timelineProgress2.el,
        value: timelinePercent2.el,
    })), br(empty()), linerProgress(singleton({
        indeterminate: timelineProgress3.el,
        value: timelinePercent3.el,
    }))]));
}

add_1(ofArray([document.body, Tasks(void 0)]));

