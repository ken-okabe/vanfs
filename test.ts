import { transformWithEsbuild } from "vite";

let main =
    () => [undefined]
        .map(() => console.log("Hello"))
        .map(() => console.log("world!"));

main();


let times =
    a => b =>
        a * b

let times3 =
    times(3)

let times34 =
    times3(4) // 12

times(3)(4) // 12