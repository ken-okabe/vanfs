namespace Timeline
module TimelineTask =

    open Timeline.Timeline
    open Timeline.Nullable
    open Timeline.TimelineNullable

    let taskT =
        fun task ->
            fun timelineStarter ->
                let timelineResult = Timeline Null
                let monadF =
                    (fun _ ->
                        task timelineResult timelineStarter.lastVal)
                    >> (fun _  -> // dummy to make this function monadic
                            Timeline Null)

                timelineStarter
                |> bindTN monadF
                |> ignore

                timelineResult
                // Initially passed to the next task
                // as its timelineStarter with the value of Timeline Null

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