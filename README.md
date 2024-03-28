# vanfs
Micro Reactive UI Framework in F# based on VanJS

```sh
git clone https://github.com/ken-okabe/vanfs
cd vanfs
dotnet tool install fable
dotnet add package Fable.Core
dotnet add package Fable.Browser.Dom
npm init -y
npm i -D vanjs-core
npm i -D vite

npm i @material/web

dotnet fable watch
npx vite
```


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

npm i @material/web

dotnet fable watch
npx vite
```
