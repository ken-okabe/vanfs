namespace Van
module TimelineNullableElement =

    open Van.TimelineElement
    open Fable.Core.JsInterop
    open System

    let Null = Nullable ()

    let nextTN =
        fun nullable timeline ->
            timeline.lastVal <- nullable // mutable
            if nullable = Null
            then () // do nothing
            else timeline.lastFns
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
                else timelineA.lastVal.Value |> monadf
            let newFn =
                fun nullable ->
                    if nullable = Null
                    then () // do nothing
                    else timelineB
                            |> nextTN (nullable.Value |> monadf).lastVal
                            |> ignore
            timelineA.lastFns <- timelineA.lastFns @ [ newFn ] // mutable
            timelineB
    //----------------------------------------------
    let mapTN =
        fun f -> (f >> Timeline) |> bindTN

    //==============================================================
    let taskT =
        fun coreTask ->
            fun taskStart ->
                let taskResult = Timeline Null
                let task = coreTask taskResult
                taskStart
                |> bindTN task
                |> ignore
                taskResult

