namespace Van
module TimelineElementTaskOr=

    open Van.TimelineElement
    open Van.Nullable
    open Van.TimelineElementNullable
    open Van.TimelineElementTask

    let taskOr =
        fun task1 task2 ->
            fun timelineResult12 previousResult12 ->
                let task12 =
                    fun timelineResult previousResult ->
                        if timelineResult12.lastVal = Null
                        then
                            timelineResult12
                            |> nextTN (NullableT previousResult)
                            |> ignore
                        else
                            ()  // do nothing
                        timelineResult

                let timelineStarter =
                    Timeline (NullableT true)
                // start task1 and task2 immediately
                timelineStarter
                |> taskT task1
                |> taskT task12
                |> ignore

                timelineStarter
                |> taskT task2
                |> taskT task12
                |> ignore

                timelineResult12

    let (+|) =
        fun task1 task2 ->
            taskOr task1 task2

