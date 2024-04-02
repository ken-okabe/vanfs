module Tasks

open Browser
open Browser.Types
open Fable.Core.JsInterop

open Van.Basic // import tags, add
open Van.TimelineElement // import Timeline
open Van.TimelineElementNullable // import Null etc.
open Van.TimelineElementTask
open System

open System.Timers
let setTimeout f delay =
    let timer = new Timer(float delay)
    timer.AutoReset <- false
    timer.Elapsed.Add(fun _ -> f())
    timer.Start()
let br: Tag = tags?``br``
let fluentCard: Tag = tags?``fluent-card``
let linerProgress: Tag = tags?``md-linear-progress``

let Tasks =
    fun _ ->
        let progressInit = false
        let progressStart = true
        let progressDone = false
        let percentInit = 0.0
        let percentStart = 0.0//{|indeterminate=true|}
        let percentDone = 1.0

        let timelineProgress1 = Timeline progressInit
        let timelineProgress2 = Timeline progressInit
        let timelineProgress3 = Timeline progressInit
        let timelinePercent1 = Timeline percentInit
        let timelinePercent2 = Timeline percentInit
        let timelinePercent3 = Timeline percentInit

        let taskStart =
            fun timelineProgress timelinePercent ->
                timelineProgress
                |> nextT progressStart
                |> ignore
                timelinePercent
                |> nextT percentStart
                |> ignore

        let taskDone =
            fun timelineProgress timelinePercent taskResult->
                timelineProgress
                |> nextT progressDone
                |> ignore
                timelinePercent
                |> nextT percentDone
                |> ignore
                taskResult
                |> nextTN (Nullable 999)
                |> ignore

        let task1 =
            fun taskResult previousResult ->
                log "-----------task1 started..."
                taskStart timelineProgress1 timelinePercent1
                // delay-------------------------------
                let f = fun _ ->
                    log "...task1 done"
                    taskDone timelineProgress1 timelinePercent1 taskResult
                setTimeout f 2500
                taskResult

        let task2 =
            fun taskResult previousResult ->
                log "-----------task2 started..."
                taskStart timelineProgress2 timelinePercent2
                // delay-------------------------------
                let f = fun _ ->
                    log "...task2 done"
                    taskDone timelineProgress2 timelinePercent2 taskResult
                setTimeout f 2500
                taskResult

        let task3 =
            fun taskResult previousResult ->
                log "-----------task3 started..."
                taskStart timelineProgress3 timelinePercent3
                // delay-------------------------------
                let f = fun _ ->
                    log "...task3 done"
                    taskDone timelineProgress3 timelinePercent3 taskResult
                setTimeout f 2500
                taskResult

        let taskStarter = Timeline Null //tasks disabled initially

        let task123 =
            task1 +>
            task2 +>
            task3

        taskStarter
        |> taskT task123
        |> ignore

        let start =
            fun _ -> // taskes enabled
                taskStarter
                |> nextTN (Nullable 0)
                |> ignore

        setTimeout start 2000

        fluentCard [
            {|``class``="custom2"|}
            br []
            linerProgress [
                {|indeterminate=timelineProgress1.el
                  value=timelinePercent1.el|}
            ]
            br []
            linerProgress [
                {|indeterminate=timelineProgress2.el
                  value=timelinePercent2.el|}
            ]
            br []
            linerProgress [
                {|indeterminate=timelineProgress3.el
                  value=timelinePercent3.el|}
            ]
        ]

add [document.body; Tasks()]
|> ignore