namespace Timeline
module TimelineTaskAnd =

    open Timeline.Timeline
    open Timeline.Nullable
    open Timeline.TimelineNullable
    open Timeline.TimelineTask

    type ListResult<'a> =
        { results: List<'a> }

    let ListResult a =
        { results = a }

    let toList (nullable: NullableT<'a>) =
        match box nullable.Value with
        | :? ListResult<obj> as listResult ->
            listResult.results
        | _ -> [nullable]

    let taskAnd =
        fun task1 task2 ->
            fun timelineResult12 previousResult12 ->

                let timelineResult1 = Timeline Null
                let timelineResult2 = Timeline Null

                let task_ =
                    fun timelineCurrent timelineToCheck ->
                        fun timelineResult previousResult->

                            timelineCurrent
                                |> nextTN previousResult
                                |> ignore

                            match hasValue timelineToCheck with
                            | true ->
                                let list1 = timelineResult1.lastVal |> toList
                                let list2 = timelineResult2.lastVal |> toList

                                let listResult12 =
                                    ListResult (list1 @ list2)
                                    // { results = list_of_results }

                                timelineResult12
                                |> nextTN (NullableT listResult12)
                                |> ignore

                            | false -> ()

                let timelineStarter =
                    Timeline (NullableT previousResult12)
                // start task1 and task2 immediately
                timelineStarter
                |> taskT task1
                |> taskT (task_ timelineResult1 timelineResult2)
                |> ignore

                timelineStarter
                |> taskT task2
                |> taskT (task_ timelineResult2 timelineResult1)
                |> ignore


    let (+&) = taskAnd