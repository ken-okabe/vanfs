namespace Van
module TimelineElementTaskOr =

    open Van.TimelineElement
    open Van.Nullable
    open Van.TimelineElementNullable
    open Van.TimelineElementTask

    let taskOr =
        fun task1 task2 ->
            fun timelineResult12 previousResult12 ->
                let task12 =
                    fun timelineResult previousResult ->
                        match hasValue timelineResult12 with
                        | true ->
                            ()
                        | false ->
                            timelineResult12
                            |> nextTN previousResult
                            |> ignore

                let timelineStarter =
                    Timeline (NullableT previousResult12)
                // start task1 and task2 immediately
                timelineStarter
                |> taskT task1
                |> taskT task12
                |> ignore

                timelineStarter
                |> taskT task2
                |> taskT task12
                |> ignore


    let (+|) = taskOr


