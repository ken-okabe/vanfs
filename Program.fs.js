import Timer from "./fable_modules/fable-library-js.4.16.0/Timer.js";
import { add } from "./fable_modules/fable-library-js.4.16.0/Observable.js";
import { tags } from "./van-api/fs/basic.fs.js";
import { Timeline, log } from "./van-api/fs/timeline-element.fs.js";
import { mapTN, nextTN } from "./van-api/fs/x-timeline-element-nullable.fs.js";
import { NullableT$1__get_Value, NullableT$1, NullableT } from "./van-api/fs/x-nullable.fs.js";
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
        nextTN(NullableT(1), timelineResult);
    };
    setTimeout(f, 2500);
}

export function task2(timelineResult, previousResult) {
    log("-----------task2 started...");
    log(previousResult);
    const f = (_arg) => {
        log("...task2 done");
        nextTN(NullableT(2), timelineResult);
    };
    setTimeout(f, 500);
}

export function task3(timelineResult, previousResult) {
    log("-----------task3 started...");
    log(previousResult);
    const f = (_arg) => {
        log("...task3 done");
        nextTN(NullableT(3), timelineResult);
    };
    setTimeout(f, 1500);
}

export function taskLog(timelineResult, previousResult) {
    log("-----------taskLog started...");
    log(previousResult);
}

export const timelineStarter = Timeline(new NullableT$1(0, []));

log("test");

taskT((timelineResult_2, previousResult_2) => {
    task3(timelineResult_2, previousResult_2);
}, taskT((timelineResult_1, previousResult_1) => {
    task2(timelineResult_1, previousResult_1);
}, taskT((timelineResult, previousResult) => {
    task1(timelineResult, previousResult);
}, timelineStarter)));

export function start(_arg) {
    log("start");
    nextTN(NullableT(0), timelineStarter);
}

setTimeout(() => {
    start(void 0);
}, 2000);

export const x = NullableT(1);

log(x);

export const y = NullableT(x);

log(y);

export function double(a) {
    return NullableT(a * 2);
}

export const timelineA = Timeline(new NullableT$1(0, []));

export const timelineB = mapTN(double)(timelineA);

nextTN(NullableT(3), timelineA);

log(timelineB.lastVal);

export function nullable1() {
    return new NullableT$1(0, []);
}

export const nullable2 = NullableT(1);

log(nullable1());

log(nullable2);

log(NullableT$1__get_Value(nullable2));

