namespace Van
module Timeline =

    open Fable.Core.JsInterop

    type StateElement<'a> =
        {``val``: 'a} // native VanJS state object
    // val is a reserved word in F#
    // so we use backticks to escape it

    let state<'a> (a: 'a):StateElement<'a> =
        importMember "../ts/state"

    type Timeline<'a> =
        { mutable lastVal: 'a
          mutable lastFns: list<'a -> unit>
          mutable el: StateElement<'a>} // native VanJS state object

    let Timeline =
        fun a ->
            { lastVal = a;
              lastFns = [];
              el = state a} // native VanJS state object

    let nextT =
        fun a timeline ->
            timeline.lastVal <- a // mutable
            timeline.lastFns
            |> List.iter (fun f -> f a) //perform all fns in the list
            // Update the native VanJS state object simultaneously.
            timeline.el?``val`` <- a
            //----------------------------------------------------
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
    //----------------------------------------------
    let log = // 'a -> unit
        fun a -> printfn "%A" a

    let logT =
        fun a ->
            log a
            Timeline a