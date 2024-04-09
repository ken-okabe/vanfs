module Tasks

open Browser
open Browser.Types
open Fable.Core.JsInterop

open Van.Basic // import tags, add
open Van.TimelineElement // import Timeline'
open Van.Nullable // import Null etc.
open Van.TimelineElementNullable // import Null etc.
open Van.TimelineElementTask
open Van.TimelineElementTaskOr
open Van.TimelineElementTaskAnd

open System.Timers
let setTimeout f delay =
    let timer = new Timer(float delay)
    timer.AutoReset <- false
    timer.Elapsed.Add(fun _ -> f())
    timer.Start()
let br: Tag = tags?``br``
let fluentCard: Tag = tags?``fluent-card``
let linerProgress: Tag = tags?``md-linear-progress``

let task1 =
    fun timelineResult previousResult ->
        printfn "-----------task1 started..."
        log previousResult
        // delay-------------------------------
        let f = fun _ ->
            printfn "...task1 done"
            timelineResult
            |> nextTN (NullableT 1)
            |> ignore
        setTimeout f 1500

let task2 =
    fun timelineResult previousResult ->
        printfn "-----------task2 started..."
        log previousResult
        // delay-------------------------------
        let f = fun _ ->
            printfn "...task2 done"
            timelineResult
            |> nextTN (NullableT 2)
            |> ignore
        setTimeout f 1500

let task3 =
    fun timelineResult previousResult ->
        printfn "-----------task3 started..."
        log previousResult
        // delay-------------------------------
        let f = fun _ ->
            printfn "...task3 done"
            timelineResult
            |> nextTN (NullableT 3)
            |> ignore
        setTimeout f 1500

let taskLog =
    fun timelineResult ->
        printfn "-----------taskLog started..."
        log timelineResult.lastVal
        timelineResult

let timelineStarter = Timeline Null //tasks disabled initially

let task123 =
    task1 +> task2 +> task3


log "test"

timelineStarter
|> taskT task123
//|> taskT task2
//|> taskT task3
//|> taskT task3
|> taskT task1

//|> taskT taskLog
|> ignore

let start =
    fun _ ->
        log "start" // timeline will start
        timelineStarter
        |> nextTN (NullableT true)
        |> ignore

setTimeout start 2000
