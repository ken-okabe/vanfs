namespace Van
module TimelineElementTaskAnd=

    open Van.TimelineElement
    open Van.Nullable
    open Van.TimelineElementNullable
    open Van.TimelineElementTask

    let taskAnd =
        fun task1 task2 ->
            fun timelineResult12 previousResult12 ->

                let timelineResult1 = Timeline Null
                let timelineResult2 = Timeline Null

                let task1_ =
                    fun timelineResult previousResult ->
                        match hasValue timelineResult2 with
                        | true ->
                            let listResult12 =
                                [
                                    timelineResult1.lastVal
                                    timelineResult2.lastVal
                                ]

                            timelineResult12
                            |> nextTN (NullableT listResult12)
                            |> ignore

                        | false -> () // do nothing

                        timelineResult

                let task2_ =
                    fun timelineResult previousResult ->
                        match hasValue timelineResult1 with
                        | true ->
                            let listResult12 =
                                [
                                    timelineResult1.lastVal
                                    timelineResult2.lastVal
                                ]

                            timelineResult12
                            |> nextTN (NullableT listResult12)
                            |> ignore

                        | false -> () // do nothing

                        timelineResult


                let timelineStarter =
                    Timeline (NullableT true)
                // start task1 and task2 immediately
                timelineStarter
                |> taskT task1
                |> taskT task1_
                |> ignore

                timelineStarter
                |> taskT task2
                |> taskT task2_
                |> ignore

                timelineResult12

    let (+&) =
        fun task1 task2 ->
            taskAnd task1 task2