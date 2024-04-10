namespace Van
module TimelineElementTask =

    open Van.TimelineElement
    open Van.Nullable
    open Van.TimelineElementNullable

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

    let taskComposed =
        fun task1 task2 ->
            fun timelineResult12 previousResult12 ->
                let taskComplete =
                    fun timelineResult previousResult ->
                        timelineResult12 // need to inform to the parent timelineResult
                        |> nextTN previousResult
                        |> ignore

                let timelineStarter =
                    Timeline (NullableT true)
                // start the task immediately
                timelineStarter
                |> taskT task1
                |> taskT task2
                |> taskT taskComplete
                |> ignore

    let (+>) = taskComposed
