# VanFS

**VanFS is a project template** for 1:1 bindings from [F#](https://fsharp.org/) to [VanJS](https://vanjs.org/) (A tiny Reactive UI Framework without React/JSX) + [WebComponents](https://m3.material.io/develop/web) + FRP ([Functional reactive programming](https://en.wikipedia.org/wiki/Functional_reactive_programming))

## 1:1 bindings of HTML-tag-functions to compose UI

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

## Why you should avoid using JavaScript

Because  **JavaScript is not a type-safe language**,  which can lead to  **runtime errors and bugs** . In modern web development, JavaScript has become  **a compile target from an AltJS**.

[TypeScript](https://www.typescriptlang.org/) is the most commonly used AltJS language to compile to JavaScript.

**TypeScript -> JavaScript**

**VanJS**  can be considered as a compile target from an AltJS.

## Why you should avoid using TypeScript and migrate to F#

There are many reasons, but mostly,  **productivity.**

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

In F#, you rarely need to add types manually thanks to its powerful type inference. This makes F# development feel similar to legacy JavaScript coding.

In reality, it is much more than that.

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711717723241.png)

The powerful F# compiler  **automatically generates type annotations**  in your VSCode editor, eliminating the need for manual typing that TypeScript demands.

## F# as an AltJS: A Comparison with TypeScript

F# is generally recognized as running on the [.NET Framework](https://dotnet.microsoft.com/), but just as TypeScript is compiled to JavaScript, F# is also compiled to JavaScript.

- **TypeScript -> JavaScript**

- **F# -> JavaScript**

More precisely,

>  **TypeScirpt**  
⬇ TypeScript Compiler (tsc) running on [Node.js](https://nodejs.org/)  
 **JavaScript**  running in the Browser

>  **F#**  
⬇ [Fable Compiler (fable)](https://github.com/fable-compiler/Fable) running on [.NET](https://dotnet.microsoft.com/)  
 **JavaScript**  running in the Browser

Therefore, the backbone of **VanFS**  is [Fable](https://github.com/fable-compiler/Fable).

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
# Copy&Place `index.html` file
# modify `my-project.fsproj`
#  <ItemGroup>
#    <Compile Include="van-api/fs/*" />
#    <Compile Include="Program.fs" />
#  </ItemGroup>
```

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1711728744181.png)

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

## Live Preview by Vite

```sh

npx vite
```