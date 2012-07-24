# Javascript *onMediaQuery*

**Trigger JS when media queries change.**

[Jeremy Keith](http://adactio.com/) recently [posted a fantastic way of getting
CSS and Javascript to talk media queries with the CSS `:after` pseudo-property](http://adactio.com/journal/5429/).

---

**UPDATE 1:** It turns out that Android JS support for CSS `:after` is patchy. We've decided to set the `font-family` property on the `<html>` element instead, as it's better supported (despite being a bit of a hack).

---

**UPDATE 2:** The code now looks at `font-family` first, then falls back to `:after`.

---

This has a number of advantages over using `window.matchMedia()`, namely that you only have to maintain your breakpoints in one place and it fails more gracefully.


## How to use it

### 1. CSS

Define a set of html `font-family` and/or `:after` strings in your stylesheet that correspond to the media queries you wish to test for:

```css
html { font-family: "small"; }

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

### 2. JS

Define the queries you want to test for.. and what to do if they're TRUE

```javascript
var queries = [
	{
		context  : 'small',
		callback : function() { console.log('small'); }
	},
	{
		context  : 'medium',
		callback : function() { console.log('medium'); }
	},
	{
		context  : 'large',
		callback : function() { console.log('large'); }
	},
	{
		context  : 'xlarge',
		callback : function() { console.log('xlarge'); }
	}
];
```

### 3. Adding queries

As well as passing an array of objects when you initialise the plugin, you can add extra callbacks at any time. This is especially handy if you've got multiple JS files across the site that need to test whether a query is true:

```javascript
var q1 = MQ.addQuery({
	context  : 'large',
	callback : function() { console.log('large (#2)'); }
});
```

In the latest release, you can now have a function execute once across a range of contexts; this is helpful, for instance, if you want to initialise the code once for desktops and tablets, but leverage a custom controller on mobiles: 

```javascript
var q2 = MQ.addQuery({
	context               : ['small', 'medium'],
	call_for_each_context : false, 
	callback              : function() { console.warn('small/medium'); }
});
```

### 4. Removing queries

Remove a query by passing in a reference to it:

```javascript
MQ.removeQuery(q1);
```


### Marvel at your 1337-ness.

Enjoy responsive javascript with a friend today.

---

Josh Barr | Designer | [Springload](http://www.springload.co.nz/)


