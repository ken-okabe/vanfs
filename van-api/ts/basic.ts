import van from 'vanjs-core'

// unary function ([a,b,c,...]) in F#
// -> n-ary function (a,b,c,...) in VanJS
let n =
    f => array =>
        f(...array);

export let tags =
    new Proxy(van.tags, {
        get: (target, property) => {
            return n(target[String(property)]);
        }
    });

export let add = n(van.add);

