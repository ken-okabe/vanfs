namespace Van
module Basic =

    open Browser.Types
    open Fable.Core.JsInterop

    type Tag = List<obj> -> Element

    let tags: obj
        = importMember "../ts/basic"

    let add: List<obj> -> Element
        = importMember "../ts/basic"
