# TODO

## Future

* Merge [this pull request](https://github.com/JoshBarr/js-media-queries/pull/3) with latest master branch?
* ~~Create a `setter` for `document.documentElement`; this would make it easy to change the target object for the `font-family` checks.~~
    * Overkill.
* Via [this issue/comment](https://github.com/JoshBarr/js-media-queries/issues/7#issuecomment-7172733):
    * "One thing to watch is the 'call in each context' bool. We might need to rewrite the API with an init() that can belong to multiple contexts, and oncontextchange() method for each breakpoint. Often we want the same function to fire for tablet and desktop, with mobile doing something different."
        * Should we change design pattern to something more **hardcore** JS OOP?
* Gecko browsers appear to return `"none"` as the content for `body:after` if it's not set in the CSS. I can think of two solutions:
    1. Make `body:after` required.
    1. Check for `"none"` or other default value (I think WebKit browsers return an integer) in the `_contentAfter()` method.
* ~~Don't forget to create a min version before merging the `develop` branch into `master`.~~
    * Done! Booyah! :)