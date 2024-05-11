# Ethan's blog &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

This is a blog system temlpate that built fully with reactive programming paradigm in React. And the front-end is decoupled well with the backend so that anyone should have easy time implementing it with one's back-end with just one endpoint for data and one member system(I am using firebase for prices).

## Spec

Infra: npm

Front-end Host: github page(easy to a change to your own)

Back-end Host: firebase(easy to a change to your own)

## Seed Data for Firebase

Using data in localhost, then overwrite the TARGET_COLLECTION variable(then save!) to change the saving distnation the firebase to get the seed data in firebase.

## .env.example

```
REACT_APP_TEST_MODE=TRUE
REACT_APP_NODE_ENV=local
REACT_APP_TARGET_COLLECTION=test_random
```
