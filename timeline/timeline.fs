namespace Timeline
module Timeline =

    type Timeline<'a> =
        { mutable lastVal: 'a
          mutable _fns: list<'a -> unit> }

    let Timeline =
        fun a ->
            { lastVal = a
              _fns = [] }

    let nextT =
        fun a timeline ->
            timeline.lastVal <- a // mutable
            timeline._fns
            |> List.iter (fun f -> f a) //perform all fns in the list
            timeline // return the modified timeline

    let bindT =
        fun monadf timelineA ->
            let timelineB = timelineA.lastVal |> monadf
            let newFn =
                fun a ->
                    timelineB
                    |> nextT (a |> monadf).lastVal
                    |> ignore
            timelineA._fns <- timelineA._fns @ [ newFn ]
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
