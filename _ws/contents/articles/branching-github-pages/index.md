---
title: Branching for Github Pages
author: honyovk
date: 2013-08-16
template: article.jade
intro: GitHub repos that also have a Pages branch are getting more commonplace, and maintaining these branches can a pain in the ass.\n\nThis is a simple method of adding multiple branches to one working directory. While I am only discussing adding `master` and `gh-pages` branches, the idea can be used for any branch.
---

GitHub repos that also have a Pages branch are getting more commonplace, and maintaining these branches can a pain in the ass.

This is a simple method of adding multiple branches to one working directory. While I am only discussing adding `master` and `gh-pages` branches, the idea can be used for any branch.

<span class="more"></span>

### Intended directory structure

```
Repo-Name/
Repo-Name/master
Repo-Name/gh-pages
```

### How to:

First, create a main directory, then add the `master` branch locally.

```
$ cd ~/Documents/GitHub
$ mkdir repo-name
$ cd repo-name
$ git clone git@github.com:username/repo.git master
```

_`repo-name` should be the name of your repository._

Now we add the `gh-pages` branch locally.

```
$ git clone git@github.com:username/repo.git gh-pages
$ cd gh-pages
$ git checkout origin/gh-pages -b gh-pages
$ git branch -d master
$ git branch
```

_Please note: running `git clone git@github.com:username/repo.git XXX` will create a directory named XXX. Alternatively, you can `mkdir` a directory, `cd` into it and use a period `.` to use the current dir._
