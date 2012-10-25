# onMediaQuery: *Responsive javascript*

### Trigger javascript when CSS media queries change.

---

[Jeremy Keith](http://adactio.com/) recently [posted a fantastic way of getting
CSS and Javascript to talk media queries with the CSS `:after` pseudo-property](http://adactio.com/journal/5429/).

This has a number of advantages over using `window.matchMedia()`, namely that you only have to maintain your breakpoints in one place and it fails more gracefully.

---

**UPDATE 1:** It turns out that Android JS support for CSS `:after` is patchy. We've decided to set the `font-family` property on the `<html>` element instead, as it's better supported (despite being a bit of a hack).

---

**UPDATE 2:** The code now looks at `:after` first (this makes Opera happy) and then falls back to `font-family` (setting both is now a **requirement**). View the `CHANGELOG.md` for a list of browsers this code has been tested in.


## How to use it

### CSS:

Define a set of html `font-family` **and** `:after` strings in your stylesheet that correspond to the media queries you wish to test for:

```css
html { font-family: "small"; }

body { font-family: Arial, sans-serif; } /* Override <html> inheritance. */

body:after {
	content: "small";
	display: none;
}

@media only screen and (min-width: 450px) {
	
	html { font-family: "medium"; }
	body:after { content: "medium"; }
	
}

@media only screen and (min-width: 900px) {
	
	html { font-family: "large"; }
	body:after { content: "large"; }
	
}

@media only screen and (min-width: 1350px) {
	
	html { font-family: "xlarge"; }
	body:after { content: "xlarge"; }
	
}
```

### JS:

Define the queries you want to test for.. and what to do if they're TRUE

```javascript
var queries = [
	{
		context : 'small',
		match   : function() { console.log('MATCH: small'); },
		unmatch : function() { console.log('UNMATCH: small'); }
	},
	{
		context : 'medium',
		match   : function() { console.log('MATCH: medium'); },
		unmatch : function() { console.log('UNMATCH: medium'); }
	},
	{
		context : 'large',
		match   : function() { console.log('MATCH: large'); },
		unmatch : function() { console.log('UNMATCH: large'); }
	}
];
```

Fire off the code:

```javascript
window.onload = function() { oMQ.init(queries); };
```

### Adding queries after `init()`:

As well as passing an array of objects when you initialise the plugin, you can add extra callbacks at any time. This is especially handy if you've got multiple JS files across the site that need to test whether a query is true:

```javascript
var q1 = oMQ.addQuery({
	context : 'xlarge',
	match   : function() { console.log('MATCH: xlarge'); },
	unmatch : function() { console.log('UNMATCH: xlarge'); }
});
```

In the latest release, you can now have a function execute once across a range of contexts; this is helpful, for instance, if you want to initialise the code once for desktops and tablets, but leverage a custom controller on mobiles: 

```javascript
var q2 = oMQ.addQuery({
	context               : ['small', 'medium'],
	call_for_each_context : false,
	match                 : function() { console.log('MATCH: small/medium'); },
	unmatch               : function() { console.log('MATCH: small/medium'); }
});
```

### Removing queries:

Remove a query by passing in a reference to it:

```javascript
oMQ.removeQuery(q1);
```

### Getting the context:

1. `getContext()`: Returns the media query's current context; this method can be called before `oMQ` has been instantiated.

1. `getLastContext()`: Returns the media query's last context; if there is no last context, then the current context is returned.

---

## Demo:

[![qr code](http://chart.apis.google.com/chart?cht=qr&chl=http://registerguard.github.com/js-media-queries&chs=240x240)](http://registerguard.github.com/js-media-queries/demo/)

(Scan QR code with phone and/or click to [view the latest demo](http://registerguard.github.com/js-media-queries/demo/).)

---

### Marvel at your 1337-ness.

Enjoy responsive javascript with a friend today.

Josh Barr | Designer | [Springload](http://www.springload.co.nz)