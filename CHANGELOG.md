# Changelog

## vX.X.X
#### Mmmmm [D]D, YYYY

* ...

---

## v2.0.0
#### October 24, 2012

* Updated `CHANGELOG.md`.
* Renamed `this.callbacks`, `this.last_context` and `this.context` to `this._callbacks`, `this._context` and `this._last_context` respectively.
* Added some markdown backticks to comments for code/markup references.
* Merged [@patocallaghan](https://github.com/patocallaghan/)'s fork:
	* Modified the callback firing functionality to work with mediaquery context `unmatch`.
		* Added ability to fire callbacks when a mediaquery unmatches.
	* Backwards incompatable change: Changed `callback` to `match`. 
	* Refactored code to pass linting.
	* Introducted `getContext()` and `getLastContext()` convenience methods to retrieve mediaquery state.
		* `getContext()`: This method can be called before `oMQ` has been instantiated.
		* `getLastContext()`: If there is no last context, then the current context is returned.
* Added Pat to `CONTRIBUTORS.md`.
* New version number: `v2.0.0`.
* Fixed typo in `MIT-LICENSE`.
* Removed `TODO.md` (moved to the project's issue center).
* Updated demo files to reflect the new changes.
* Updated `README.md` to bring back in docs (moved from WIKI).

##### Browser tests:

* MAC Snow Leopard:
	* Firefox `16.0.1`, Safari `6.0.1 (8536.26.14)`, Opera `12.02 (1578)`, Chrome `22.0.1229.94`
* PC Vista:
	* Firefox `16.0.1`, Chrome `22.0.1229.94 m`, Safari `5.1.7 (7534.57.2)`, Opera `12.02 (1578)`
	* IE `9.0.8112.16421`, IE `8.0.6001.18702`, IE `7.0.6002.18005`
* PC XP:
    * IE `6.0.2900.5512.xpsp_sp3_gdr.120504-1619`
* iPhone (Retina 4-inch):
	* Safari (simulated)
* iPhone (Retina 3.5-inch), iOS `6.0`:
	* Safari (simulated), Safari, Chrome `21.0.1180.82`, Opera Mini `7.0.5.45389`
* iPhone, iOS `6.0`:
	* Safari (simulated)
* iPad (Retina), iOS `6.0`:
	* Safari
* iPad, iOS `6.0`:
	* Safari (simulated)
* iPad, iOS `5.1.1`:
	* Safari

---

## v1.0.0
#### October 6, 2012

* New version number: `v1.0.0`!
* Removed version number from file name.
	* Added version number to header comment inside JS file.
* Removed `min` version (folks should minify via their build process).
* Cleaned up JS:
	* Fixed some missing tabs.
	* Simplified IIFE closure.
	* Added `getContext()` public method (returns the current context and can be used before `init()` is called).
	* Minor comment/code tweaks.
	* **Backwards incompatable changes:**
		* `MQ`/`mq` variable names now `oMQ`/`omq` respectively.
		* `this.context` to `this.last_context`.
		* Changed `this.new_context` to `this.context`.
* Updated demo `html` and `css`.
* Updated `js` plugin `respond.min.js` to latest `min` version (now just drag/drop from that project's repo).
* Renamed `js-media-queries` to `onmediaquery`.
* Moved most information in `README.md` to the WIKI.
* Added QR code to `README.md`.

##### Browser tests:

* MAC Snow Leopard:
	* Firefox `15.0.1`, Safari `6.0.1 (8536.26.14)`, Opera `12.02 (1578)`, Chrome `22.0.1229.79`
* PC Vista:
	* Firefox `15.0.1`, Chrome `22.0.1229.79 m`, Safari `5.1.7 (7534.57.2)`, Opera `12.02 (1578)`
	* IE `9.0.8112.16421`, IE `8.0.6001.18702`, IE `7.0.6002.18005`
* PC XP:
    * IE `6.0.2900.5512.xpsp_sp3_gdr.120504-1619`
* iPhone (Retina 4-inch):
	* Safari (simulated)
* iPhone (Retina 3.5-inch), iOS `6.0`:
	* Safari (simulated), Safari, Chrome `21.0.1180.82`, Opera Mini `7.0.4.44138`
* iPhone, iOS `6.0`:
	* Safari (simulated)
* iPad (Retina), iOS `6.0`:
	* Safari
* iPad, iOS `6.0`:
	* Safari (simulated)
* iPad, iOS `5.1.1`:
	* Safari

---

## v0.1.1
#### July 26, 2012

* Bumped version number.
* Made "private" methods truly private.
    * [More info here](http://stackoverflow.com/questions/11621430/javascript-module-pattern-when-to-go-private-with-methods-getters-setters-roo/11621455).
* Updated README.md.
* Removed outside `MQ || {}` check.
    * [More info here](https://gist.github.com/3186282).
* Updated minified script: Using [YUI Compressor 2.4.2](http://compressorrater.thruhere.net/) with `nomunge`, `preserveAllSemi`, `disableOpt` options.

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
        * **Note:** As of this version, Opera will use `font-family` if `:after` is not set; unfortunately, Opera returns the "default" `font-family` (i.e. `Times New Roman`), so our script will fail silently in this browser.
* Converted code block spaces to tabs… I love using spaces for Python, but I use tabs for everything else. :)
* Created new `gh-pages` branch for the sake of previewing demo page content.
* Created new `develop` branch for my crazy commits.

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

Version number and changes prior to this fork are (currently) not documented.