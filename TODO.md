# TODO

## Future

* Merge [this pull request](https://github.com/JoshBarr/js-media-queries/pull/3) with latest master branch?
* Create a `setter` for `document.documentElement`; this would make it easy to change the target object for the `font-family` checks.
* Via [this issue/comment](https://github.com/JoshBarr/js-media-queries/issues/7#issuecomment-7172733):
    * "One thing to watch is the 'call in each context' bool. We might need to rewrite the API with an init() that can belong to multiple contexts, and oncontextchange() method for each breakpoint. Often we want the same function to fire for tablet and desktop, with mobile doing something different."
* Change design pattern to something more **hardcore** OOP?