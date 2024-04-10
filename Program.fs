﻿module Tasks

open Browser
open Browser.Types
open Fable.Core.JsInterop

open Van.Basic // import tags, add
open Van.TimelineElement // import Timeline'
open Van.Nullable // import Null etc.
open Van.TimelineElementNullable // import Null etc.
open Van.TimelineElementTask
open Van.TimelineElementTaskConcat
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
        log "-----------task1 started..."
        log previousResult
        // delay-------------------------------
        let f = fun _ ->
            log "...task1 done"
            timelineResult
            |> nextTN (NullableT 1)
            |> ignore
        setTimeout f 2500

let task2 =
    fun timelineResult previousResult ->
        log "-----------task2 started..."
        log previousResult
        // delay-------------------------------
        let f = fun _ ->
            log "...task2 done"
            timelineResult
            |> nextTN (NullableT 2)
            |> ignore
        setTimeout f 500

let task3 =
    fun timelineResult previousResult ->
        log "-----------task3 started..."
        log previousResult
        // delay-------------------------------
        let f = fun _ ->
            log "...task3 done"
            timelineResult
            |> nextTN (NullableT 3)
            |> ignore
        setTimeout f 1500

let taskLog =
    fun timelineResult previousResult ->
        log "-----------taskLog started..."
        log previousResult

let timelineStarter = Timeline Null //tasks disabled initially

let task123 =
    task1 +| task2 +| task3

let task21 = task2 +& task1

let task12321 = task123 +& task21

log "test"

timelineStarter
|> taskT task12321
|> taskT task1
//|> taskT task3
//|> taskT task3
//|> taskT task123
|> taskT taskLog
|> ignore

let start =
    fun _ ->
        log "start" // timeline will start
        timelineStarter
        |> nextTN (NullableT 0)
        |> ignore

setTimeout start 2000


let x = NullableT 1
log x // T 1

let y = NullableT x
log y // T 1
// auto flatten