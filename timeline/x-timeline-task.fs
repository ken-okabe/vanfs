namespace Timeline
module TimelineTask =

    open Timeline.Timeline
    open Timeline.TimelineNullable
    open System

    let taskT =
        fun task ->
            fun taskStarter ->
                let timelineResult = Timeline Null
                let coreTask = task timelineResult
                taskStarter
                |> bindTN coreTask
                |> ignore
                timelineResult
    //--------------------------
    let (+>) =
        fun task1 task2 ->
            fun timelineResult previousResult ->
                task1 timelineResult previousResult
                |> taskT task2
