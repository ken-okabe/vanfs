# 💡 How does Functional Programming Code Drive?

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/note.svg">

[💡 What is Functional Programming?](./README-whatisFP.md)

What is  **Functional Programming** ? It's a programming paradigm that uses **Expressions** as the building blocks of the code.

In contrast,  **Imperative Programming**  is a paradigm that uses  **Statements**  to control the flow of the code.

Both programming paradigms have expressions and statements, but in functional programming, expressions are primarily used to compose other expressions, while in imperative programming, statements are primarily used to control the flow of execution.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/notefooter.svg">

This insight is widely shared, and many people today may know  **what functional programming is.**

However, what is not widely shared is the  *answer to the mystery*  of  **how functional code drives without statements to control the flow of code** .

## Battery included!

Alternatively, it might be more accurate to say that the  **engine is built-in**  from the start.

In functional programming, code is a composition of  **expressions** , and the evaluation order of these expressions is strictly defined based on mathematical rules.

Therefore,  **statements**  that control the flow of code, as in imperative programming, are not required in functional programming. (*In principle, at least.)*

## Operator associativity

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

In mathematics, a **left-associative operator**  is an operator that is evaluated from left to right. This means that when multiple instances of the operator appear in an expression, the operations are performed in the order that they are written, starting from the leftmost operator.

The addition operator ( $+$ ) is a  **left-associative operator**  in most programming languages and mathematical contexts. This means that the following expressions are evaluated as follows:

$$
1 + 2 + 3 = (1 + 2) + 3 = 6
$$

In contrast, a  **right-associative operator**  is an operator that is evaluated from right to left. For example, the exponentiation operator ( $\textasciicircum$ ) is  **right-associative** in many languages, so the following expression is evaluated as follows:

$$
2 \textasciicircum 3 \textasciicircum 2 = 2 \textasciicircum (3 \textasciicircum 2) = 128
$$

It is important to understand the associativity of operators when writing expressions, as it can affect the order of operations and the final result.

In programming context, it's often described as [Operator associativity](https://en.wikipedia.org/wiki/Operator_associativity)

> In [programming language theory](https://en.wikipedia.org/wiki/Programming_language_theory "Programming language theory"), the **associativity** of an [operator](https://en.wikipedia.org/wiki/Operator_(programming) "Operator (programming)") is a property that determines how operators of the same [precedence](https://en.wikipedia.org/wiki/Order_of_operations "Order of operations") are grouped in the absence of [parentheses](https://en.wikipedia.org/wiki/Bracket_(mathematics) "Bracket (mathematics)"). If an [operand](https://en.wikipedia.org/wiki/Operand "Operand") is both preceded and followed by operators (for example, `^ 3 ^`), and those operators have equal precedence, then the operand may be used as input to two different operations (i.e. the two operations indicated by the two operators). The choice of which operations to apply the operand to, is determined by the **associativity** of the operators. Operators may be **associative** (meaning the operations can be grouped arbitrarily), **left-associative** (meaning the operations are grouped from the left), **right-associative** (meaning the operations are grouped from the right) or **non-associative** (meaning operations cannot be chained, often because the output type is incompatible with the input types). The associativity and precedence of an operator is a part of the definition of the programming language; different programming languages may have different associativity and precedence for the same type of operator.

## Operator priority(precedence)

How about this expression?

$$
1 + 2 \times 3
$$

This is also a combination of two binary operations, but with mix of  $+$  and  $\times$ .

In this case, it is equivalent to:

$$
1 + (2 \times 3)
$$

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1713914800211.png)

But, why $1 + 2 \times 3$ becomes $1 + (2 \times 3)$ ??

In mathematics, the order of operations, also known as  **operator precedence**  or  **operator priority** , is a set of rules that define the order in which operations should be performed in an expression. This is important because different orders of operations can produce different results.

[Order of operations](https://en.wikipedia.org/wiki/Order_of_operations)

>For example, multiplication is granted a higher precedence than addition, and it has been this way since the introduction of modern [algebraic notation](https://en.wikipedia.org/wiki/Mathematical_notation "Mathematical notation").[[2]](https://en.wikipedia.org/wiki/Order_of_operations#cite_note-BS-2)[[3]](https://en.wikipedia.org/wiki/Order_of_operations#cite_note-Peterson-3) Thus, in the expression  $1 + 2 \times 3$ , the multiplication is performed before addition, and the expression has the value  $1 + (2 \times 3) = 7$ , and not  $(1 + 2) \times 3 = 9$ .

>These conventions exist to avoid notational [ambiguity](https://en.wikipedia.org/wiki/Ambiguity "Ambiguity") while allowing notation to remain brief.[[4]](https://en.wikipedia.org/wiki/Order_of_operations#cite_note-Swokowski-4) Where it is desired to override the precedence conventions, or even simply to emphasize them, [parentheses](https://en.wikipedia.org/wiki/Bracket#Parentheses "Bracket") ( ) can be used. For example,  $(2 + 3) \times 4 = 20$  forces addition to precede multiplication, while  $(3 + 5)^2  = 64$  forces addition to precede [exponentiation](https://en.wikipedia.org/wiki/Exponentiation "Exponentiation").

## Know the operators in functional programming

Knowing how to use operators is essential for functional programming because the  **operator itself knows the order to perform the evaluations** .

## Advanced operator for iteration

#### What is the sum of the integers from  $0$  to  $5$ ?

Accustomed to the conventions of imperative programming, many programmers typically employ a  `for`  loop to solve this problem.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/javascript.svg">

```js
let sum = 0;
for (let i = 0; i <= 5; i++) {
    sum += i;
}
console.log(sum); // 15
```

After all, Imperative programming is an approach to consider the flow of the code.

[Flowchart](https://en.wikipedia.org/wiki/Flowchart)

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1713950299457.png)

[Iteration](https://en.wikipedia.org/wiki/Iteration)

>In computing, iteration is the technique marking out of a block of statements within a  [computer program](https://en.wikipedia.org/wiki/Computer_program "Computer program")  for a defined number of repetitions. That block of statements is said to be  _iterated_; a computer scientist might also refer to that block of statements as  _an_  "iteration".
>### Implementations
>[Loops](https://en.wikipedia.org/wiki/Control_flow#Loops "Control flow")  constitute the most common language constructs for performing iterations. The following  [pseudocode](https://en.wikipedia.org/wiki/Pseudocode "Pseudocode")  "iterates" three times the line of code between begin & end through a  _for loop_, and uses the values of  _i_  as increments.  
>It is permissible, and often necessary, to use values from other parts of the program outside the bracketed block of statements, to perform the desired function.  
>[Iterators](https://en.wikipedia.org/wiki/Iterators "Iterators")  constitute alternative language constructs to loops, which ensure consistent iterations over specific data structures. They can eventually save time and effort in later coding attempts. In particular, an iterator allows one to repeat the same kind of operation at each node of such a data structure, often in some pre-defined order.  
>[Iteratees](https://en.wikipedia.org/wiki/Iteratees "Iteratees")  are purely functional language constructs, which accept or reject data during the iterations.

---

On the other hand, Functional programming is an approach to consider the expressions of Mathematics.

#### What is the sum of the integers from  $0$  to  $5$ ?

This is a math problem, and probably, bright math students would replace the problem to:

$$
S = \sum_{n=0}^{5} n
$$

* **S** represents the sum we want to find
* **Σ** denotes the summation symbol
* **(n | n ∈ [0, 5])** represents the set of integers from 0 to 5, inclusive

The most important thing to understand is that this is a  **straightforward calculation** .

However, in imperative programming, solving such problems often involves  **designing loops with ever-changing variables** . This can lead to complexities that obscure the problem's essence and increase the risk of introducing bugs.

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

So, know the operators in functional programming.

The adequate operator that is capable of calculating this structure is called [Fold (higher-order function)](https://en.wikipedia.org/wiki/Fold_(higher-order_function))

> In [functional programming](https://en.wikipedia.org/wiki/Functional_programming "Functional programming"), **fold** (also termed **reduce**, **accumulate**, **aggregate**, **compress**, or **inject**) refers to a family of [higher-order functions](https://en.wikipedia.org/wiki/Higher-order_function "Higher-order function") that [analyze](https://en.wikipedia.org/wiki/Analysis "Analysis") a [recursive](https://en.wikipedia.org/wiki/Recursive_data_type "Recursive data type") data structure and through use of a given combining operation, recombine the results of [recursively](https://en.wikipedia.org/wiki/Recursion "Recursion") processing its constituent parts, building up a return value.

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

* **(n | n ∈ [0, 5])** represents the set of integers from 0 to 5, inclusive

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

In functional programming, typically, every element is either an expression or an operation. This paradigm allows for computations to be performed without the need for traditional control flow structures such as  `for`  loops.

## Simple operator for conditional

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1714222493215.png)

[Conditional ](https://en.wikipedia.org/wiki/Conditional_(computer_programming))

> ## Terminology
> In  [imperative programming](https://en.wikipedia.org/wiki/Imperative_programming "Imperative programming")  languages, the term "conditional  [statement](https://en.wikipedia.org/wiki/Statement_(programming) "Statement (programming)")" is usually used, whereas in  [functional programming](https://en.wikipedia.org/wiki/Functional_programming "Functional programming"), the terms "conditional  [expression](https://en.wikipedia.org/wiki/Expression_(programming) "Expression (programming)")" or "conditional construct" are preferred, because these terms all have distinct meanings.

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

![image](https://raw.githubusercontent.com/ken-okabe/web-images4/main/img_1714226994509.png)

In imperative programming, the order of statements in the code,  **from top to bottom** , determines the sequence of their execution  **without the need for explicit control structures** .

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/javascript.svg">

```js
console.log "Hello";
console.log "world!";
```

This style of imperative programming is also used in functional languages ​​like F# due to its simplicity, which is good.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/fsharp.svg">

```fsharp
printfn "Hello"
printfn "world!"
```

On the other hand,  **pure functional languages**  ​​like [Haskell](https://www.haskell.org/) do not allow this style for sequnece simply because there is a strict rule that  **the order of code execution is determined by the order of mathematical operations.**

However, the use of  `do`  notation allows programmers to write code in a similar style of imperative programming.

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