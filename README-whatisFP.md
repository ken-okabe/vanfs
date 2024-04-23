# 💡 What is Functional Programming?

What is  **Functional Programming** ? It's a programming paradigm that uses **Expressions** as the building blocks of the code.

In contrast,  **Imperative Programming**  is a paradigm that uses  **Statements**  to control the flow of the code.

Both programming paradigms have expressions and statements, but in functional programming, expressions are primarily used to compose other expressions, while in imperative programming, statements are primarily used to control the flow of execution.

## What is Expressions?

$1 + 2$

$5 - 3$

$2 \times 3$

$8 \div 4$

These are familier [binary operations](https://en.wikipedia.org/wiki/Binary_operation) called **four arithmetic operations** , which is a type of  **Expressions** .

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712224131411.png)

Here  $+$   $-$   $\times$   $\div$ is called  **binary [operator](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/symbol-and-operator-reference/)** .

## The building blocks of code, expressions, can simply be values

Especially, in programming context, the building blocks of code, expressions, can simply be values.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators

>At a high level, an expression is a valid unit of code that resolves to a value.

For instance, `1` is resolved to a value: `1`, so `1` itself is an expression.

`"Hello"` is resolved to a value: `"Hello"`, so `"Hello"` is an expression.

## Functions are expressions

In functional programming languages, functions are expressions.

In other words, functions are treated as first-class values. This means they can be assigned to variables, passed as arguments, and returned from other functions.

**[First-class function](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function) is a fundamental requirement for a programming language to be considered a functional programming language.**

In [C](https://en.wikipedia.org/wiki/C_(programming_language)), functions are not first-class values, which means they cannot be treated as expressions. This lack of first-class functions prevents C from being considered a functional programming language.

Functions in JavaScript/TypeScript and F# are first-class values, which are expressions. Therefoe, both JavaScript/TypeScript and F# can be classified as functional programming languages.

## Operators are functions and expressions

---

$a  \triangleright function$

`a |> function`

This is a less familier [binary operation](https://en.wikipedia.org/wiki/Binary_operation) called  **[Pipeline (operation)](https://learn.microsoft.com/en-us/dotnet/fsharp/tour#pipelines)** , which is a type of Expression.

---

$list \quad \triangleright  map \quad function$

`list |> map function`

This is also a less familier [binary operation](https://en.wikipedia.org/wiki/Binary_operation)  called  **Endo-functor** , which is a type of Expression.

---

$list \quad \triangleright  bind \quad monadicFunction$

`list |> bind monadicFunction`

This is also a less familier [binary operation](https://en.wikipedia.org/wiki/Binary_operation)  called  **Monad** , which is a type of expression.

---

$\triangleright$, in F# code, `|>`

---

- Function

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1694893570083.png#gh-dark-mode-only)

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1694896818758.png#gh-light-mode-only)

- Monadic function

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1694893107522.png#gh-dark-mode-only)

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1694896881397.png#gh-light-mode-only)