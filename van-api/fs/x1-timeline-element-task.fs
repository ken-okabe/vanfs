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
