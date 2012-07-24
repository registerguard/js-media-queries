# Changelog

## vX.X.X
#### Mmmmm [D]D, YYYY

* ...

---

## v0.1.0
#### July 22, 2012

* Added version number 0.1.0.
* Reorganized project files.
    * Set things up so that JS files can be easily found by putting them in a `js-media-queries` folder.
    * Added files: `CHANGELOG.md`, `CONTRIBUTORS.md`, `MIT-LICENSE` and `TODO.md`.
* Simplified demo index.html page:
    * having to maintain documentation in both places was a bit cumbersome.
    * Wanted the focus to be on the javascript and having a simplified page helps to make demo a clear as possible.
    * Added respond.js.
    * Added script to change `<html>`'s `no-js` class.
* Cleaned-up and changed demo CSS file:
    *  Added `:after` styles for greater browser support.
    * Optimized IE-only CSS.
    * Added a few more media queries.
    * Changed `:after` and `font-family` query names to `small`, `medium`, `large` and `xlarge`.
* Updated `README.md`.
* Cross-browser tested project files.
* Updated minified JS file.
* Cleaned-up JS and added new comments.
* Fixed [this syntax/logic error](https://github.com/JoshBarr/js-media-queries/blob/247ce8caf42b23eb11bc98bd7b086b3f00f4f22b/js/onmediaquery.js#L151): `elem.attachEven`
* Probably the biggest change to the JS was adding the ability to look at `font-family` **and** `:after`:
    * Opera has issues with `font-family` so `:after` is checked first.
        * **Note:** As of this version, Opera will use `font-family` if `:after` is not set; unfortunately, Opera returns the "default" `font-family` (i.e. `Times New Roman`), so our script will fail.
* Converted code block spaces to tabs… I love using spaces for Python, but I use tabs for everything else. :)
* Created new gh-pages branch for the sake of previewing demo page content.

##### Browser tests:

* MAC Snow Leopard:
    * Firefox 14.0.x, Safari 5.1.x, Opera 12.00, Chrome 20.0.x
* PC Vista:
    * Firefox 3.6.x, Firefox 14.0.x, Chrome 20.0.x, Safari 5.1.x, Opera 12.00
    * IE 9.0.x, IE 8.0.x, IE 7.0.x
* PC XP:
    * IE 6.0.x
* iPhone 4:
    * Safari 4.3 (simulated), Safari 5.1.1, Chrome 19.0.x, Opera Mini 7.0.x
* iPhone:
    * Safari 4.3 (simulated)
* iPad:
    * Safari 4.3 (simulated), Safari 5.1.1

---