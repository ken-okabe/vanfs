import van from 'vanjs-core'

import '../../web-imports/components'
import { cssURLs } from '../../web-imports/css';

// css imports
cssURLs.forEach(url => {
    let stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = url;
    document.head.appendChild(stylesheet);
});

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
