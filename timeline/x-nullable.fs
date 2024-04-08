namespace Timeline
module Nullable =

    let isNullableT (obj: obj) =
        let check =
            obj.GetType().GetProperty("NullableType")
        if check = null
        then false
        else true

    type NullableT<'a> =
        | Null
        | NullableT of 'a
        with member this.NullableType = true
             member this.Value
                    = match this with
                        | Null -> failwith "Value is null"
                        | NullableT a ->
                            if isNullableT (box a)
                            then //downcast to Nullable type
                                ((box a) :?> NullableT<'a>).Value
                            else
                                a



