# nth-cyclic

## Background

The available function `nth` in ELisp gets you the 'nth' element from a collection.

How about a modified implementation of `nth` that gives you elements in a cyclic manner? For example:

For a collection

    '("apple" "banana" "mango")

Calling `nth`

    (nth 4 '("apple" "banana" "mango"))

gives you

    nil

However, calling `nth-cyclic`

    (nth-cyclic 4 '("apple" "banana" "mango"))

gives you

    "banana"
