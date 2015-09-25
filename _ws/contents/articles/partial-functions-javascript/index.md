---
title: Partial Functions in JavaScript
author: honyovk
date: 2015-09-25
template: article.jade
---

A partial is a function that returns a new function with one or more of it's arguments already applied.

Reusable code is very important. In any application, having smaller, more immutable functions can be very helpful for the same operations that may need to take place many times.

<span class="more"></span>

Let's look at a simple example:

<script src="https://gist.github.com/mbjordan/03ad754135035c9e1362.js?file=simple.js"></script>

The `simpleAddition` function accepts two arguments, and adds them together. The partial returned a new function that had already been passed `20` as it's `a` argument. This new function will now accept any Number (as it's `b` argument) and add `20` to it.

The above example is basic, but it should give you a good understanding of what is going on.

Now, let's look at a basic partial-creation function:

<script src="https://gist.github.com/mbjordan/03ad754135035c9e1362.js?file=partial.js"></script>

This can be used with any number of arguments the original function needs, but they _must_ be applied in order, and the arity must match by the second call.



There are a few good libraries out there with solid implementations of partials. Check 'em out:

* [Ramda](http://ramdajs.com/0.17/docs/#partial)
* [Lodash](https://lodash.com/docs#partial)
* [Underscore](http://underscorejs.org/#partial)
