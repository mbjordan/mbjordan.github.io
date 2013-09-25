---
layout: post_page
title: Caching NoOp for use in JavaScript
---

I've read a lot of blog posts and StackOverflow responses relating to the use of a `noop` function, and though I'd briefly share my thoughts.

First off, what is `noop`? Its an empty function the performs __no op__eration when invoked.

```javascript
var noop = function(){};
```

I've seen this used a lot, and it can be quite handy in JavaScript applications. However there is a lot out there about performance when using a noop function. 

The widest and most notorious opinion is that using jQuery's `$.noop` method is the best way to go from a performance standpoint. Well, this is simply not true!

Now, if one is using jQuery, then obviously this is a good idea. The gist of the opinion, though, is that caching a noop function only once, then calling it `x` amount of times will shave off milliseconds in the actual JavaScript interpretation.

But, if one does not use jQuery (either at all or not for a specific project), the same performance improvement can be seen by declaring your own `noop`--as I have done before.

The will enable you to reuse the same noop as many times as needed without re-declaring a new empty fuction each time...