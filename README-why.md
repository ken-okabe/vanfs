# 📱 Versatility of Web Technology for Cross-Platform App Development

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712154398813.png)

## We want to use F# for its cross-platform app development

[Flutter](https://flutter.dev/) from Google is the most successful framework for cross-platform app development.

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1714513350785.png)

The problem is for some unknown reason, it uses [Dart programming language](https://dart.dev/).

---

[.NET MAUI](https://dotnet.microsoft.com/en-us/apps/maui)  from Microsoft is another major cross-platform framework.

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1714514253747.png)

Surprisingly, Microsoft does not support F#.net much in MAUI.

[[Enhancement] F# Support from Day 1](https://github.com/dotnet/maui/discussions/115)

Therefore, for F# developers, these major frameworks are unusable.

## Hybrid app on Web technology

There is another option: [Hybrid app](https://en.wikipedia.org/wiki/Mobile_app#Hybrid_app).

[Capacitor](https://capacitorjs.com/)

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1714515301313.png)

Capacitor is a Hybrid app framework that is based on the Web technology.

**The vast and versatile web development ecosystem provides us with the variety of options** such as MaterialUI etc..

## WASM?

[WebAssembly](https://webassembly.org/) (WASM) is certainly a future of the web.

[Bolero: F# in WebAssembly](https://fsbolero.io/)

The challenge with WASM is that it's still maturing.  The most critical issue is the limited number of options available due to the small ecosystem, especially for F#.

## Versatility of Web Technology for Cross-Platform App Development

The vast ecosystem of web technology empowers us to build almost anything.

The web language is JavaScript, and thanks to  [Fable](https://github.com/fable-compiler/Fable), we can now compile F# code that runs seamlessly in the browser.

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712070754189.png)

>  **F#**  
⬇ [Fable Compiler](https://github.com/fable-compiler/Fable) running on [.NET](https://dotnet.microsoft.com/)  (`dotnet fable`)  
 **JavaScript**  running in the browser

## Why VanJS

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712047413143.png)

[VanJS: About - the Story behind VanJS](https://vanjs.org/about#story)

>But I think, in a nutshell, the best way to describe it is:  ***VanJS**  is the scripting language for UI, just like bash is the  *scripting language*  for terminal.*

> *Being the scripting language for UI* , is the fundamental principle that guides the design of  **VanJS** . It's based on JavaScript so that it can work in as many environments as possibles, not only for websites, but also for webviews which most major OSes support.