| Contents |
|--------------|
| [🍦  **VanFS** ](#vanfs) <br/>&nbsp;&nbsp;[<sub>📱 Versatility of Web Technology <br/>&nbsp;&nbsp;&nbsp;&nbsp;for Cross-Platform App Development<sub>](./README-why.md) |
| [🚀 Getting Started](#getting-started)|
| [🌐 Web Components](#web-components) |
| [⚡️ Functional Reactive Programming (FRP)](#frp)<br/>&nbsp;&nbsp;[<sub>💡 What is Functional Programming?</sub>](./README-whatisFP.md)||
| [⏱️ Timeline](#timeline) |
| [⏱️ Nullable Types](#nullable) |
| [⏱️ Timeline Nullable](#timeline-nullable) |
| [⏱️ Timeline Task](#timeline-task) |
| [⏱️ Timeline Task Concat](#timeline-task-concat) |
| [⏱️ Timeline Task Or](#timeline-task-or) |
| [⏱️ Timeline Task And](#timeline-task-and) |
| [💬 Discussions](https://github.com/ken-okabe/vanfs/discussions) |

###### vanfs

# 🍦 VanFS

**VanFS is a project template** for 1:1 bindings from [F#](https://fsharp.org/) to [VanJS](https://vanjs.org/) (A tiny Reactive UI Framework without React/JSX) + [WebComponents](https://m3.material.io/develop/web) + FRP ([Functional reactive programming](https://en.wikipedia.org/wiki/Functional_reactive_programming))

## What is VanJS?

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712047413143.png)

https://github.com/vanjs-org/van

>🍦 VanJS: World's smallest reactive UI framework. Incredibly Powerful, Insanely Small - Everyone can build a useful UI app in an hour.

https://vanjs.org

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

## VanFS is a F# project template for one-to-one direct bindings of VanJS

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

## Why VanJS is based on Vanilla JavaScript

[VanJS: About - the Story behind VanJS](https://vanjs.org/about#story)

>But I think, in a nutshell, the best way to describe it is:  ***VanJS**  is the scripting language for UI, just like bash is the  *scripting language*  for terminal.*

> *Being the scripting language for UI* , is the fundamental principle that guides the design of  **VanJS** . It's based on JavaScript so that it can work in as many environments as possibles, not only for websites, but also for webviews which most major OSes support.

[VanJS: About - How Did VanJS Get Its Name?](https://vanjs.org/about#name)

>Under the hood,  **VanJS**  stays truthful to Vanilla JavaScript as close as possible, as there is no transpiling, virtual DOM or any hidden logic.  **VanJS**  code can be translated to Vanilla JavaScript code in a very straightforward way.

## Why we should avoid using JavaScript

VanJS is a library based on Vanilla JavaScript for the well-established reasons.

However, to take full advantage of  **VanJS** , we should consider using  **alternative languages instead of JavaScript** , which are commonly referred to as  **AltJS** .

One of the critical reasons is that  **JavaScript is not a [type-safe language](https://en.wikipedia.org/wiki/Type_safety)** , which can lead to runtime errors and bugs.

In fact, in modern web development, JavaScript has increasingly become  **a compile target**  from other languages, such as [TypeScript](https://www.typescriptlang.org/).

**TypeScript -> JavaScript**

## VanJS can be regarded as a compile target from an AltJS

**VanFS (AltJS) -> VanJS**

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

The powerful F# compiler  **automatically generates type annotations**  in  **VSCode**  editor, eliminating the need for manual typing that TypeScript demands.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/note.svg">

While programmers may want to define fundamental object types that form the backbone of their code, in other places, if the F# compiler warns for a demand of manual type annotations, usually,  **something is wrong** .

In F#, if the compiler cannot infer the type, it often suggests that there may be mathematical inconsistencies.

In TypeScript, if the compiler cannot infer the type, it often suggests limitations in its type inference capabilities. This makes it hard to determine the precise cause of the problem.

As a result, F# programmers are naturally led to write mathematically consistent and rigorous code; unfortunately, this benefit **rarely** happens in TypeScript.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/notefooter.svg">

## F# as an AltJS: A Comparison with TypeScript

F# is generally recognized as running on the [.NET Framework](https://dotnet.microsoft.com/), but just as TypeScript is compiled to JavaScript, F# is also compiled to JavaScript.

- **TypeScript -> JavaScript**

- **F# -> JavaScript**

More precisely,

>  **TypeScirpt**  
⬇ [TypeScript Compiler](https://www.typescriptlang.org/docs/handbook/2/basic-types.html#tsc-the-typescript-compiler) running on [Node.js](https://nodejs.org/)  (`npx tsc`)   
**JavaScript**  running in the browser

>  **F#**  
⬇ [Fable Compiler](https://github.com/fable-compiler/Fable) running on [.NET](https://dotnet.microsoft.com/)  (`dotnet fable`)  
 **JavaScript**  running in the browser

Therefore, the backbone of **VanFS**  is [Fable](https://github.com/fable-compiler/Fable).

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712070754189.png)

**Fable enables F# code to be compiled to JavaScript and run in the browser.**

## Why browser? Why VanJS?

There are a lot of **Why** s here!

I've created a separate article on this topic since it's part of the larger frontend app development landscape and deserves a focused discussion with my own opinions.

### [Versatility of Web Technology for Cross-Platform App Development](./README-why.md)

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712154361707.png)

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/separator.svg">

| Contents |
|--------------|
| [🍦  **VanFS** ](#vanfs) <br/>&nbsp;&nbsp;[<sub>📱 Versatility of Web Technology <br/>&nbsp;&nbsp;&nbsp;&nbsp;for Cross-Platform App Development<sub>](./README-why.md) |
| [🚀 Getting Started](#getting-started)|
| [🌐 Web Components](#web-components) |
| [⚡️ Functional Reactive Programming (FRP)](#frp)<br/>&nbsp;&nbsp;[<sub>💡 What is Functional Programming?</sub>](./README-whatisFP.md)||
| [⏱️ Timeline](#timeline) |
| [⏱️ Nullable Types](#nullable) |
| [⏱️ Timeline Nullable](#timeline-nullable) |
| [⏱️ Timeline Task](#timeline-task) |
| [⏱️ Timeline Task Concat](#timeline-task-concat) |
| [⏱️ Timeline Task Or](#timeline-task-or) |
| [⏱️ Timeline Task And](#timeline-task-and) |
| [💬 Discussions](https://github.com/ken-okabe/vanfs/discussions) |

###### getting-started

# 🚀 Getting Started

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
dotnet restore # .NET project setup
npm i          #  npm project setup
```

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711727772764.png)

#### or Create a project from scratch

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711729299132.png)

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
#    <Compile Include="van-api/fs/*.fs" />
#    <Compile Include="Program.fs" />
#  </ItemGroup>
```

#### /my-project.fsproj

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <RootNamespace>my_project</RootNamespace>
  </PropertyGroup>

  <ItemGroup>
    <Compile Include="van-api/fs/*.fs" />
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

| Contents |
|--------------|
| [🍦  **VanFS** ](#vanfs) <br/>&nbsp;&nbsp;[<sub>📱 Versatility of Web Technology <br/>&nbsp;&nbsp;&nbsp;&nbsp;for Cross-Platform App Development<sub>](./README-why.md) |
| [🚀 Getting Started](#getting-started)|
| [🌐 Web Components](#web-components) |
| [⚡️ Functional Reactive Programming (FRP)](#frp)<br/>&nbsp;&nbsp;[<sub>💡 What is Functional Programming?</sub>](./README-whatisFP.md)||
| [⏱️ Timeline](#timeline) |
| [⏱️ Nullable Types](#nullable) |
| [⏱️ Timeline Nullable](#timeline-nullable) |
| [⏱️ Timeline Task](#timeline-task) |
| [⏱️ Timeline Task Concat](#timeline-task-concat) |
| [⏱️ Timeline Task Or](#timeline-task-or) |
| [⏱️ Timeline Task And](#timeline-task-and) |
| [💬 Discussions](https://github.com/ken-okabe/vanfs/discussions) |

###### web-components

# 🌐 Web Components

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

| Contents |
|--------------|
| [🍦  **VanFS** ](#vanfs) <br/>&nbsp;&nbsp;[<sub>📱 Versatility of Web Technology <br/>&nbsp;&nbsp;&nbsp;&nbsp;for Cross-Platform App Development<sub>](./README-why.md) |
| [🚀 Getting Started](#getting-started)|
| [🌐 Web Components](#web-components) |
| [⚡️ Functional Reactive Programming (FRP)](#frp)<br/>&nbsp;&nbsp;[<sub>💡 What is Functional Programming?</sub>](./README-whatisFP.md)||
| [⏱️ Timeline](#timeline) |
| [⏱️ Nullable Types](#nullable) |
| [⏱️ Timeline Nullable](#timeline-nullable) |
| [⏱️ Timeline Task](#timeline-task) |
| [⏱️ Timeline Task Concat](#timeline-task-concat) |
| [⏱️ Timeline Task Or](#timeline-task-or) |
| [⏱️ Timeline Task And](#timeline-task-and) |
| [💬 Discussions](https://github.com/ken-okabe/vanfs/discussions) |

###### frp

# ⚡️ Functional Reactive Programming (FRP)

## (1:1 bindings for composing UIs) + FRP

**VanFS**  is described as

---

1:1 bindings from F# to  **VanJS**  (A tiny Reactive UI Framework without React/JSX) + WebComponents + FRP

or

**VanFS**  is a F# project template for one-to-one direct bindings of  **VanJS**

---

**1:1 bindings is absolutely true within the scope of the basic features for composing UIs, but not a case for its state management.**

## VanJS is a framework that embraces Reactive Programming

VanJS reactively binds its state objects to corresponding DOM elements. This means that when a state object updates, the corresponding DOM element automatically updates as well. This approach is a common feature among declarative UI libraries such as React, SolidJS, etc.

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712039784885.png)

## VanJS state API

In order to utilize the state management, VanJS provides two APIs: `van.state` and `van.derive`.

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712106536645.png)

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712106745588.png)

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712106818761.png)

## VanFS is a framework that embraces Functional Reactive Programming (FRP)

**VanJS**  is **Reactive**.

**VanFS**  is  **Functional Reactive**.

## What is Functional Programming?

Given the critical significance of functional programming in modern software development, I have dedicated a separate article to exploring its key concepts and benefits.

### [💡 What is Functional Programming?](./README-whatisFP.md)

## VanFS provides binary operations to utilize the state management

In Functional Programming, everything is an expression or operation ([💡 What is Functional Programming?](./README-whatisFP.md)). Accordingly, VanFS provides  **binary operations for the reactive state management** .

$$
TimelineA ~ ~ * ~ ~ Function \quad  \rightarrow \quad  TimelineB
$$

$$
TimelineB \quad = \quad TimelineA ~ ~ * ~ ~ Function
$$

This binary operation corresponds to an operation in [spreadsheet apps](https://www.google.com/intl/en/sheets/about/).

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712461813235.png)

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712453265841.png)

-  $TimelineA \quad = \quad$ **A1**


-  $TimelineB \quad = \quad$ **B1**

-  $Function \quad = \quad$ ***fx***

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/note.svg">

This is the identical structure of:

$$
ListA ~ ~ * ~ ~ Function \quad  \rightarrow \quad  ListB
$$

$$
ListB \quad = \quad ListA ~ ~ * ~ ~ Function
$$

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1694006796227.png#gh-dark-mode-only)

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1694901961984.png#gh-light-mode-only)

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/notefooter.svg">

So, this is FRP.

**Functional Reactive Programming (FRP)**  is a programming paradigm that uses mathematical expressions, specifically  **binary operations** , as a means of implementing  **Reactive Programming** .

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/separator.svg">

| Contents |
|--------------|
| [🍦  **VanFS** ](#vanfs) <br/>&nbsp;&nbsp;[<sub>📱 Versatility of Web Technology <br/>&nbsp;&nbsp;&nbsp;&nbsp;for Cross-Platform App Development<sub>](./README-why.md) |
| [🚀 Getting Started](#getting-started)|
| [🌐 Web Components](#web-components) |
| [⚡️ Functional Reactive Programming (FRP)](#frp)<br/>&nbsp;&nbsp;[<sub>💡 What is Functional Programming?</sub>](./README-whatisFP.md)||
| [⏱️ Timeline](#timeline) |
| [⏱️ Nullable Types](#nullable) |
| [⏱️ Timeline Nullable](#timeline-nullable) |
| [⏱️ Timeline Task](#timeline-task) |
| [⏱️ Timeline Task Concat](#timeline-task-concat) |
| [⏱️ Timeline Task Or](#timeline-task-or) |
| [⏱️ Timeline Task And](#timeline-task-and) |
| [💬 Discussions](https://github.com/ken-okabe/vanfs/discussions) |

###### timeline

# ⏱️ Timeline

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/note.svg">

**Timeline**  is a fundamentally standalone FRP library, with no dependencies on  **VanJS**  or  **F#**  asynchronous features. [The codebase is a compact pure function implementation of approximately 30-40 lines of code.
](./timeline/timeline.fs)

[**TimelineElement**](./van-api/fs/timeline-element.fs) is a modified version of **Timeline**, which wraps the `State` object of **VanJS** and serves as an additional module for utilizing the state management of **VanFS**.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/notefooter.svg">

## 🔍 Type

###  `Timeline<'a>`

```fsharp
record Timeline<'a>
  val mutable lastVal: 'a
  val el: StateElement<'a>
```

| Field | Description       | Van.state |
|--------------|------------------------|-------------|
| `lastVal`  | Last value of the Timeline | `State.val` |
| `el`           | Reactive DOM element of the Timeline | `State` |

---

## 🔍 Functions

---

## 1️⃣ Function to initialize `Timeline<'a>`

### `Timeline`

```fsharp
'a -> Timeline<'a>
```

#### VanJS

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/javascript.svg">

```js
let counter = van.state(0);

console.log counter.val;
// 0
```

#### VanFS

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
let counter = Timeline 0

console.log counter.lastVal
// 0
```

**Consider the `Timeline` as a specific container for a value, similar to a  **Cell**  in [spreadsheet apps](https://www.google.com/intl/en/sheets/about/).**

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712455522726.png)

---

## 2️⃣ Functions for the binary operations

$$
TimelineA ~ ~ * ~ ~ Function \quad  \rightarrow \quad  TimelineB
$$

### `mapT`

```fsharp
('a -> 'b) -> (Timeline<'a> -> Timeline<'b>)
```

### `bindT`

```fsharp
('a -> Timeline<'b>) -> (Timeline<'a> -> Timeline<'b>)
```

#### VanFS

When the binary operator:  $*$  is `mapT`,

$$
TimelineB \quad = \quad TimelineA \quad \triangleright mapT \quad double
$$

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
let double = fun a -> a * 2

let timelineA = Timeline 1

let timelineB =
    timelineA |> mapT double

console.log timelineB.lastVal
// 2
```

**This code for the binary operation simply corresponds to the basic usage of spreadsheet apps**

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712453265841.png)

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/note.svg">

This is the identical structure of:

$$
ArrayB \quad = \quad ArrayA \quad \triangleright Array.map \quad double
$$

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/javascript.svg">

```js
let double = a => a * 2;

let arrayA = [1];

let arrayB =
    arrayA.map(double);

console.log(arrayB);
// [2]
```

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
let double =
    fun a -> a * 2

let listA = [1]

let listB =
    listA |> List.map double

console.log listB
// [2]
```

We could recognize the array `[2]` is identical to the  **Cell**  and  **Value** `2` of a spreadsheet; however, the spreadsheet and **Timeline** maintain a `double` relationship  **as values change over the timeline** .

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/notefooter.svg">

---

## 3️⃣ Function to update `Timeline<'a>`

$$TimelineA \quad \triangleright nextT \quad newValue \quad \rightarrow \quad TimelineA'$$

### `nextT`

```fsharp
'a -> Timeline<'a> -> Timeline<'a>
```

$$
TimelineA'  \quad =  \quad TimelineA \quad \triangleright nextT \quad newValue
$$

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
let timelineA' =
    timelineA |> nextT 3
```

or, in most cases, we don’t need another  `timelineA'`  and want to discard it, so simply `ignore` the returned value.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
let timelineA = Timeline 1

timelineA
|> nextT 3
|> ignore

console.log timelineA.lastVal
// 3
```

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712456400282.png)

---

## 1️⃣2️⃣3️⃣ action of  `Timeline<'a>`

**The update to `timelineA` will trigger a reactive update of `timelineB` according to the rule defined by the binary operation.**

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712453321296.png)

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
let double = fun a -> a * 2

// 1️⃣ initialize timelineA
let timelineA = Timeline 1

// confirm the lastVal of timelineA
console.log timelineA.lastVal
// 1

// 2️⃣ the binary operation
let timelineB =
    timelineA |> mapT double

// confirm the lastVal of timelineB
console.log timelineB.lastVal
// 2

//=====================================
// 3️⃣ update the lastVal of timelineA
timelineA
|> nextT 3
|> ignore
// update to timelineA will trigger
//   a reactive update of timelineB

// confirm the lastVal of timelineA & timelineB
console.log timelineA.lastVal
// 3
console.log timelineB.lastVal
// 6
```

---

## Counter app

#### VanJS

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/javascript.svg">

```ts
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
```

#### VanFS

#### Program.fs

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
module CounterApp

open Browser
open Browser.Types
open Fable.Core.JsInterop

open Van.Basic // import tags, add
open Van.TimelineElement // import Timeline

let div: Tag = tags?div
let h2: Tag = tags?h2
let icon: Tag = tags?``md-icon``
let iconButton: Tag = tags?``md-icon-button``

let Counter =
    fun _ ->
        let counter = Timeline 0 // 1️⃣ initialize an Timeline

        counter // 2️⃣ the binary operation of the Timeline
        |> mapT (fun value ->
                     console.log $"Counter: {value}")
        |> ignore
        // ignore the return value of `console.log`

        div [
            h2 ["❤️ "; counter.el] // 👈 `counter.el`
            iconButton [           // for Reactive DOM element
                {|onclick = fun _ ->
                                counter // 3️⃣ update the Timeline
                                |> nextT (counter.lastVal + 1)
                |}
                icon ["thumb_up"]
            ]
            iconButton [
                {|onclick = fun _ ->
                                counter // 3️⃣ update the Timeline
                                |> nextT (counter.lastVal - 1)
                |}
                icon ["thumb_down"]
            ]
        ]

add [document.body; Counter()]
|> ignore
```

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712107993450.png)

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/separator.svg">

| Contents |
|--------------|
| [🍦  **VanFS** ](#vanfs) <br/>&nbsp;&nbsp;[<sub>📱 Versatility of Web Technology <br/>&nbsp;&nbsp;&nbsp;&nbsp;for Cross-Platform App Development<sub>](./README-why.md) |
| [🚀 Getting Started](#getting-started)|
| [🌐 Web Components](#web-components) |
| [⚡️ Functional Reactive Programming (FRP)](#frp)<br/>&nbsp;&nbsp;[<sub>💡 What is Functional Programming?</sub>](./README-whatisFP.md)||
| [⏱️ Timeline](#timeline) |
| [⏱️ Nullable Types](#nullable) |
| [⏱️ Timeline Nullable](#timeline-nullable) |
| [⏱️ Timeline Task](#timeline-task) |
| [⏱️ Timeline Task Concat](#timeline-task-concat) |
| [⏱️ Timeline Task Or](#timeline-task-or) |
| [⏱️ Timeline Task And](#timeline-task-and) |
| [💬 Discussions](https://github.com/ken-okabe/vanfs/discussions) |

###### nullable

# ⏱️ Nullable Types

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/note.svg">

### [Null pointer](https://en.wikipedia.org/wiki/Null_pointer)

> Because a null pointer does not point to a meaningful object, an attempt to access the data stored at that (invalid) memory location may cause a run-time error or immediate program crash. This is the **null pointer error**. It is one of the most common types of software weaknesses,[[1]](https://en.wikipedia.org/wiki/Null_pointer#cite_note-1) and [Tony Hoare](https://en.wikipedia.org/wiki/Tony_Hoare "Tony Hoare"), who introduced the concept, has referred to it as a "billion dollar mistake".

#### [History](https://en.wikipedia.org/wiki/Null_pointer#History)

> In 2009,  [Tony Hoare](https://en.wikipedia.org/wiki/Tony_Hoare "Tony Hoare")  stated[[15]](https://en.wikipedia.org/wiki/Null_pointer#cite_note-15)  that he invented the null reference in 1965 as part of the  [ALGOL W](https://en.wikipedia.org/wiki/ALGOL_W "ALGOL W")  language. In that 2009 reference Hoare describes his invention as a "billion-dollar mistake":

>> I call it my billion-dollar mistake. It was the invention of the null reference in 1965. At that time, I was designing the first comprehensive type system for references in an object oriented language (ALGOL W). My goal was to ensure that all use of references should be absolutely safe, with checking performed automatically by the compiler. But I couldn't resist the temptation to put in a null reference, simply because it was so easy to implement. This has led to innumerable errors, vulnerabilities, and system crashes, which have probably caused a billion dollars of pain and damage in the last forty years.

---

Null values have a notorious reputation in the programming world, often leading to runtime errors and unexpected behavior. In response, functional programming languages like Haskell, OCaml, and F# have adopted a different approach to value representation, favoring the [Option types](https://en.wikipedia.org/wiki/Option_type), represented as  `None | Some a`  in these languages, over traditional null values.

The [Option types](https://en.wikipedia.org/wiki/Option_type), while often perceived as complex for beginners, can be conceptualized using  **the analogy of lists or arrays** . Consider a container structure that can either be  **empty, represented by  `[]`**  , or  **contain a value, represented by  `[a]`**  .The Option types introduce an extended concept:

| Lists/Arrays | Option Types  | 
|--------------|------------------------|
| `[]`  |  `None`  | 
| `[a]` |  `Some a` |

---

Appearently, the Option types can be useful, but they can also lead to unnecessarily complex structures.

---

Consider a  **Cell** .

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712455522726.png)

This can be represented by

-  `[0]` 

-  `Some 0`

---

In a case the cell is empty, 

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712816212511.png)

This can be represented by

-  `[]` 

-  `None`

This system works so far.

---

However, the List or Option type can be easily nested such as:

-  `[[0]]` 

-  `Some (Some 0)`

corresponds to:

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1713849900596.png)

or

-  `[[]]` 

-  `Some None`

corresponds to:

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1713849984060.png)

---

What we need is  **not a nested Cell**  that is weired and meaningless but simply  **an empty Cell** .

---

TypeScript cleverly avoids the  **complexity of nested Option types**  by employing the [Nullable types](https://en.wikipedia.org/wiki/Nullable_type) instead.

**Let's explore an example of a VSCode Extension that requires extracting the text from the active text editor.**

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1713851148106.png)

`vscode.window.activeTextEditor.document.getText()` is the adequate API, in TypeScript.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/typescript.svg">

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1713851518058.png)

The TypeScript compiler is issuing errors and warnings.

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1713851695486.png)

The problem is:

`'vscode.window.activeTextEditor' is possibly 'undefined'.`

In JavaScript,  `undefined`  signifies a variable that has been declared but not yet assigned a value. While both  `undefined`  and  `null`  exist in the language with slight differences, we won't delve into those details here. For our purposes, we can consider  `undefined`  to be similar to  `null` in a general sense.

**To visualize, it's like this!**

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1713852091388.png)

Since a VS Code user can close all tabs in the editor,  `vscode.window.activeTextEditor`  might become  `undefined` .

The situation with  `vscode.window.activeTextEditor`  becoming  `undefined` is analogous to having  **an empty cell in a spreadsheet** . Both represent the absence of a value we might expect to be present.

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712816212511.png)

So, the proper type should be as below:

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1713853524090.png)

This is the [Nullable type](https://en.wikipedia.org/wiki/Nullable_type) and what we really need.

---

In Functional Programming, everything is an expression or operation ([💡 What is Functional Programming?](./README-whatisFP.md)).

When constructing expressions for mathematically consistent algebraic structures, it is essential to employ the  **correct types**  and their  **corresponding operators** .

The concept of  ***null references being a "billion-dollar mistake"***  stems from the  **lack of a well-designed null type and corresponding operators**  for programmers to use effectively.

In this case, we should use  **[Optional chaining ( `?.` )](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) operator**  in JavaScript/TypeScript

> The **optional chaining (`?.`)** operator accesses an object's property or calls a function. If the object accessed or function called using this operator is [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) or [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null), the expression short circuits and evaluates to [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) instead of throwing an error.

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1713854747266.png)

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1713854832322.png)

*While the naming convention "optional chaining" evokes Option types, its actual behavior differs from nested Option types. Unlike Option types, which allow values to be either Some(value) or None, nullable chaining deals with values that can either be valid values or null. Therefore, "nullable chaining" might be a more accurate and descriptive name.*

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/notefooter.svg">

###  [Nullable value types](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/nullable-value-types) in F#

>A _nullable value type_ `Nullable<'T>` represents any [struct](structs.md) type that could also be `null`. This is helpful when interacting with libraries and components that may choose to represent these kinds of types, like integers, with a `null` value for efficiency reasons. The underlying type that backs this construct is [System.Nullable<T>](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/nullable-value-types).

**can only represents `struct` type, which limitation is problematic.**

[Using Nullable Reference Types in F#](https://stackoverflow.com/questions/63605221/using-nullable-reference-types-in-f)

[F#: How do I convert Option<'a> to Nullable, also when 'a can be System.String?](https://stackoverflow.com/questions/73497807/f-how-do-i-convert-optiona-to-nullable-also-when-a-can-be-system-string)

It would be nice if we could write  **any Nullable types including reference types**  in F#.

[F# RFC FS-1060 - Nullable Reference Types](https://github.com/fsharp/fslang-design/blob/main/RFCs/FS-1060-nullable-reference-types.md)

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1713855675109.png)

Currently, this syntax will generate an error.

Therefore, here's the alternative implementation:

### `NullableT`

```fsharp
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
```

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
let nullable1 =
    Null

let nullable2 =
    NullableT "hello"

log nullable1
// Null
log nullable2
// T hello
log nullable2.Value
// hello
```

This specification resembles F#'s native [nullable value types](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/nullable-value-types), but unlike it, `NullableT`  can represent any reference types.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/separator.svg">

| Contents |
|--------------|
| [🍦  **VanFS** ](#vanfs) <br/>&nbsp;&nbsp;[<sub>📱 Versatility of Web Technology <br/>&nbsp;&nbsp;&nbsp;&nbsp;for Cross-Platform App Development<sub>](./README-why.md) |
| [🚀 Getting Started](#getting-started)|
| [🌐 Web Components](#web-components) |
| [⚡️ Functional Reactive Programming (FRP)](#frp)<br/>&nbsp;&nbsp;[<sub>💡 What is Functional Programming?</sub>](./README-whatisFP.md)||
| [⏱️ Timeline](#timeline) |
| [⏱️ Nullable Types](#nullable) |
| [⏱️ Timeline Nullable](#timeline-nullable) |
| [⏱️ Timeline Task](#timeline-task) |
| [⏱️ Timeline Task Concat](#timeline-task-concat) |
| [⏱️ Timeline Task Or](#timeline-task-or) |
| [⏱️ Timeline Task And](#timeline-task-and) |
| [💬 Discussions](https://github.com/ken-okabe/vanfs/discussions) |

###### timeline-nullable

# ⏱️ Timeline Nullable

By utilizing the  **Nullable type** , we can provide new operators that pair with  **Timeline** .

Initializing a **Timeline**  with `Null` value, the provided function remains unexecuted and waits in a pending state. Once the **Timeline** value is updated to a non   `Null`   value by a valid event, the function is then triggered and executed.

## 🔍 Functions

---

## 1️⃣ Function to initialize `Timeline<NullableT<'a>>`

### `Timeline`

```fsharp
NullableT<'a> -> Timeline<NullableT<'a>>
```

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
let timelineNullable = Timeline Null

log timelineNullable.lastVal // use `log` of Timeline
// Null
```

**Consider this  **Timeline**  as an empty **Cell**  in [spreadsheet apps](https://www.google.com/intl/en/sheets/about/).**

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712816212511.png)

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/note.svg">

## 🔍 Type

`Timeline` type and the function:

1️⃣ Function to initialize `Timeline<'a>`

1️⃣ Function to initialize `Timeline<NullableT<'a>>`

is the  *same entity* .

Consider `Timeline` can accept any generic types of `'a` including `NullableT<'a>`.

On the other hand, in the case of  `Timeline<NullableT<'a>>`  where the parameter value is a nullable type, if we need the  `Timeline`  behavior to ignore the provided function and simply pass through the  `Null`  value when the parameter is  `Null` , we can use specific operators as shown below.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/notefooter.svg">

## 2️⃣ Functions for the binary operations

$$
TimelineA ~ ~ * ~ ~ Function \quad  \rightarrow \quad  TimelineB
$$

### `mapTN`

```fsharp
(NullableT<'a> -> NullableT<'b>) -> (Timeline<NullableT<'a>> -> Timeline<NullableT<'b>>)
```

### `bindTN`

```fsharp
(NullableT<'a> ->  Timeline<NullableT<'b>>) -> (Timeline<NullableT<'a>> -> Timeline<NullableT<'b>>)
```

When the binary operator:  $*$  is `mapT`,

$$
TimelineB \quad = \quad TimelineA \quad \triangleright mapTN \quad double
$$

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
let double =
    fun a -> NullableT (a * 2)

// 1️⃣ initialize timelineA
let timelineA = Timeline Null

log timelineA.lastVal // use `log` of Timeline
// Null

// 2️⃣ the binary operation
let timelineB =
    timelineA |> mapTN double
// currently, `timelineA = Timeline Null`
// so, `double` function is ignored
// and `timelineB` value becomes `Null`
log timelineB.lastVal // use `log` of Timeline
// Null
```

**This code for the binary operation simply corresponds to the basic usage of spreadsheet apps.**

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712816540787.png)

The operator behaves similarly to JavaScript's Promise or its syntactic sugar, async-await.

## 3️⃣ Function to update `Timeline<NullableT<'a>>`

$$TimelineA \quad \triangleright nextTN \quad newNullableValue \quad \rightarrow \quad TimelineA'$$

### `nextTN`

```fsharp
NullableT<'a> -> Timeline<NullableT<'a>> -> Timeline<NullableT<'a>>
```

$$
TimelineA'  \quad =  \quad TimelineA \quad \triangleright nextTN \quad newNullableValue
$$

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712816212511.png)

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712456400282.png)

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
let timelineA' =
    timelineA |> nextTN (NullableT 3)
```

or, in most cases, we don’t need another  `timelineA'`  and want to discard it, so simply `ignore` the returned value.

## 1️⃣2️⃣3️⃣ action of  `Timeline<'a>`

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712818474514.png)

**The update to `timelineA` will trigger a reactive update of `timelineB` according to the rule defined by the binary operation.**

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
let double =
    fun a -> NullableT (a * 2)

// 1️⃣ initialize timelineA
let timelineA = Timeline Null

log timelineA.lastVal // use `log` of Timeline
// Null

// 2️⃣ the binary operation
let timelineB =
    timelineA |> mapTN double
// currently, `timelineA = Timeline Null`
// so, `double` function is ignored
// and `timelineB` value becomes `Null`
log timelineB.lastVal // use `log` of Timeline
// Null

// 3️⃣ update the lastVal of timelineA
timelineA
|> nextTN (NullableT 3)
|> ignore

log timelineA.lastVal // use `log` of Timeline
// T 3

// Now, `timelineA` value is updated to non `Null` value
// Accordingly, `timelineB` reactively becomes `double` of it
log timelineB.lastVal
// T 6
```

---

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

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/separator.svg">

| Contents |
|--------------|
| [🍦  **VanFS** ](#vanfs) <br/>&nbsp;&nbsp;[<sub>📱 Versatility of Web Technology <br/>&nbsp;&nbsp;&nbsp;&nbsp;for Cross-Platform App Development<sub>](./README-why.md) |
| [🚀 Getting Started](#getting-started)|
| [🌐 Web Components](#web-components) |
| [⚡️ Functional Reactive Programming (FRP)](#frp)<br/>&nbsp;&nbsp;[<sub>💡 What is Functional Programming?</sub>](./README-whatisFP.md)||
| [⏱️ Timeline](#timeline) |
| [⏱️ Nullable Types](#nullable) |
| [⏱️ Timeline Nullable](#timeline-nullable) |
| [⏱️ Timeline Task](#timeline-task) |
| [⏱️ Timeline Task Concat](#timeline-task-concat) |
| [⏱️ Timeline Task Or](#timeline-task-or) |
| [⏱️ Timeline Task And](#timeline-task-and) |
| [💬 Discussions](https://github.com/ken-okabe/vanfs/discussions) |

###### timeline-task

# ⏱️ Timeline Task

While  **Timeline Nullable**  operators offer a basic principle similar to JavaScript's [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), they are not capable of managing Task chaining, such as [Promie.then](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then).

Based on **Timeline Nullable** , we can obtain  **Timeline Task** which is capable of Task chaining.

### `Task`

```fsharp
Timeline<NullableT<'a>> -> 'b -> unit
```

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
 let task =
    fun timelineResult previousResult ->
        log "-----------task1 started..."
        log previousResult
        // delay-------------------------------
        let f = fun _ ->
            log ".......task1 done"
            timelineResult
            |> nextTN (NullableT 1)
            |> ignore
        setTimeout f 2000
```

### `taskT`

```fsharp
Task<'a, NullableT<'a0>> -> Timeline<NullableT<'a>> -> Timeline<NullableT<'a>>
```

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
let timelineStarter =
    Timeline (NullableT 0)
    // tasks start immediately

timelineStarter
|> taskT task1
|> taskT task2
|> taskT task3
|> ignore
```

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/separator.svg">

| Contents |
|--------------|
| [🍦  **VanFS** ](#vanfs) <br/>&nbsp;&nbsp;[<sub>📱 Versatility of Web Technology <br/>&nbsp;&nbsp;&nbsp;&nbsp;for Cross-Platform App Development<sub>](./README-why.md) |
| [🚀 Getting Started](#getting-started)|
| [🌐 Web Components](#web-components) |
| [⚡️ Functional Reactive Programming (FRP)](#frp)<br/>&nbsp;&nbsp;[<sub>💡 What is Functional Programming?</sub>](./README-whatisFP.md)||
| [⏱️ Timeline](#timeline) |
| [⏱️ Nullable Types](#nullable) |
| [⏱️ Timeline Nullable](#timeline-nullable) |
| [⏱️ Timeline Task](#timeline-task) |
| [⏱️ Timeline Task Concat](#timeline-task-concat) |
| [⏱️ Timeline Task Or](#timeline-task-or) |
| [⏱️ Timeline Task And](#timeline-task-and) |
| [💬 Discussions](https://github.com/ken-okabe/vanfs/discussions) |

###### timeline-task-concat

# ⏱️ Timeline Task Concat

### `taskConcat` or `(+>)`

```fsharp
(Task -> Task) -> Task
```

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
let task12 =
    task1 +> task2

let task123 =
    task1 +> task2 +> task3

let task1234 =
    task123 +> task4
```

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/separator.svg">

#### Program.fs

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
module Tasks

open Browser
open Browser.Types
open Fable.Core.JsInterop

open Van.Basic // import tags, add
open Van.TimelineElement // import Timeline
open Van.TimelineElementNullable // import Timelinetc.
open Van.Nullable // import NullableT
open Van.TimelineElementTask
open Van.TimelineElementTaskConcat

open System.Timers
let setTimeout f delay =
    let timer = new Timer(float delay)
    timer.AutoReset <- false
    timer.Elapsed.Add(fun _ -> f())
    timer.Start()
let br: Tag = tags?``br``
let fluentCard: Tag = tags?``fluent-card``
let linerProgress: Tag = tags?``md-linear-progress``

let Tasks =
    fun _ ->
        let progressInit = false
        let progressStart = true
        let progressDone = false
        let percentInit = 0.0
        let percentStart = 0.0
        let percentDone = 1.0

        let timelineProgress1 = Timeline progressInit
        let timelineProgress2 = Timeline progressInit
        let timelineProgress3 = Timeline progressInit
        let timelinePercent1 = Timeline percentInit
        let timelinePercent2 = Timeline percentInit
        let timelinePercent3 = Timeline percentInit

        let taskStart =
            fun timelineProgress timelinePercent ->
                timelineProgress
                |> nextT progressStart
                |> ignore
                timelinePercent
                |> nextT percentStart
                |> ignore

        let taskDone =
            fun timelineProgress timelinePercent timelineResult->
                timelineProgress
                |> nextT progressDone
                |> ignore
                timelinePercent
                |> nextT percentDone
                |> ignore
                timelineResult
                |> nextTN (NullableT 999)
                |> ignore

        let task1 =
            fun timelineResult previousResult ->
                log "-----------task1 started..."
                taskStart timelineProgress1 timelinePercent1
                // delay-------------------------------
                let f = fun _ ->
                    log "...task1 done"
                    taskDone timelineProgress1 timelinePercent1 timelineResult
                setTimeout f 2500
                timelineResult

        let task2 =
            fun timelineResult previousResult ->
                log "-----------task2 started..."
                taskStart timelineProgress2 timelinePercent2
                // delay-------------------------------
                let f = fun _ ->
                    log "...task2 done"
                    taskDone timelineProgress2 timelinePercent2 timelineResult
                setTimeout f 2500
                timelineResult

        let task3 =
            fun timelineResult previousResult ->
                log "-----------task3 started..."
                taskStart timelineProgress3 timelinePercent3
                // delay-------------------------------
                let f = fun _ ->
                    log "...task3 done"
                    taskDone timelineProgress3 timelinePercent3 timelineResult
                setTimeout f 2500
                timelineResult

        let timelineStarter = Timeline Null //tasks disabled initially

        let task123 =
            task1 +>
            task2 +>
            task3

        timelineStarter
        |> taskT task123
        |> ignore

        let start =
            fun _ -> // timeline will start
                timelineStarter
                |> nextTN (NullableT 0)
                |> ignore

        setTimeout start 2000

        fluentCard [
            {|``class``="custom2"|}
            br []
            linerProgress [
                {|indeterminate=timelineProgress1.el
                  value=timelinePercent1.el|}
            ]
            br []
            linerProgress [
                {|indeterminate=timelineProgress2.el
                  value=timelinePercent2.el|}
            ]
            br []
            linerProgress [
                {|indeterminate=timelineProgress3.el
                  value=timelinePercent3.el|}
            ]
        ]

add [document.body; Tasks()]
|> ignore
```

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712038600017.png)

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712038609796.png)

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/separator.svg">

| Contents |
|--------------|
| [🍦  **VanFS** ](#vanfs) <br/>&nbsp;&nbsp;[<sub>📱 Versatility of Web Technology <br/>&nbsp;&nbsp;&nbsp;&nbsp;for Cross-Platform App Development<sub>](./README-why.md) |
| [🚀 Getting Started](#getting-started)|
| [🌐 Web Components](#web-components) |
| [⚡️ Functional Reactive Programming (FRP)](#frp)<br/>&nbsp;&nbsp;[<sub>💡 What is Functional Programming?</sub>](./README-whatisFP.md)||
| [⏱️ Timeline](#timeline) |
| [⏱️ Nullable Types](#nullable) |
| [⏱️ Timeline Nullable](#timeline-nullable) |
| [⏱️ Timeline Task](#timeline-task) |
| [⏱️ Timeline Task Concat](#timeline-task-concat) |
| [⏱️ Timeline Task Or](#timeline-task-or) |
| [⏱️ Timeline Task And](#timeline-task-and) |
| [💬 Discussions](https://github.com/ken-okabe/vanfs/discussions) |

###### timeline-task-or

# ⏱️ Timeline Task Or

### `taskOr` or `(+|)`

###

```fsharp
(Task -> Task) -> Task
```

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
let task12 =
    task1 +| task2

let task123 =
    task1 +| task2 +| task3

let task1234 =
    task123 +| task4
```

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/separator.svg">

| Contents |
|--------------|
| [🍦  **VanFS** ](#vanfs) <br/>&nbsp;&nbsp;[<sub>📱 Versatility of Web Technology <br/>&nbsp;&nbsp;&nbsp;&nbsp;for Cross-Platform App Development<sub>](./README-why.md) |
| [🚀 Getting Started](#getting-started)|
| [🌐 Web Components](#web-components) |
| [⚡️ Functional Reactive Programming (FRP)](#frp)<br/>&nbsp;&nbsp;[<sub>💡 What is Functional Programming?</sub>](./README-whatisFP.md)||
| [⏱️ Timeline](#timeline) |
| [⏱️ Nullable Types](#nullable) |
| [⏱️ Timeline Nullable](#timeline-nullable) |
| [⏱️ Timeline Task](#timeline-task) |
| [⏱️ Timeline Task Concat](#timeline-task-concat) |
| [⏱️ Timeline Task Or](#timeline-task-or) |
| [⏱️ Timeline Task And](#timeline-task-and) |
| [💬 Discussions](https://github.com/ken-okabe/vanfs/discussions) |

###### timeline-task-and

# ⏱️ Timeline Task And

### `taskAnd` or `(+&)`

```fsharp
(Task -> Task) -> Task
```

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
let task12 =
    task1 +& task2

let task123 =
    task1 +& task2 +& task3

let task1234 =
    task123 +& task4
```