// module HelloApp
// open Browser
// open Browser.Types
// open Fable.Core.JsInterop
// open Van.Basic // import tags, add

// let a: Tag = tags?a
// let p: Tag = tags?p
// let div: Tag = tags?div
// let ul: Tag = tags?ul
// let li: Tag = tags?li

// let Hello =
//     fun _ ->
//         div [
//             p ["👋Hello"]
//             ul [
//                 li ["🗺️World"]
//                 li [a [{|href="https://vanjs.org/"|}; "🍦VanJS"]]
//             ]
//         ]

// add [document.body; Hello()]
// |> ignore


module CounterApp

open Browser
open Browser.Types
open Fable.Core.JsInterop

open Van.Basic // import tags, add
open Van.Timeline // import Timeline

let div: Tag = tags?div
let h2: Tag = tags?h2
let icon: Tag = tags?``md-icon``
let iconButton: Tag = tags?``md-icon-button``

let Counter =
    fun _ ->
        let counter = Timeline 0 // ① initialize an Timeline

        counter // ② the binary operation of the Timeline
        |> TL.map (fun value ->
                     console.log $"Counter: {value}")
        |> ignore
        // ignore the return value of `console.log`

        div [
            h2 ["❤️ "; counter.el] // 👈 `counter.el`
            iconButton [           // for Reactive DOM element
                {|onclick = fun _ ->
                                counter // ③ update the Timeline
                                |> TL.next ((counter |> TL.last) + 1)
                |}
                icon ["thumb_up"]
            ]
            iconButton [
                {|onclick = fun _ ->
                                counter // ③ update the Timeline
                                |> TL.next ((counter |> TL.last) - 1)
                |}
                icon ["thumb_down"]
            ]
        ]

add [document.body; Counter()]
|> ignore