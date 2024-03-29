import van from 'vanjs-core'

import { cssURLs } from '../../web-imports/css-urls';

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

export let tags =
    new Proxy(van.tags, {
        get: (target, property) => {
            return n(target[String(property)]);
        }
    });

export let add = n(van.add);

