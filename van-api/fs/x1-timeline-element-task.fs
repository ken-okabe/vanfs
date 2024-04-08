namespace Van
module TimelineElementTask =

    open Van.TimelineElement
    open Van.Nullable
    open Van.TimelineElementNullable



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
