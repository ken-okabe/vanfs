import Timer from "./fable_modules/fable-library-js.4.17.0/Timer.js";
import { add } from "./fable_modules/fable-library-js.4.17.0/Observable.js";
import { NullableT$1__get_Value, NullableT$1, NullableT } from "./van-api/fs/x-nullable.fs.js";
import { Timeline, log } from "./van-api/fs/timeline-element.fs.js";
import { nextTN } from "./van-api/fs/x-timeline-element-nullable.fs.js";
import { op_PlusAmp } from "./van-api/fs/x4-timeline-element-task-and.fs.js";
import { taskT } from "./van-api/fs/x1-timeline-element-task.fs.js";
import { uncurry2 } from "./fable_modules/fable-library-js.4.17.0/Util.js";

export function setTimeout(f, delay) {
    const timer = new Timer(delay);
    timer.AutoReset = false;
    add((_arg) => {
        f();
    }, timer.Elapsed());
    timer.Start();
}

export const nonNull = NullableT(true);

export function task1(timelineResult, previousResult) {
    log("-----------task1 started...");
    const f = (_arg) => {
        log("...task1 done");
        nextTN(NullableT("task1"), timelineResult);
    };
    setTimeout(f, 2500);
}

export function task2(timelineResult, previousResult) {
    log("-----------task2 started...");
    const f = (_arg) => {
        log("...task2 done");
        nextTN(NullableT("task2"), timelineResult);
    };
    setTimeout(f, 1000);
}

export function task3(timelineResult, previousResult) {
    log("-----------task3 started...");
    const f = (_arg) => {
        log("...task3 done");
        nextTN(NullableT("task3"), timelineResult);
    };
    setTimeout(f, 3000);
}

export const timelineStarter = Timeline(new NullableT$1(0, []));

export const task123 = op_PlusAmp()(op_PlusAmp()((timelineResult) => ((previousResult) => {
    task1(timelineResult, previousResult);
}))((timelineResult_1) => ((previousResult_1) => {
    task2(timelineResult_1, previousResult_1);
})))((timelineResult_2) => ((previousResult_2) => {
    task3(timelineResult_2, previousResult_2);
}));

export function taskOutput(timelineResult, previousResult) {
    log(NullableT$1__get_Value(previousResult).results);
}

taskT((timelineResult, previousResult) => {
    taskOutput(timelineResult, previousResult);
}, taskT(uncurry2(task123), timelineStarter));

export function start(_arg) {
    nextTN(nonNull, timelineStarter);
}

setTimeout(() => {
    start(undefined);
}, 2000);

