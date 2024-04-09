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
            //printfn "task1 %s" (timelineThis.ToString())
            printfn "...task1 done"
            timelineResult
            |> nextTN (NullableT 1)
            |> ignore
        setTimeout f 1500
        timelineResult

let task2 =
    fun timelineResult previousResult ->
        printfn "-----------task2 started..."
        log previousResult
        // delay-------------------------------
        let f = fun _ ->
            //printfn "task1 %s" (timelineThis.ToString())
            printfn "...task2 done"
            timelineResult
            |> nextTN (NullableT 2)
            |> ignore
        setTimeout f 1000
        timelineResult

let task3 =
    fun timelineResult previousResult ->
        printfn "-----------task3 started..."
        log previousResult
        // delay-------------------------------
        let f = fun _ ->
            //printfn "task1 %s" (timelineThis.ToString())
            printfn "...task3 done"
            timelineResult
            |> nextTN (NullableT 3)
            |> ignore
        setTimeout f 1500
        timelineResult

let taskLog =
    fun timelineResult previousResult ->
        printfn "-----------taskLog started..."
        log previousResult
        timelineResult

let timelineStarter = Timeline Null //tasks disabled initially

let task123 =
    task1 +> task1 +> task1
 // taskAnd task1 task2

log "test"

timelineStarter
|> taskT task123
//|> taskT task2
//|> taskT task2
//|> taskT task3
//|> taskT task3

|> taskT taskLog
|> ignore

let start =
    fun _ ->
        log "start" // timeline will start
        timelineStarter
        |> nextTN (NullableT 0)
        |> ignore

setTimeout start 2000
