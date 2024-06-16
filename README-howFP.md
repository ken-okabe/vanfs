# 💡 How does Functional Programming Code Drive?

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/note.svg">

[💡 What is Functional Programming?](./README-whatisFP.md)

What is  **Functional Programming** ? It's a programming paradigm that uses **Expressions** as the building blocks of the code.

In contrast,  **Imperative Programming**  is a paradigm that uses  **Statements**  to control the flow of the code.

Both programming paradigms have expressions and statements, but in Functional Programming, expressions are primarily used to compose other expressions, while in Imperative Programming, statements are primarily used to control the flow of execution.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/notefooter.svg">

<video controls muted=false
  src="https://gist.github.com/assets/1316994/7b2ef060-1fa6-47d8-912c-772ff317a9aa" type="video/mp4">
</video>

This insight is widely shared, and many people today may know what Functional Programming is.

However, less well-understood is  **how functional code achieves control flow without the use of explicit control statements such as `if` or `for` loops.**

## Battery included! Mathematics

The answer is  **mathematics** .

In Functional Programming,  **code is a composition of expressions, and the evaluation order of these expressions is strictly defined based on mathematical rules.**

Therefore, statements that control the flow of code, in principle, are not required in Functional Programming.

## Operator associativity

<video controls muted=false
  src="https://gist.github.com/assets/1316994/4d5fecc6-df1e-4a64-bfc2-883446383b6d" type="video/mp4">
</video>

Let's consider an expression:

$$
1 + 2
$$

This is a  [binary operation](https://en.wikipedia.org/wiki/Binary_operation) .

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1712224131411.png)

Let's consider another expression:

$$
1 + 2 + 3
$$

This is a combination of two binary operations.

$$
(1 + 2) + 3
$$

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1713912989196.png)

But, why $1 + 2 + 3$ becomes $(1 + 2) + 3$ ??

In mathematics, the addition operator **(+) is left-associative** , meaning we perform calculations  **from left to right**  when evaluating expressions containing  **multiple (+)  signs** .

$$
\begin{align*}
&\quad ~ ~ ~ 1 + 2 + 3  \\
&= (1 + 2) + 3 \\
&= 3 + 3  \\
&= 6 
\end{align*}
$$

**Parentheses ( )**  can override this order.
This results in the same answer in both cases, but it highlights the importance of  **associativity**  and the use of  **parentheses to control the order of evaluation** .

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/note.svg">

In contrast, a  **right-associative operator**  is an operator that is evaluated from right to left. For example, the exponentiation operator ( $\textasciicircum$ ) is  **right-associative** in many languages, so the following expression is evaluated as follows:

$$
2 \textasciicircum 3 \textasciicircum 2 = 2 \textasciicircum (3 \textasciicircum 2) = 128
$$

It is important to understand the associativity of operators when writing expressions, as it can affect the order of operations and the final result.

It is important to understand the associativity of operators when writing expressions, as it can affect the order of operations and the final result.

> In [programming language theory](https://en.wikipedia.org/wiki/Programming_language_theory "Programming language theory"), the **associativity** of an [operator](https://en.wikipedia.org/wiki/Operator_(programming) "Operator (programming)") is a property that determines how operators of the same [precedence](https://en.wikipedia.org/wiki/Order_of_operations "Order of operations") are grouped in the absence of [parentheses](https://en.wikipedia.org/wiki/Bracket_(mathematics) "Bracket (mathematics)"). If an [operand](https://en.wikipedia.org/wiki/Operand "Operand") is both preceded and followed by operators (for example, `^ 3 ^`), and those operators have equal precedence, then the operand may be used as input to two different operations (i.e. the two operations indicated by the two operators). The choice of which operations to apply the operand to, is determined by the **associativity** of the operators. Operators may be **associative** (meaning the operations can be grouped arbitrarily), **left-associative** (meaning the operations are grouped from the left), **right-associative** (meaning the operations are grouped from the right) or **non-associative** (meaning operations cannot be chained, often because the output type is incompatible with the input types). The associativity and precedence of an operator is a part of the definition of the programming language; different programming languages may have different associativity and precedence for the same type of operator.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/notefooter.svg">

## Operator precedence

Expressions follow a set of  **Operator associativity**  and  **precedence**  rules to determine the order of evaluation.

- Operator associativity

- Operator precedence

<video controls muted=false
  src="https://gist.github.com/assets/1316994/5908d34e-9f66-4986-91dc-410ebed99df2" type="video/mp4">
</video>

What is  **Operator precedence** ?

Let's consider an expression:

$$
1 + 2 \times 3
$$

This is a combination of two binary operations.

In this case, it is equivalent to as follows:

$$
1 + (2 \times 3)
$$

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1713914800211.png)

In mathematics,  **operator precedence**  (or  **priority** ) is a set of  **rules that define the order in which operations are evaluated in an expression** .

$$
\begin{align*}
&\quad ~ ~ ~ 1 + 2 \times 3  \\
&= 1 + (2 \times 3) \\
&= 1 + 6  \\
&= 7
\end{align*}
$$

It essentially determines which calculations are done first in a math problem with  **multiple operations** .

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/note.svg">

[Order of operations](https://en.wikipedia.org/wiki/Order_of_operations)

>For example, multiplication is granted a higher precedence than addition, and it has been this way since the introduction of modern [algebraic notation](https://en.wikipedia.org/wiki/Mathematical_notation "Mathematical notation").[[2]](https://en.wikipedia.org/wiki/Order_of_operations#cite_note-BS-2)[[3]](https://en.wikipedia.org/wiki/Order_of_operations#cite_note-Peterson-3) Thus, in the expression  $1 + 2 \times 3$ , the multiplication is performed before addition, and the expression has the value  $1 + (2 \times 3) = 7$ , and not  $(1 + 2) \times 3 = 9$ .

>These conventions exist to avoid notational [ambiguity](https://en.wikipedia.org/wiki/Ambiguity "Ambiguity") while allowing notation to remain brief.[[4]](https://en.wikipedia.org/wiki/Order_of_operations#cite_note-Swokowski-4) Where it is desired to override the precedence conventions, or even simply to emphasize them, [parentheses](https://en.wikipedia.org/wiki/Bracket#Parentheses "Bracket") ( ) can be used. For example,  $(2 + 3) \times 4 = 20$  forces addition to precede multiplication, while  $(3 + 5)^2  = 64$  forces addition to precede [exponentiation](https://en.wikipedia.org/wiki/Exponentiation "Exponentiation").

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/notefooter.svg">

## Know the operators in Functional Programming

Knowing how to use operators is essential for Functional Programming because the  **operator itself knows the order to perform the evaluations** .

## Advanced operator for iteration

#### What is the sum of the integers from  $0$  to  $5$ ?

Accustomed to the conventions of Imperative Programming, many programmers typically employ a  `for`  loop to solve this problem.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/javascript.svg">

```js
let sum = 0;
for (let i = 0; i <= 5; i++) {
    sum += i;
}
console.log(sum); // 15
```

After all, Imperative Programming is an approach to consider the flow of the code.

[Flowchart](https://en.wikipedia.org/wiki/Flowchart)

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1694897477508.png#gh-light-mode-only)

![image](https://raw.githubusercontent.com/ken-okabe/web-images/main/img_1687332670182.png#gh-dark-mode-only)

[Iteration](https://en.wikipedia.org/wiki/Iteration)

>In computing, iteration is the technique marking out of a block of statements within a  [computer program](https://en.wikipedia.org/wiki/Computer_program "Computer program")  for a defined number of repetitions. That block of statements is said to be  _iterated_; a computer scientist might also refer to that block of statements as  _an_  "iteration".
>### Implementations
>[Loops](https://en.wikipedia.org/wiki/Control_flow#Loops "Control flow")  constitute the most common language constructs for performing iterations. The following  [pseudocode](https://en.wikipedia.org/wiki/Pseudocode "Pseudocode")  "iterates" three times the line of code between begin & end through a  _for loop_, and uses the values of  _i_  as increments.  
>It is permissible, and often necessary, to use values from other parts of the program outside the bracketed block of statements, to perform the desired function.  
>[Iterators](https://en.wikipedia.org/wiki/Iterators "Iterators")  constitute alternative language constructs to loops, which ensure consistent iterations over specific data structures. They can eventually save time and effort in later coding attempts. In particular, an iterator allows one to repeat the same kind of operation at each node of such a data structure, often in some pre-defined order.  
>[Iteratees](https://en.wikipedia.org/wiki/Iteratees "Iteratees")  are purely functional language constructs, which accept or reject data during the iterations.

---

On the other hand, Functional Programming is an approach to consider the expressions of Mathematics.

#### What is the sum of the integers from  $0$  to  $5$ ?

$$
0 +1 + 2 + 3 + 4 + 5
$$

The most important thing to understand is that this is a  **straightforward calculation** .

However, in Imperative Programming, solving such problems often involves  **designing loops with ever-changing variables** . This can lead to complexities that obscure the problem's essence and increase the risk of introducing bugs.

The calculation for this problem proceeds as follows.

$$
\begin{gather*}
((((0 +1) + 2) + 3) + 4) + 5
\\
(((1 + 2) + 3) + 4) + 5
\\
((3 + 3) + 4) + 5
\\
(6 + 4) + 5
\\
10 + 5
\\
15
\end{gather*}
$$

So, know the operators in Functional Programming.

The adequate operator that is capable of calculating this structure is called [Fold (higher-order function)](https://en.wikipedia.org/wiki/Fold_(higher-order_function))

> In [Functional Programming](https://en.wikipedia.org/wiki/Functional_programming "Functional Programming"), **fold** (also termed **reduce**, **accumulate**, **aggregate**, **compress**, or **inject**) refers to a family of [higher-order functions](https://en.wikipedia.org/wiki/Higher-order_function "Higher-order function") that [analyze](https://en.wikipedia.org/wiki/Analysis "Analysis") a [recursive](https://en.wikipedia.org/wiki/Recursive_data_type "Recursive data type") data structure and through use of a given combining operation, recombine the results of [recursively](https://en.wikipedia.org/wiki/Recursion "Recursion") processing its constituent parts, building up a return value.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/javascript.svg">

```js
let plus = (a,b) => a + b;
let sum = [0,1,2,3,4,5].reduce(plus);
console.log(sum); // 15
```

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
let sum = [0;1;2;3;4;5] |> List.reduce (+)
printfn "%d" sum // 15
```

```fsharp
let reducer = List.reduce (+)
let sum = [0;1;2;3;4;5] |> reducer
printfn "%d" sum // 15
```

Here, we simply prepare the set of integers from 0 to 5 as   `[0,1,2,3,4,5]` or  `[0;1;2;3;4;5]` , but it's also possible to calculate such a list/array by using an adequate operator/function.

Conceptually, it's known as [Unfold](https://en.wikipedia.org/wiki/Anamorphism).

```fsharp
// Generate [0;1;2;3;4;5] using unfold
let numbers = unfold (0, fun x -> x + 1) 6
```

$$
\begin{gather*}
0
\\
0 ~ ~1
\\
0 ~ ~1 ~ ~ 2
\\
0 ~ ~ 1 ~ ~ 2 ~ ~ 3
\\
0 ~ ~ 1 ~ ~ 2 ~ ~ 3 ~ ~ 4
\\
0 ~ ~ 1 ~ ~ 2 ~ ~ 3 ~ ~ 4 ~ ~ 5
\end{gather*}
$$

In Functional Programming, typically, every element is either an expression or an operation. This paradigm allows for computations to be performed without the need for traditional control flow structures such as  `for`  loops.

## Simple operator for conditional

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1694897419514.png#gh-light-mode-only)

![image](https://raw.githubusercontent.com/ken-okabe/web-images/main/img_1687331578166.png#gh-dark-mode-only)

[Conditional ](https://en.wikipedia.org/wiki/Conditional_(computer_programming))

> ## Terminology
> In  [Imperative Programming](https://en.wikipedia.org/wiki/Imperative_programming "Imperative Programming")  languages, the term "conditional  [statement](https://en.wikipedia.org/wiki/Statement_(programming) "Statement (programming)")" is usually used, whereas in  [Functional Programming](https://en.wikipedia.org/wiki/Functional_programming "Functional Programming"), the terms "conditional  [expression](https://en.wikipedia.org/wiki/Expression_(programming) "Expression (programming)")" or "conditional construct" are preferred, because these terms all have distinct meanings.

In modern programming languages,  `if/else` is no longer a  **statement** but an  **expression** and  **operators** :

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1714234809655.png)

Rust takes advantage of  `if/else`  expression.

---

Older languages like JavaScript have  `if/else`  statements, but JavaScript also includes a [Conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator).

>The **conditional (ternary) operator** is the only JavaScript operator that takes three operands: a condition followed by a question mark (`?`), then an expression to execute if the condition is [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) followed by a colon (`:`), and finally the expression to execute if the condition is [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy). This operator is frequently used as an alternative to an [`if...else`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) statement.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/javascript.svg">

```js
let age = 26;
let beverage =
    age >= 21 
    ? "Beer" 
    : "Juice";
console.log(beverage); // "Beer"
```

---

F# takes advantage of  `if/else`  expression.

[Conditional Expressions: if...then...else](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/conditional-expressions-if-then-else)

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
let age = 26
let beverage =
    if age >= 21 
    then "Beer"
    else "Juice"
printfn "%s" beverage // "Beer"
```

---

How about more complicated conditional pattern?

JavaScript: [switch-case](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) statements

F#: [Pattern matching](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/pattern-matching) expressions

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
let x = 2
let result =
    match x with
    | 1 -> "one"
    | 2 -> "two"
    | _ -> "other"
// "two"
```

## IO Monad for sequence

![image](https://raw.githubusercontent.com/ken-okabe/web-images2/main/img_1694897378406.png#gh-light-mode-only)

![image](https://raw.githubusercontent.com/ken-okabe/web-images/main/img_1687331557359.png#gh-dark-mode-only)

In Imperative Programming, the order of statements in the code,  **from top to bottom** , determines the sequence of their execution  **without the need for explicit control structures** .

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/javascript.svg">

```js
console.log "Hello";
console.log "world!";
```

This style of Imperative Programming is also used in functional languages ​​like F# due to its simplicity, which is good.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
printfn "Hello"
printfn "world!"
```

On the other hand,  **pure functional languages**  ​​like [Haskell](https://www.haskell.org/) do not allow this style for sequnece simply because there is a strict rule that  **the order of code execution is determined by the order of mathematical operations.**

However, the use of  `do`  notation allows programmers to write code in a similar style of Imperative Programming.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images4/main/haskell.svg">

```haskell
main = do
    putStrLn "Hello"
    putStrLn "world!"
```

`do`  notation is a syntactic sugar in Haskell that offers a more concise and expressive way to write sequences of operations. The corresponding unadorned expression is as shown below:

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images4/main/haskell.svg">

```haskell
main = putStrLn "Hello" >> putStrLn "world!"
```

This is called  **IO monad** , and conceptually, not too far code in JavaScript would be:

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/javascript.svg">

```js
let main =
    () => [undefined]
        .map(() => console.log("Hello"))
        .map(() => console.log("world!"));
main();
```