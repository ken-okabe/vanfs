import Timer from "./fable_modules/fable-library-js.4.16.0/Timer.js";
import { add } from "./fable_modules/fable-library-js.4.16.0/Observable.js";
import { tags } from "./van-api/fs/basic.fs.js";
import { Timeline, log } from "./van-api/fs/timeline-element.fs.js";
import { nextTN } from "./van-api/fs/x-timeline-element-nullable.fs.js";
import { NullableT$1 } from "./van-api/fs/x-nullable.fs.js";
import { op_PlusBar } from "./van-api/fs/x2-timeline-element-task-or.fs.js";
import { uncurry2 } from "./fable_modules/fable-library-js.4.16.0/Util.js";
import { op_PlusAmp } from "./van-api/fs/x2-timeline-element-task-and.fs.js";
import { taskT } from "./van-api/fs/x1-timeline-element-task.fs.js";

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
    log("-----------task1 started...");
    log(previousResult);
    const f = (_arg) => {
        log("...task1 done");
        nextTN(new NullableT$1(1, [1]), timelineResult);
    };
    setTimeout(f, 2500);
}

export function task2(timelineResult, previousResult) {
    log("-----------task2 started...");
    log(previousResult);
    const f = (_arg) => {
        log("...task2 done");
        nextTN(new NullableT$1(1, [2]), timelineResult);
    };
    setTimeout(f, 500);
}

export function task3(timelineResult, previousResult) {
    log("-----------task3 started...");
    log(previousResult);
    const f = (_arg) => {
        log("...task3 done");
        nextTN(new NullableT$1(1, [3]), timelineResult);
    };
    setTimeout(f, 1500);
}

export function taskLog(timelineResult, previousResult) {
    log("-----------taskLog started...");
    log(previousResult);
}

export const timelineStarter = Timeline(new NullableT$1(0, []));

export const task123 = op_PlusBar(uncurry2(op_PlusBar((timelineResult, previousResult) => {
    task1(timelineResult, previousResult);
}, (timelineResult_1, previousResult_1) => {
    task2(timelineResult_1, previousResult_1);
})), (timelineResult_2, previousResult_2) => {
    task3(timelineResult_2, previousResult_2);
});

export const task21 = op_PlusAmp((timelineResult, previousResult) => {
    task2(timelineResult, previousResult);
}, (timelineResult_1, previousResult_1) => {
    task1(timelineResult_1, previousResult_1);
});

export const task12321 = op_PlusAmp(uncurry2(task123), uncurry2(task21));

log("test");

taskT((timelineResult_1, previousResult_1) => {
    taskLog(timelineResult_1, previousResult_1);
}, taskT((timelineResult, previousResult) => {
    task1(timelineResult, previousResult);
}, taskT(uncurry2(task12321), timelineStarter)));

export function start(_arg) {
    log("start");
    nextTN(new NullableT$1(1, [0]), timelineStarter);
}

setTimeout(() => {
    start(void 0);
}, 2000);

export const x = new NullableT$1(1, [1]);

log(x);

export const y = new NullableT$1(1, [x]);

log(y);

