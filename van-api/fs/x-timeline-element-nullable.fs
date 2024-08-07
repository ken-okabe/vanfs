namespace Van
module TimelineElementNullable =

    open Van.TimelineElement
    open Van.Nullable
    open Fable.Core.JsInterop

    let nextTN =
        fun nullable timeline ->
            timeline.lastVal <- nullable // mutable
            if nullable = Null
            then () // do nothing
            else timeline._fns
                 |> List.iter (fun nullableFn -> nullableFn nullable)
                //perform all fns in the list
                // Update the native VanJS state object simultaneously.
                 timeline.el?``val`` <- nullable // <============ add
            timeline // return the modified timeline

    let bindTN =
        fun monadf timelineA ->
            let timelineB =
                if timelineA.lastVal = Null
                then Timeline Null
                else timelineA.lastVal |> monadf
            let newFn =
                fun nullable ->
                    if nullable = Null
                    then () // do nothing
                    else timelineB
                            |> nextTN (nullable |> monadf).lastVal
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