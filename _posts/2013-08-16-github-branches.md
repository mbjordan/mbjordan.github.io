---
layout: post_page
title: Multiple GitHub Branches in one Directory
---

GitHub repos that also have a Pages branch are getting more commonplace, and maintaining these branches can a pain in the ass.

This is a simple method of adding multiple branches to one working directory. While I am only discussing adding `master` and `gh-pages` branches, The idea can be used for any branch.

### Intended directory structure

    Repo-Name/
    Repo-Name/master
    Repo-Name/gh-pages

### How to:

First, create a main directory, then add the `master` branch locally.

    $ cd ~/Documents/GitHub
    $ mkdir repo-name
    $ cd repo-name
    $ git clone git@github.com:username/repo.git master

> `repo-name` should be the name of your repository.

Now we add the `gh-pages` branch locally.

    $ git clone git@github.com:username/repo.git gh-pages
    $ cd gh-pages
    $ git checkout origin/gh-pages -b gh-pages
    $ git branch -d master
    $ git branch

> Please note: running `git clone git@github.com:username/repo.git XXX` will create a directory named XXX. Alternatively, you can `mkdir` a directory, `cd` into it and use a period `.` to use the current dir.

---

[Comment on Hacker News](https://news.ycombinator.com/item?id=6303236)