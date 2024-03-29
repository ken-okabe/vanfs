import van from 'vanjs-core'

import '../../web-imports/components'

// unary function ([a,b,c,...]) in F#
// -> n-ary function (a,b,c,...) in VanJS
let n =
    f => array =>
        f(...array);

export let componentTags =
    new Proxy(van.tags, {
        get: (target, property) => {
            return n(target[String(property)]);
        }
    });
