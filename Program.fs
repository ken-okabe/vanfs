module CounterApp

open Browser
open Browser.Types
open Fable.Core.JsInterop

open Van.Basic // import tags, add
open Van.TimelineElement // import Timeline

let div: Tag = tags?div
let h2: Tag = tags?h2
let icon: Tag = tags?``md-icon``
let iconButton: Tag = tags?``md-icon-button``

let Counter =
    fun _ ->
        let counter = Timeline 0

        counter
        |> mapT (fun value ->
                     console.log $"Counter: {value}")
        |> ignore

        div [
            h2 ["❤️ "; counter.el]
            iconButton [
                {|onclick = fun _ ->
                                counter
                                |> nextT (counter.lastVal + 1)
                |}
                icon ["thumb_up"]
            ]
            iconButton [
                {|onclick = fun _ ->
                                counter
                                |> nextT (counter.lastVal - 1)
                |}
                icon ["thumb_down"]
            ]
        ]

add [document.body; Counter()]
|> ignore