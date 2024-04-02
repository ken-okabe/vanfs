# VanFS

**VanFS is a project template** for 1:1 bindings from [F#](https://fsharp.org/) to [VanJS](https://vanjs.org/) (A tiny Reactive UI Framework without React/JSX) + [WebComponents](https://m3.material.io/develop/web) + FRP ([Functional reactive programming](https://en.wikipedia.org/wiki/Functional_reactive_programming))

## What is [VanJS](https://vanjs.org/)?

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712047413143.png)

https://vanjs.org/

> **VanJS**  ([abbreviated Vanilla JavaScript](https://vanjs.org/about#name)) is an   ***ultra-lightweight***  ,   ***zero-dependency***  , and   ***unopinionated***   Reactive UI framework based on pure vanilla JavaScript and DOM. Programming with  **VanJS**  feels like building React apps in a [scripting language](https://vanjs.org/about#story), without JSX. Check-out the Hello World code below:

### VanJS code in JavaScript

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/javascript.svg">

```js
import van from "vanjs-core"

const { a, p, div, li, ul } = van.tags
// Reusable components can be just pure vanilla JavaScript functions.
// Here we capitalize the first letter to follow React conventions.
const Hello =
    () =>
        div(
            p("👋Hello"),
            ul(
                li("🗺️World"),
                li(a({ href: "https://vanjs.org/" }, "🍦VanJS")),
            ),
        )

van.add(document.body, Hello())
```

##  VanFS is a F# project template for one-to-one direct bindings of VanJS

### VanFS code in F#

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
module HelloApp
open Browser
open Browser.Types
open Fable.Core.JsInterop
open Van.Basic // import tags, add

let a: Tag = tags?a
let p: Tag = tags?p
let div: Tag = tags?div
let ul: Tag = tags?ul
let li: Tag = tags?li

let Hello =
    fun _ ->
        div [
            p ["👋Hello"]
            ul [
                li ["🗺️World"]
                li [a [{|href="https://vanjs.org/"|}; "🍦VanJS"]]
            ]
        ]

add [document.body; Hello()]
|> ignore
```

## Why we should avoid using JavaScript

**VanJS is a library based on vanilla JavaScript for well-established reasons.**

However, to take full advantage of  **VanJS** , we should consider using alternative languages instead of JavaScript, which are commonly referred to as  **AltJS** .

One of the critical reasons is that  **JavaScript is not a type-safe language** , which can lead to runtime errors and bugs.

In fact, in modern web development, JavaScript has increasingly become a compile target from other languages, such as [TypeScript](https://www.typescriptlang.org/).

**TypeScript -> JavaScript**

## VanJS can be considered as a compile target from an AltJS

**AltJS -> VanJS**

## Why we should avoid using TypeScript and migrate to F#

Undoubtedly, TypeScript is the most commonly used AltJS. It is a superset of JavaScript that adds type safety and other features.  **So why not use TypeScript?**

There are many reasons, but chief among them is developer  **productivity** .

For instance, the below are the identical code written in TypeScript and F#.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/typescript.svg">

```ts
let bindT = <A, B>
    (monadf: (a: A) => Timeline<B>) =>
    (timelineA: Timeline<A>): Timeline<B> => {
        let timelineB = monadf(timelineA.lastVal);
        let newFn = (a: A) => {
            nextT(monadf(a).lastVal)(timelineB);
            return undefined;
        };
        timelineA.lastFns = timelineA.lastFns.concat([newFn]);
        return timelineB;
    };
```

In TypeScript, compared with legacy JavaScript, an additional step is required to add type signatures to all variables, functions, and parameters.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
let bindT =
    fun monadf timelineA ->
        let timelineB = timelineA.lastVal |> monadf
        let newFn =
            fun a ->
                timelineB
                |> nextT (a |> monadf).lastVal
                |> ignore
        timelineA.lastFns <- timelineA.lastFns @ [ newFn ]
        timelineB
```

Such a clean code to write and read!

In F#, we rarely need to add types manually thanks to its powerful type inference. This makes F# development feel similar to legacy JavaScript coding.

In reality, it is much more than that.

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711717723241.png)

The powerful F# compiler  **automatically generates type annotations**  in VSCode editor, eliminating the need for manual typing that TypeScript demands.

## F# as an AltJS: A Comparison with TypeScript

F# is generally recognized as running on the [.NET Framework](https://dotnet.microsoft.com/), but just as TypeScript is compiled to JavaScript, F# is also compiled to JavaScript.

- **TypeScript -> JavaScript**

- **F# -> JavaScript**

More precisely,

>  **TypeScirpt**  
⬇ TypeScript Compiler running on [Node.js](https://nodejs.org/)  (`npx tsc`)  
 **JavaScript**  running in the Browser

>  **F#**  
⬇ [Fable Compiler](https://github.com/fable-compiler/Fable) running on [.NET](https://dotnet.microsoft.com/)  (`dotnet fable`)  
 **JavaScript**  running in the Browser

Therefore, the backbone of **VanFS**  is [Fable](https://github.com/fable-compiler/Fable).

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712070754189.png)

Fable brings F# to the browser.

## Why browser? Why VanJS?

Lots of why here.

[Frontend app development](./README-why.md)

## Build a VanFS project template

#### Prerequisites

- [.NET SDK](https://dotnet.microsoft.com/download/dotnet)

- [Node.js](https://nodejs.org/en/download) and npm CLI or Alternatives ([Bun](https://bun.sh/) / [Deno](https://deno.com/) / [yarn](https://yarnpkg.com/) etc.)

A **VanFS/Fable**  project is a hybrid of  **F#.NET project**  and  **npm project** .

See [Fable Setup Documentaion](https://fable.io/docs/getting-started/setup.html)

---

#### Quick Start

```sh
git clone https://github.com/ken-okabe/vanfs
cd vanfs
dotnet tool install fable
dotnet add package Fable.Core
dotnet add package Fable.Browser.Dom
npm init -y
npm i -D vanjs-core
npm i -D vite
```

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711727772764.png)

#### or Create a project from scratch

```sh
mkdir my-project
cd my-project
dotnet new console -lang F#
dotnet new tool-manifest
dotnet tool install fable
dotnet add package Fable.Core
dotnet add package Fable.Browser.Dom
npm init -y
npm i -D vanjs-core
npm i -D vite
# Copy&Place `van-api` `web-imports` directory
# Copy&Place `index.html` `Program.fs` `vite.config.ts` file
# modify `my-project.fsproj`
#  <ItemGroup>
#    <Compile Include="van-api/fs/*" />
#    <Compile Include="Program.fs" />
#  </ItemGroup>
```

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711729299132.png)

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <RootNamespace>my_project</RootNamespace>
  </PropertyGroup>

  <ItemGroup>
    <Compile Include="van-api/fs/*" />
    <Compile Include="Program.fs" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="Fable.Browser.Dom" Version="2.16.0" />
    <PackageReference Include="Fable.Core" Version="4.3.0" />
  </ItemGroup>

</Project>
```

---

## Compile F# to JavaScript

```sh
dotnet fable watch
```

## Live Preview with Vite

```sh
npx vite
```

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711730067105.png)

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711730144988.png)

## CSS

Everything we need to customize or import is located under `web-imports` directory.

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711754186205.png)

#### /web-imports/custom.css

```css
body {
    font-family: sans-serif;
    padding: 1em;
    background-color: beige;
  }
```

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711754561732.png)

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/separator.svg">

# Web Components

**VanFS** can leverage custom HTML tags provided by  **Web Components** with  **design systems** : [Microsoft Fluent](https://fluent2.microsoft.design/), [Google Material Design](https://m3.material.io/), etc. .

---

## [Fluent](https://fluent2.microsoft.design/)

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711756843224.png)

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711756903076.png)

https://github.com/microsoft/fluentui/

## Install the Fluent UI Web Components with NPM or Alternatives

https://www.npmjs.com/package/@fluentui/web-components

```sh
npm install @fluentui/web-components
```

## Import and Register the web components

Let's use Fruent  Web **Card**  and  **Checkbox**.

https://learn.microsoft.com/en-us/fluent-ui/web-components/components/card?pivots=typescript

https://learn.microsoft.com/en-us/fluent-ui/web-components/components/checkbox?pivots=typescript

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711754186205.png)

#### /web-imports/components.ts

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/typescript.svg">

```ts
import {
    provideFluentDesignSystem,
    fluentCard,
    fluentCheckbox
} from "@fluentui/web-components";

provideFluentDesignSystem()
    .register(
        fluentCard()
    );

provideFluentDesignSystem()
    .register(
        fluentCheckbox()
    );
```

## Some Web Components use CSS

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711754186205.png)

#### /web-imports/custom.css

```css
body {
    font-family: sans-serif;
    padding: 1em;
    background-color: beige;
  }

.custom {
    --card-width: 200px;
    --card-height: 150px;
    padding: 22px;
  }
```

## Use Web Components from `Program.fs`

#### Program.fs

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
module WebComponentsApp
open Browser
open Browser.Types
open Fable.Core.JsInterop
open Van.Basic // import tags, add

let br : Tag = tags?br

// Define the fluent-card and fluent-checkbox tags
let fluentCard: Tag = tags?``fluent-card``
let fluentCheckbox: Tag = tags?``fluent-checkbox``

let List =
    fun _ ->
        fluentCard [
            {|``class``="custom"|}
            // class is a reserved word in F#
            // so we use backticks to escape it
            fluentCheckbox ["Did you check this?"]
            br []
            fluentCheckbox [{|``checked``=true; disabled=true|}; "Is this disabled?"]
            br []
            fluentCheckbox [{|``checked``=true|}; "Checked by default?" ]
        ]

add [document.body; List()]
|> ignore
```

## Clean the fable project and compile again

When major changes are made, cleaning the Fable project is sometimes necessary.

```sh
dotnet fable clean

dotnet fable watch
```

## Live Preview with Vite

```sh
npx vite
```

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711758425606.png)

---

## [Material Design](https://m3.material.io/)

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711759476213.png)

https://material-web.dev/about/intro/

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711759837554.png)

https://github.com/material-components/material-web

## Install the Material Web Components with NPM or Alternatives

https://material-web.dev/about/quick-start/

https://www.npmjs.com/package/@material/web

```sh
npm install @material/web
```

## Import the web components

Let's use Material web **Icon Buttons**.

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711760987250.png)

https://material-web.dev/components/icon-button/

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711754186205.png)

#### /web-imports/components.ts

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/typescript.svg">

```ts
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button.js';
```

## Material Web Components use Google Fonts/Icons

https://m3.material.io/styles/icons/overview

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711761560892.png)

https://fonts.google.com/icons

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711761915503.png)

## Install Google Fonts/Icons

Obtain required CSS URLs from the Google Fonts page.

https://fonts.google.com/icons?selected=Material+Symbols+Outlined:star:FILL@0;wght@400;GRAD@0;opsz@24

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712042147933.png)

Add the CSS URL to

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711754186205.png)

#### /web-imports/css-urls.ts

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/typescript.svg">

```ts
export let cssURLs = [
    "../../web-imports/custom.css",

    "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
];
```

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/separator.svg">

# Functional Reactive Programming (FRP)

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712039784885.png)

## Timeline

#### Program.fs

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
module CounterApp

module Program

open Browser
open Browser.Types
open Fable.Core.JsInterop

open Van.Basic // import tags, add
open Van.TimelineElement // import Timeline

let h2: Tag = tags?h2

let fluentCard: Tag = tags?``fluent-card``
let icon: Tag = tags?``md-icon``
let iconButton: Tag = tags?``md-icon-button``

let Counter =
    fun _ ->
        let counter = Timeline 0

        counter
        |> bindT logT
        |> ignore

        fluentCard [
            {|``class``="custom"|}

            h2 ["❤️ "; counter.el]
            iconButton [{|onclick =
                        fun _ ->
                            counter
                            |> nextT (counter.lastVal + 1)|}

                        icon ["thumb_up"]
                        ]
            iconButton [{|onclick =
                        fun _ ->
                            counter
                            |> nextT (counter.lastVal - 1)|}

                        icon ["thumb_down"]
                        ]
        ]

add [document.body; Counter()]
|> ignore
```

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711997650375.png)

## Timeline Nullable

#### Program.fs

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
module Number

open Browser
open Browser.Types
open Fable.Core.JsInterop

open Van.Basic // import tags, add
open Van.TimelineElement // import Timeline
open Van.TimelineElementNullable // import Null etc.
open System

let h4: Tag = tags?h4

let fluentCard: Tag = tags?``fluent-card``

let fluentTextField: Tag = tags?``fluent-text-field``

let Number =
    fun _ ->
        let number = Timeline Null

        let numberX2 =
            number
            |> mapTN (fun n -> Nullable(n * 2)) //System.Nullable

        fluentCard [
            {|``class``="custom1"|}

            h4 [ "Number" ]
            fluentTextField [
                {|
                appearance="outline"
                required=true
                ``type``="number"
                placeholder="1"
                oninput=
                    fun e ->
                        let value =
                            if e?target?value=""
                            then Null
                            else Nullable e?target?value
                            
                        if value=Null // clear the output textField
                        then numberX2
                             |> nextTN Null
                             |> ignore
                             document.getElementById("output-field")?value
                                <- "" // clear the output textField
                        else ()

                        number
                        |> nextTN value
                        |> ignore
                |}
            ]

            h4 [ "Number × 2" ]
            fluentTextField [
                {|
                appearance="outline"
                readonly=true
                placeholder="2"
                value=numberX2.el
                id="output-field"
                |}
            ]

        ]

add [document.body; Number()]
|> ignore
```

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712011529413.png)

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712011575293.png)

## Timeline Task

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712038600017.png)

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712038609796.png)