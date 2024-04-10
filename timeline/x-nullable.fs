namespace Timeline
module Nullable =

    type NullableT<'a> =
        | Null
        | T of 'a
        member this.Value
              = match this with
                | Null -> failwith "Value is null"
                | T a -> a

    let NullableT a =
        match box a with
        | :? NullableT<'a> as nullable -> nullable
        | _ -> T a