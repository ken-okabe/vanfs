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
                    >> (fun _  ->
                            timelineResult) // dummy to make this function monadic

                timelineStarter
                |> bindTN monadF
                |> ignore

                timelineResult
                // Initially passed to the next task
                // as its timelineStarter with the value of Timeline Null


    let composeTask =
        fun task1 task2 ->
            fun timelineResult previousResult ->
                //log "-----------task12 started..."
                let completeTask =
                    fun _timelineResult _previousResult ->
                        //log "--------task12 done.."
                        timelineResult // need to inform to the parent timelineResult
                        |> nextTN (NullableT _previousResult)
                        |> ignore

                Timeline (NullableT true) // start now
                |> taskT task1
                |> taskT task2
                |> taskT completeTask
                |> ignore

    let (+>) = composeTask

