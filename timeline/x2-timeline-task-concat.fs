namespace Timeline
module TimelineTaskConcat =

    open Timeline.Timeline
    open Timeline.Nullable
    open Timeline.TimelineNullable
    open Timeline.TimelineTask

    let taskConcat =
        fun task1 task2 ->
            fun timelineResult12 previousResult12 ->
                let taskComplete =
                    fun timelineResult previousResult ->
                        timelineResult12 // need to inform to the parent timelineResult
                        |> nextTN previousResult
                        |> ignore

                let timelineStarter =
                    Timeline (NullableT previousResult12)
                // start the task immediately
                timelineStarter
                |> taskT task1
                |> taskT task2
                |> taskT taskComplete
                |> ignore

    let (+>) = taskConcat
