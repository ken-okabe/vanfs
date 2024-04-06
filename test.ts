import van from "vanjs-core"

const { button, div, h2 } = van.tags

const Counter =
    () => {
        const counter = van.state(0)

        van.derive(() =>
            console.log(`Counter: ${counter.val}`))

        return div(
            h2("❤️ ", counter),
            button(
                {
                    onclick: () => ++counter.val
                },
                "👍"
            ),
            button(
                {
                    onclick: () => --counter.val
                },
                "👎"
            ),
        )
    }

van.add(document.body, Counter())


let double = a => a * 2;

let arrayA = [1];

let arrayB =
    arrayA.map(double);