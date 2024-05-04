module HelloApp
open Browser
open Browser.Types
open Fable.Core.JsInterop
open Van.Basic // import tags, add

let a: Tag = tags?a
let p: Tag = tags?p
let div: Tag = tags?div
let ul: Tag = tags?ul
let li: Tag = tags?li

let Hello =
    fun _ ->
        div [
            p ["👋Hello"]
            ul [
                li ["🗺️World"]
                li [a [{|href="https://vanjs.org/"|}; "🍦VanJS"]]
            ]
        ]

add [document.body; Hello()]
|> ignore

let double x = x * 2

let result1 =
    double(1)

let result1' =
    1 |> double

let result2 =
    double(double(1))

let result2' =
    1 |> double |> double


let reducer =
    List.reduce (+)

let sum =
    [0;1;2;3;4;5]
    |> reducer

//15

let sum =
    [0;1;2;3;4;5]
    |> List.reduce (+)