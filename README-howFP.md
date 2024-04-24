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

Knowing how to use operators is essential for functional programming because the operators itself knows the order to perform the evaluations.

## Advanced operators

[Fold (higher-order function)](https://en.wikipedia.org/wiki/Fold_(higher-order_function)) is one of the most important operators in functional programming.

> In [functional programming](https://en.wikipedia.org/wiki/Functional_programming "Functional programming"), **fold** (also termed **reduce**, **accumulate**, **aggregate**, **compress**, or **inject**) refers to a family of [higher-order functions](https://en.wikipedia.org/wiki/Higher-order_function "Higher-order function") that [analyze](https://en.wikipedia.org/wiki/Analysis "Analysis") a [recursive](https://en.wikipedia.org/wiki/Recursive_data_type "Recursive data type") data structure and through use of a given combining operation, recombine the results of [recursively](https://en.wikipedia.org/wiki/Recursion "Recursion") processing its constituent parts, building up a return value.

<img width="100%" src="https://raw.githubusercontent.com/ken-okabe/web-images/main/javascript.svg">

```js
let sum = 0;
for (let i = 0; i <= 5; i++) {
    sum += i;
}
console.log(sum); // 15
```

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
// Generate [0;1;2;3;4;5] using unfold
let numbers = unfold (0, fun x -> x + 1) 6
```