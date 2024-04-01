﻿module Number

open Browser
open Browser.Types
open Fable.Core.JsInterop

open Van.Basic // import tags, add
open Van.TimelineElement // import Timeline
open Van.TimelineNullableElement // import Null etc.
open System

let h4: Tag = tags?h4

let fluentCard: Tag = tags?``fluent-card``

let fluentTextField: Tag = tags?``fluent-text-field``

let Number =
    fun _ ->
        let number = Timeline Null

        let numberX2 =
            number
            |> mapTN (fun n -> Nullable(n * 2)) //System.Nullable

        fluentCard [
            {|``class``="custom1"|}

            h4 [ "Number" ]
            fluentTextField [
                {|
                appearance="outline"
                required=true
                ``type``="number"
                placeholder="1"
                oninput=
                    fun e ->
                        let value =
                            if e?target?value=""
                            then Null
                            else Nullable e?target?value
                            
                        if value=Null // clear the output textField
                        then numberX2
                             |> nextTN Null
                             |> ignore
                             document.getElementById("output-field")?value
                                <- "" // clear the output textField
                        else ()

                        number
                        |> nextTN value
                        |> ignore
                |}
            ]

            h4 [ "Number × 2" ]
            fluentTextField [
                {|
                appearance="outline"
                readonly=true
                placeholder="2"
                value=numberX2.el
                id="output-field"
                |}
            ]

        ]

add [document.body; Number()]
|> ignore