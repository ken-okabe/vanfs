module TaskAnd

open Van.TimelineElement // import Timeline
open Van.TimelineElementNullable // import Timelinetc.
open Van.Nullable // import NullableT
open Van.TimelineElementTask
open Van.TimelineElementTaskAnd

open System.Timers
let setTimeout f delay =
    let timer = new Timer(float delay)
    timer.AutoReset <- false
    timer.Elapsed.Add(fun _ -> f())
    timer.Start()

let nonNull = NullableT true

let task1 =
    fun timelineResult previousResult ->
        log "-----------task1 started..."
        // delay-------------------------------
        let f = fun _ ->
            log "...task1 done"
            timelineResult
            |> nextTN (NullableT "task1")
            |> ignore
        setTimeout f 2500

let task2 =
    fun timelineResult previousResult ->
        log "-----------task2 started..."
        // delay-------------------------------
        let f = fun _ ->
            log "...task2 done"
            timelineResult
            |> nextTN (NullableT "task2")
            |> ignore
        setTimeout f 1000

let task3 =
    fun timelineResult previousResult ->
        log "-----------task3 started..."
        // delay-------------------------------
        let f = fun _ ->
            log "...task3 done"
            timelineResult
            |> nextTN (NullableT "task3")
            |> ignore
        setTimeout f 3000

let timelineStarter = Timeline Null //tasks disabled initially

let task123 =
    task1 +& task2 +& task3

let taskOutput =
    fun timelineResult (previousResult: NullableT<ListResult<'a>>)
        ->  log previousResult.Value.results

timelineStarter
|> taskT task123
|> taskT taskOutput
|> ignore

let start =
    fun _ -> // timeline will start
        timelineStarter
        |> nextTN nonNull
        |> ignore

setTimeout start 2000

