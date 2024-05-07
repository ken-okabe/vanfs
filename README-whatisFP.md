# 💡 What is Functional Programming?

What is  **Functional Programming** ? It's a programming paradigm that uses **Expressions** as the building blocks of the code.

In contrast,  **Imperative Programming**  is a paradigm that uses  **Statements**  to control the flow of the code.

https://gist.github.com/assets/1316994/39a55e67-a4a8-4e88-a6fb-1700609be09a

Both programming paradigms have expressions and statements, but in Functional Programming, expressions are primarily used to compose other expressions, while in Imperative Programming, statements are primarily used to control the flow of execution.

[💡 How does Functional Programming Code Drive?](./README-howFP.md)

## What is Expression?

$1 + 2$

$5 - 3$

$2 \times 3$

$8 \div 4$

These are familier [binary operations](https://en.wikipedia.org/wiki/Binary_operation) called **four arithmetic operations** , which is a type of  **Expressions** .

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712224131411.png)

Here  $+$   $-$   $\times$   $\div$ is called  **binary [operator](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/symbol-and-operator-reference/)** .

## Operators are functions

[binary functions](https://en.wikipedia.org/wiki/Function_(mathematics)#Definition)

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1714758580874.png)

Therefore, fundamentally,  **operators are functions.**

https://dev.epicgames.com/documentation/en-us/uefn/operators-in-verse

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1714759944742.png)

>Operators are special functions defined in the Verse programming language to perform actions such as the math operations for addition and multiplication.

In F#, infix binary operators can also be written as prefix functions.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
1 + 2 // 3
(+) 1 2 // 3
```

In essence, symbols like   $+$   and   $\times$   represent alternative notations (syntactic sugar) for functions. It is the function that plays the central role in connecting two expressions.

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1694897647464.png#gh-light-mode-only)

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1694897711592.png#gh-dark-mode-only)

```js
1 + 2           // F#/Haskell/JavaScript
(+) 1 2         // F#/Haskell
plus 1 2        // F#/Haskell
plus(1)(2)      // F#/Haskell/JavaScript
```

## The building blocks of code, expressions, can simply be values

Especially, in programming context, the building blocks of code, expressions, can simply be values.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators

>At a high level, an expression is a valid unit of code that resolves to a value.

For instance, `1` is resolved to a value: `1`, so `1` itself is an expression.

`"Hello"` is resolved to a value: `"Hello"`, so `"Hello"` is an expression.

## Functions are expressions

In Functional Programming languages,  **functions are expressions.**

In other words,  **functions are treated as [first-class values](https://en.wikipedia.org/wiki/First-class_citizen)** . This means  **they can be assigned to variables, passed as arguments, and returned from other functions.**

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/note.svg">

**[First-class function](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function) is the fundamental requirement for a programming language to be considered a Functional Programming language.**

In [C](https://en.wikipedia.org/wiki/C_(programming_language)), functions are not first-class values, which means they cannot be treated as expressions. This lack of first-class functions prevents C from being considered a Functional Programming language.

Functions in JavaScript/TypeScript and F# are first-class values, which are expressions. Therefore, both JavaScript/TypeScript and F# can be classified as Functional Programming languages.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/notefooter.svg">

## Higher-order functions

[First-class functions](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function) naturally lead us to the concept of [higher-order functions](https://en.wikipedia.org/wiki/Higher-order_function), which become incredibly powerful tools in Functional Programming.

## ① Operator (=function) that returns a function

Let's investigate a case in which  **a function returns [first-class function](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function).**

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1714795722040.png)

$3 \times 4 = 12$

This can be written as:

```js
3 * 4           // F#/Haskell/JavaScript
(*) 3 4         // F#/Haskell
times 3 4       // F#/Haskell
times(3)(4)     // F#/Haskell/JavaScript
```

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/javascript.svg">

```js
let times =
    a => b =>
        a * b

let times3 =
    times(3)
```

`times(3)` returns another function: `times3`.

`times3`  is a function as the table:

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1714764078204.png)

```js
let times34 =
    times3(4) // 12

times(3)(4) // 12
```

A function like this is called a [Higher-order_function](https://en.wikipedia.org/wiki/Higher-order_function).

---

In  [mathematics](https://en.wikipedia.org/wiki/Mathematics "Mathematics")  and  [computer science](https://en.wikipedia.org/wiki/Computer_science "Computer science"), a  **higher-order function**  (**HOF**) is a  [function](https://en.wikipedia.org/wiki/Function_(mathematics) "Function (mathematics)")  that does at least one of the following:

-   takes one or more functions as arguments (i.e. a  [procedural parameter](https://en.wikipedia.org/wiki/Procedural_parameter "Procedural parameter"), which is a  [parameter](https://en.wikipedia.org/wiki/Parameter_(computer_science) "Parameter (computer science)")  of a  [procedure](https://en.wikipedia.org/wiki/Subroutine "Subroutine")  that is itself a procedure),
-   returns a function as its result.

As a result, we will have only  **3 cases** as below:

### ① Operator (=function) that returns a function

function: value ->  **function**

### ② Operator (=function) that takes a function

function:  **function**  -> value

### ③ Operator (=function) that takes a function and returns a function

function:  **function**  ->  **function**

---

In this case, `times(3)` returns another function: `times3`.

So, this is a **higher-order function** which returns a function as it's result.

#### ① Operator (=function) that returns a function

function: value ->  **function**

## ② Operator (=function) that takes a function

Let's investigate a case in which  **a function (operator) takes [first-class function](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function).**

function:  **function**  -> value

## Pipe Operator

There is a less familier [binary operation](https://en.wikipedia.org/wiki/Binary_operation) called  **[Pipeline (operation)](https://learn.microsoft.com/en-us/dotnet/fsharp/tour#pipelines)**.

The  **pipe operator**   `|>`   takes  **function as the operand**, which allows you to establish "pipelines" of functions in a flexible manner.

$a  \triangleright function$

$\triangleright$ in F# code, `|>`

`a |> function`

**This operator extremely important and is used extensively when processing data in F#.**

The **Pipe operator**  is a  **function** , which is simply defined as:

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
let (|>) x f = f x
```

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/note.svg">

**Mathematics and Functional Programming: Omitting Parentheses   $( )$   for Function Application:**  $f (x)$

In mathematics, it is common practice to omit parentheses when applying functions, especially in advanced mathematical texts and papers. This is particularly evident with trigonometric functions like  **sine** , where

$$
\sin(θ)
$$

is often written simply as:

$$
\sin θ
$$

Similarly, in programming languages like F# and Haskell, function application  $f(x)$   `f(x)`  is often written as  `f x`  (*with a space between the function name and argument)*  when the context is clear. This style omits parentheses, which are considered redundant in these languages.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/notefooter.svg">

Let's consider a function named  `double`  that takes a value and returns its double.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
let double x = 
    x * 2
```

```fsharp
let result1 =
    double(1)

let result1' =
    1 |> double

// 2
```

```fsharp
let result2 =
    double(double(1))

let result2' =
    1 |> double |> double

// 4
```

The  **pipe operator**   `|>`  eliminates the complicated nesting of `( )` notation and creates a clean  **pipeline**  by sequentially applying  `double`  functions to the data `1`.

## ③ Operator (=function) that takes a function and returns a function

`double` is a  **function**  that takes a  **value**  and returns a  **value** .

[List.reduce](https://fsharp.github.io/fsharp-core-docs/reference/fsharp-collections-listmodule.html#reduce) is a  **function**  that takes a  **function**  and returns a  **function** .

function:  **function**  ->  **function**

See [Advanced operator for iteration](https://github.com/ken-okabe/vanfs/blob/main/README-howFP.md#advanced-operator-for-iteration) in [💡 How does Functional Programming Code Drive?](./README-howFP.md)

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
let reducer =
    List.reduce (+)
```

`List.reduce (+)` takes a function:  `(+)`  and returns a function:  `reducer` .

```fsharp
let sum =
    [0;1;2;3;4;5]
    |> reducer // pipeline operation

//15
```

## Create a new binary operator with the pipe operator   `|>`

It's also possible to rewrite:

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
let sum =
    [0;1;2;3;4;5]
    |> List.reduce (+)

// 15
```

`list |> reduce function`

$list \quad \triangleright  reduce \quad function$

**It can be interpreted as creating a new binary operator:**

$$
\triangleright  reduce
$$

## Endo-functor

$list \quad \triangleright  map \quad function$

`list |> map function`

This is also a less familier [binary operation](https://en.wikipedia.org/wiki/Binary_operation)  called  **Endo-functor**.

## Monad

$list \quad \triangleright  bind \quad monadicFunction$

`list |> bind monadicFunction`

This is also a less familier [binary operation](https://en.wikipedia.org/wiki/Binary_operation)  called  **Monad**.

---

---

- Function

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1694893570083.png#gh-dark-mode-only)

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1694896818758.png#gh-light-mode-only)

- Monadic function (Kleisli arrow)

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1694893107522.png#gh-dark-mode-only)

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1694896881397.png#gh-light-mode-only)

---

-  **(Endo)Functor and Monad are two sides of the same mathematical structure**

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1695095978458.png#gh-dark-mode-only)

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1694896962933.png#gh-light-mode-only)

---

- (Endo)Functor / Monad with $id$ / $ID$

![image](https://raw.githubusercontent.com/ken-okabe/web-images3/main/img_1701330728879.png#gh-dark-mode-only)

![image](https://raw.githubusercontent.com/ken-okabe/web-images3/main/img_1701161800128.png#gh-light-mode-only)

---

![image](https://raw.githubusercontent.com/ken-okabe/web-images3/main/img_1701307589866.png#gh-dark-mode-only)

![image](https://raw.githubusercontent.com/ken-okabe/web-images3/main/img_1701161868242.png#gh-light-mode-only)

---

-  **Functions with Pipeline - Function composition**

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1695097345386.png#gh-dark-mode-only)

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1695097372602.png#gh-light-mode-only)

---

-  **(Endo)Functor- Functions are linked/composed with Pipeline, including both the contents and the shell of the container**

-  **Monad - link/composition of Monadic functions ＝Kleisli composition**

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1694899246669.png#gh-dark-mode-only)

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1694899301196.png#gh-light-mode-only)

---

-  **(Endo)Functor- Functions are linked/composed with Pipeline, including both the contents and the shell of the container**

![image](https://raw.githubusercontent.com/ken-okabe/web-images1/main/img_1690336840842.png#gh-dark-mode-only)

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1694937849906.png#gh-light-mode-only)

![image](https://raw.githubusercontent.com/ken-okabe/web-images1/main/img_1690269193145.png#gh-dark-mode-only)

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1694937772302.png#gh-light-mode-only)

---

-  **Monad - link/composition of Monadic functions ＝Kleisli composition**

![image](https://raw.githubusercontent.com/ken-okabe/web-images1/main/img_1690269442642.png#gh-dark-mode-only)

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1694937402098.png#gh-light-mode-only)

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1695101910856.png#gh-dark-mode-only)

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1695101924426.png#gh-light-mode-only)