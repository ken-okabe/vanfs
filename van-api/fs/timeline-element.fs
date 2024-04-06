namespace Van
module TimelineElement =

    open Fable.Core.JsInterop

    type StateElement<'a> =
        {``val``: 'a} // native VanJS state object
    // val is a reserved word in F#
    // so we use backticks to escape it

    let state<'a> (a: 'a):StateElement<'a> =
        importMember "../ts/state"

    type Timeline<'a> =
        { mutable lastVal: 'a
          mutable _fns: list<'a -> unit>
          el: StateElement<'a> } // <== add native VanJS state object

    let Timeline =
        fun a ->
            { lastVal = a
              _fns = []
              el = state a } // <== add native VanJS state object

    let nextT =
        fun a timeline ->
            timeline.lastVal <- a // mutable
            timeline._fns
            |> List.iter (fun f -> f a) //perform all fns in the list
            // Update the native VanJS state object simultaneously.
            timeline.el?``val`` <- a // <======================= add
            //----------------------------------------------------
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