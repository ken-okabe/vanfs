namespace Timeline
module Timeline =

    type Timeline<'a> =
        { mutable lastVal: 'a
          mutable lastFns: list<'a -> unit> }

    let Timeline =
        fun a -> { lastVal = a; lastFns = [] }

    let nextT =
        fun a timeline ->
            timeline.lastVal <- a // mutable
            timeline.lastFns
            |> List.iter (fun f -> f a) //perform all fns in the list
            timeline // return the modified timeline

    let bindT =
        fun monadf timelineA ->
            let timelineB = timelineA.lastVal |> monadf // f a
            let newFn =
                fun a ->
                    timelineB
                    |> nextT (a |> monadf).lastVal
                    |> ignore
            timelineA.lastFns <- timelineA.lastFns @ [ newFn ] // mutable
            timelineB
    //----------------------------------------------
    let mapT =
        fun f -> (f >> Timeline) |> bindT

    //==============================================================
    let log = // 'a -> unit
        fun a -> printfn "%A" a

    let logT =
        fun a ->
            log a
            Timeline a

