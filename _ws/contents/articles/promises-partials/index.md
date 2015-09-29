---
title: Promises & Partials
author: honyovk
date: 2015-09-29
template: article.jade
---

As a full-stack JavaScript engineer, I work on a happy mix of both back-end and front-end projects.

On the front-end side of the stack, I write my fair share of AJAX calls. That is, getting and setting data from back-end services. Among the many different tools to accomplish this, I find using promises & partials to be very useful.

The functional pattern of getting XHR data with promises and partials allows one to write code that is more immutable and reusable.

<span class="more"></span>

### The Partials

Let's say we have a website, and want to display a certain user's profile from an AJAX call. We could create a simple jQuery function to do this:

<script src="https://gist.github.com/mbjordan/1a0febf9375bf5648801.js?file=getUserProfileAndDisplay.js"></script>

That's simple enough right? All you'd need to do is call `getUserProfileAndDisplay(1234)` and boom!

But what if you want to create many functions that perform similar tasks, and don't want `n` number of functions that are only slightly different? Partials can help!

First, let's start with a basic function that creates [partials](/articles/partial-functions-javascript/):

<script src="https://gist.github.com/mbjordan/1a0febf9375bf5648801.js?file=partial.js"></script>

Great! Now we can create a basic `ajaxGetter` function:

<script src="https://gist.github.com/mbjordan/1a0febf9375bf5648801.js?file=ajaxGetter.js"></script>

If you notice that the `ajaxGetterExecutor` function accepts four arguments, while the `ajaxGetter` function only accepts two, you'll see that we're creating a partial function inside `ajaxGetter` with `url, data` already applied. Now, the only arguments left to fulfill are the `resolve` and `reject` arguments for the ES6 Promise. <small>(More on Promises in a minute.)</small>

We now have a function named `ajaxGetter` that we pass a URL and some optional data. Lets put it to action...

<script src="https://gist.github.com/mbjordan/1a0febf9375bf5648801.js?file=ajaxGetter.ex1.js"></script>

However, we can take this even further by creating yet another partial, this time of `ajaxGetter`:

<script src="https://gist.github.com/mbjordan/1a0febf9375bf5648801.js?file=getUserProfile.js"></script>

Now we have a function named `getUserProfile` that only does one thing, but we also still have `ajaxGetter` for any other needed operations.

### The Promises

Now that we have a dedicated function for getting user data, _naturally_ we'll want to do something with that data. Let's get a user profile and display some basic parts:

<script src="https://gist.github.com/mbjordan/1a0febf9375bf5648801.js?file=getUserProfile.ex1.js"></script>

Boom! That's easy enough right? But, what if we don't want a ton of functions that all do the same thing except for which jQuery node they're inserting into? We can just create a partial of the `display` function, and pass it the node we want to update:

<script src="https://gist.github.com/mbjordan/1a0febf9375bf5648801.js?file=getUserProfile.ex2.js"></script>

We know the correct order in which to do this because we're setting the array in the `profileDataToArray` function.

---

There's so much that can be done using Promises & Partials (and even curried functions, but that's for another time). Please see below for some further reading on the topic:

* [ES6 Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* [Partials](/articles/partial-functions-javascript/)
* [Array.shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
