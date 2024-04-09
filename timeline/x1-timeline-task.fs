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
                    >> (fun _  ->
                            timelineResult) // dummy to make this function monadic

                timelineStarter
                |> bindTN monadF
                |> ignore

                timelineResult
                // Initially passed to the next task
                // as its timelineStarter with the value of Timeline Null

    let taskComposed =
        fun task1 task2 ->
            fun timelineResult12 previousResult12 ->
                //log "-----------task12 started..."
                let taskComplete =
                    fun timelineResult previousResult ->
                        //log "--------task12 done.."
                        timelineResult12 // need to inform to the parent timelineResult
                        |> nextTN (NullableT previousResult)
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

