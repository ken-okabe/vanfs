import Timer from "./fable_modules/fable-library-js.4.16.0/Timer.js";
import { add } from "./fable_modules/fable-library-js.4.16.0/Observable.js";
import { tags } from "./van-api/fs/basic.fs.js";
import { printf, toConsole } from "./fable_modules/fable-library-js.4.16.0/String.js";
import { Timeline, log } from "./van-api/fs/timeline-element.fs.js";
import { nextTN } from "./van-api/fs/x-timeline-element-nullable.fs.js";
import { NullableT$1 } from "./van-api/fs/x-nullable.fs.js";
import { taskT, op_PlusGreater } from "./van-api/fs/x1-timeline-element-task.fs.js";
import { uncurry2 } from "./fable_modules/fable-library-js.4.16.0/Util.js";

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

export function task1(timelineResult, previousResult) {
    toConsole(printf("-----------task1 started..."));
    log(previousResult);
    const f = (_arg) => {
        toConsole(printf("...task1 done"));
        nextTN(new NullableT$1(1, [1]), timelineResult);
    };
    setTimeout(f, 1500);
}

export function task2(timelineResult, previousResult) {
    toConsole(printf("-----------task2 started..."));
    log(previousResult);
    const f = (_arg) => {
        toConsole(printf("...task2 done"));
        nextTN(new NullableT$1(1, [2]), timelineResult);
    };
    setTimeout(f, 1500);
}

export function task3(timelineResult, previousResult) {
    toConsole(printf("-----------task3 started..."));
    log(previousResult);
    const f = (_arg) => {
        toConsole(printf("...task3 done"));
        nextTN(new NullableT$1(1, [3]), timelineResult);
    };
    setTimeout(f, 1500);
}

export function taskLog(timelineResult) {
    toConsole(printf("-----------taskLog started..."));
    log(timelineResult.lastVal);
    return timelineResult;
}

export const timelineStarter = Timeline(new NullableT$1(0, []));

export const task123 = op_PlusGreater()(op_PlusGreater()((timelineResult) => ((previousResult) => {
    task1(timelineResult, previousResult);
}))((timelineResult_1) => ((previousResult_1) => {
    task2(timelineResult_1, previousResult_1);
})))((timelineResult_2) => ((previousResult_2) => {
    task3(timelineResult_2, previousResult_2);
}));

log("test");

taskT((timelineResult, previousResult) => {
    task1(timelineResult, previousResult);
}, taskT(uncurry2(task123), timelineStarter));

export function start(_arg) {
    log("start");
    nextTN(new NullableT$1(1, [true]), timelineStarter);
}

setTimeout(() => {
    start(void 0);
}, 2000);

