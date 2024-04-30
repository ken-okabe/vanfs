module MaterialUI
open Browser
open Browser.Types
open Fable.Core.JsInterop
open Van.Basic // import tags, add

let div: Tag = tags?div
let form: Tag = tags?form

let fluentCard: Tag = tags?``fluent-card``
let mdFilledTextField: Tag = tags?``md-filled-text-field``
let mdTextButton: Tag = tags?``md-text-button``
let mdOutlinedButton: Tag = tags?``md-outlined-button``

let Form =
    fun _ ->
        fluentCard [
            {|``class``="custom3"|}
            form [
                div [
                    {|``class``="row"|}
                    mdFilledTextField [
                        {|
                        label="First name"
                        name="first-name"
                        required=""
                        autocomplete="given-name"
                        |}
                    ]
                    mdFilledTextField [
                        {|
                        label="Last name"
                        name="last-name"
                        required=""
                        autocomplete="family-name"
                        |}
                    ]
                ]
                div [
                    {|``class``="row buttons"|}
                    mdTextButton [
                        {|``type``= "reset"|}
                        "Reset"
                    ]
                    mdOutlinedButton [
                        {|``type``= "submit"|}
                        "Submit"
                    ]
                ]
            ]
        ]

add [document.body; Form()]
|> ignore