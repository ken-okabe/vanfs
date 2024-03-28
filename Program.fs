module CounterApp

open Browser
open Browser.Types
open Fable.Core.JsInterop

open Van.Basic // import tags, add
open Van.WebComponents // import componentTags
open Van.Timeline // import Timeline

// use the identical tag names for the standard HTML tags
let div: Tag = tags?div
let h2: Tag = tags?h1

// any tag names can be defined for each componentTags
let icon: Tag = componentTags?``md-icon``
let iconButton: Tag = componentTags?``md-icon-button``

let Counter =
    fun _ ->
        let counter = Timeline 0

        counter
        |> bindT logT
        |> ignore

        div [
            h2 [ "❤️ "; counter.el; ];
            iconButton [{|onclick =
                        fun _ ->
                            counter
                            |> nextT (counter.lastVal + 1)|};

                        icon ["thumb_up"]
                        ];
            iconButton [{|onclick =
                        fun _ ->
                            counter
                            |> nextT (counter.lastVal - 1)|};

                        icon ["thumb_down"]
                        ];
        ]

add [document.body; Counter()]
|> ignore