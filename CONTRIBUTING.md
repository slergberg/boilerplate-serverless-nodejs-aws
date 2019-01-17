# Contributing to a boilerplate

[![Build Status](https://travis-ci.org/slergberg/boilerplate-serverless-nodejs-aws.svg?branch=master)](https://travis-ci.org/slergberg/boilerplate-serverless-nodejs-aws)
[![License](https://img.shields.io/github/license/slergberg/boilerplate-serverless-nodejs-aws.svg)](https://packagist.org/packages/slergberg/boilerplate-serverless-nodejs-aws)

This template is under active development right now. You're encouraged to submit
[pull requests](https://github.com/slergberg/boilerplate-serverless-nodejs-aws/pulls),
[propose features and discuss issues](https://github.com/slergberg/boilerplate-serverless-nodejs-aws/issues).

### Fork the Project

Fork the [project on Github](https://github.com/slergberg/boilerplate-serverless-nodejs-aws)
and check out your copy.

```
git clone https://github.com/contributor/boilerplate-serverless-nodejs-aws.git
cd boilerplate-serverless-nodejs-aws
git remote add upstream https://github.com/slergberg/boilerplate-serverless-nodejs-aws.git
```

### Create a Topic Branch

Make sure your fork is up-to-date and create a topic branch for your feature or
bug fix.

```
git checkout master
git pull upstream master
git checkout -b my-feature-branch
```

### Yarn Install and Test

Ensure that you can build the project and run tests.

```
yarn install
yarn run test
```

### Write Tests

Try to write a test that reproduces the problem you're trying to fix or
describes a feature that you want to build. Add to [tests](tests).

We definitely appreciate pull requests that highlight or reproduce a problem,
even without a fix.

### Write Code

Implement your feature or bug fix.

Make sure that `yarn run test` completes without errors.

### Write Documentation

Document any external behavior in the [README](README.md).

### Commit Changes

Make sure git knows your name and email address:

```
git config --global user.name "Your Name"
git config --global user.email "contributor@example.com"
```

Writing good commit logs is important. A commit log should describe what changed
and why.

```
git add ...
git commit
```

### Push

```
git push origin my-feature-branch
```

### Make a Pull Request

Go to https://github.com/contributor/boilerplate-serverless-nodejs-aws and
select your feature branch.
Click the 'Pull Request' button and fill out the form. Pull requests are usually
reviewed within a few days.

### Rebase

If you've been working on a change for a while, rebase with upstream/master.

```
git fetch upstream
git rebase upstream/master
git push origin my-feature-branch -f
```

### Check on Your Pull Request

Go back to your pull request after a few minutes and see whether it passed
muster with Travis-CI. Everything should look green, otherwise fix issues and
amend your commit as described above.

### Be Patient

It's likely that your change will not be merged and that the nitpicky
maintainers will ask you to do more, or fix seemingly benign problems. Hang on
there!

### Thank You

Please do know that we really appreciate and value your time and work.
