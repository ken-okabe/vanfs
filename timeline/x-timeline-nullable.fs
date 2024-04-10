namespace Timeline
module TimelineNullable =

    open Timeline.Timeline
    open Nullable

    let nextTN =
        fun nullable timeline ->
            timeline.lastVal <- nullable // mutable
            if nullable = Null
            then () // do nothing
            else timeline._fns
                 |> List.iter (fun nullableFn -> nullableFn nullable)
                 //perform all fns in the list
            timeline // return the modified timeline

    let bindTN =
        fun monadf timelineA ->
            let timelineB =
                if timelineA.lastVal = Null
                then Timeline Null
                else timelineA.lastVal.Value |> monadf
            let newFn =
                fun nullable ->
                    if nullable = Null
                    then () // do nothing
                    else timelineB
                            |> nextTN (nullable.Value |> monadf).lastVal
                            |> ignore
            timelineA._fns <- timelineA._fns @ [ newFn ] // mutable
            timelineB
    //----------------------------------------------
    let mapTN =
        fun f -> (f >> Timeline) |> bindTN

    //==============================================================
    let hasValue =
        fun timeline ->
            if timeline.lastVal = Null
                then
                    false
                else
                    true