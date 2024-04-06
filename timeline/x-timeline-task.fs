namespace Timeline
module TimelineTask =

    open Timeline.Timeline
    open Timeline.TimelineNullable
    open System

    let taskT =
        fun task ->
            fun timelineStarter ->
                let timelineResult = Timeline Null
                let coreTask = task timelineResult
                timelineStarter
                |> bindTN coreTask
                |> ignore
                timelineResult
    //--------------------------
    let (+>) =
        fun task1 task2 ->
            fun timelineResult previousResult ->
                task1 timelineResult previousResult
                |> taskT task2
