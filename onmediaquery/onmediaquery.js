/**
 * onMediaQuery
 *
 * @docs      https://github.com/JoshBarr/js-media-queries
 * @copyright Copyright (c) 2012 Springload.
 * @license   Released under the MIT license.
 *            http://www.opensource.org/licenses/mit-license.php
 * @version   1.0.0
 * @date      Saturday, October 6, 2012
 * @see       https://github.com/registerguard/js-media-queries
 */

;(function(omq){
	
	//--------------------------------------------------------------------------
	//
	// Public methods:
	//
	//--------------------------------------------------------------------------
	
	/**
	 * initializes the oMQ object and sets the initial media query callbacks.
	 *
	 * @param query { object } The query object.
	 * @constructor
	 */
	
	omq.init = function(query) {
		
		this.callbacks    = []; // Container for all callbacks registered with the plugin.
		this.last_context = ''; // Current active query.
		this.context      = ''; // Current active query to be read inside callbacks, as this.last_context won't be set when they're called!
		
		if (typeof query !== 'undefined') {
			
			for (var i = 0, l = query.length; i < l; i++) {
				
				this.addQuery(query[i]);
				
			}
			
		}
		
		_addEvent(window, 'resize', _listenForChange, omq); // Add a listener to the window.resize event, pass omq/self as the scope.
		
		_listenForChange.call(this); // Figure out which query is active on load.
		
	};
	
	//--------------------------------------------------------------------
	
	/**
	 * Attach a new query to test.
	 *
	 * @param query {
	 *     context: ['some_media_query', 'some_other_media_query'],
	 *     call_for_each_context: true,
	 *     callback: function() {
	 *         // Something awesome here...
	 *     }
	 * }
	 *
	 * @return { object } A reference to the query that was added.
	 */
	
	omq.addQuery = function(query) {
		
		if (query) {
			
			this.callbacks.push(query);
			
			// If the context is passed as a string then turn it into an array (for unified approach elsewhere in the code):
			if (typeof query.context === 'string') query.context = [query.context];
			
			// See if "call_for_each_context" is set; if not then set a default (IBID):
			if (typeof query.call_for_each_context !== 'boolean') query.call_for_each_context = true; // Default
			
			// Fire the added callback if it matches the current context:
			if ((this.last_context) && _inArray(this.last_context, query.context)) query.callback();
			
			return this.callbacks[this.callbacks.length - 1];
			
		}
		
	};
	
	//--------------------------------------------------------------------
	
	/**
	 * Remove a query by reference.
	 *
	 * @param query { object }
	 */
	
	omq.removeQuery = function(query) {
		
		if (query) {
			
			var match = -1;
			
			while ((match = this.callbacks.indexOf(query)) > -1) this.callbacks.splice(match, 1);
			
		}
		
	};
	
	//--------------------------------------------------------------------
	
	/**
	 * Get the current context.
	 *
	 * @return { string } The currently defined media query.
	 */
	
	omq.getContext = function() {
		
		var context = _contentAfter(document.body) || _fontFamily(document.documentElement); // Returns the first value that is "truth-like", or the last value, if no values are "truth-like".
		
		return context.replace(/['",]/g, ''); // Android browsers place a "," after an item in the font family list; most browsers either single or double quote the string.
		
	};
	
	//--------------------------------------------------------------------------
	//
	// Private methods:
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Binds to the window.onResize and checks for media query changes.
	 *
	 * @this { object } Current instance.
	 */
	
	function _listenForChange() {
		
		// Get the value of :after or font-family from the chosen element style:
		var context = this.getContext();
		
		// Do we have a context? Note that Opera doesn't jive with font-family on the <html> element...
		if (context) {
			
			if (context !== this.last_context) {
				
				this.context = context;
				
				_triggerCallbacks.call(this, this.context);
				
			}
			
			this.last_context = this.context;
			
		}
		
	};
	
	//--------------------------------------------------------------------
	
	/**
	 * Loop through the stored callbacks and execute the ones that are bound to the current context.
	 *
	 * @this { object } Current instance.
	 * @param context { string }
	 */
	
	function _triggerCallbacks(context) {
		
		if (context) {
			
			var callback_function;
			
			for (var i = 0, l = this.callbacks.length; i < l; i++) {
				
				// Don't call for each context?
				if ((this.callbacks[i].call_for_each_context === false) && _inArray(this.last_context, this.callbacks[i].context)) continue; // Was previously called, and we don't want to call it for each context.
				
				callback_function = this.callbacks[i].callback; // Callback function.
				
				if (_inArray(context, this.callbacks[i].context) && (callback_function !== undefined)) callback_function(); // Callback!
				
			}
			
		}
		
	};
	
	//--------------------------------------------------------------------
	
	/**
	 * Swiss Army Knife event binding, in lieu of jQuery.
	 *
	 * @param elem { object } Target object element.
	 * @param type { string } Event type.
	 * @param eventHandle { method }
	 * @param eventContext { object }
	 */
	
	function _addEvent(elem, type, eventHandle, eventContext) {
		
		if (elem) {
			
			if (elem.addEventListener) {
				
				// If the browser supports event listeners, use them:
				elem.addEventListener(type, function() { eventHandle.call(eventContext); }, false);
				
			} else if (elem.attachEvent) {
				
				// IE & Opera:
				elem.attachEvent('on' + type, function() { eventHandle.call(eventContext); });
				
			} else {
				
				// Otherwise, replace the current thing bound to on[whatever]!
				elem['on' + type] = function() { eventHandle.call(eventContext); }; // @TODO: Consider refactoring.
				
			}
			
		}
		
	};
	
	//--------------------------------------------------------------------
	
	/**
	 * Checks if "needle" occurs in "haystack".
	 *
	 * @param needle { mixed } Look for in haystack array.
	 * @param haystack { array } Haystack array to search in.
	 * @return { boolan } True if the needle occurs, false otherwise.
	 */
	
	function _inArray(needle, haystack) {
		
		for (var i = 0, l = haystack.length; i < l; i++) {
			
			if (haystack[i] == needle) return true;
			
		}
		
		return false;
		
	};
	
	//--------------------------------------------------------------------
	
	/**
	 * Get the font-family style value of the passed element's style.
	 *
	 * @return { string } Value or empty string.
	 */
	
	function _fontFamily(el) {
		
		if (el) {
			
			// return (IE browser?) ? (Return IE fontFamily) : ((W3C browser?) ? (Return W3C font-family) : Return empty string);
			return (el.currentStyle) ? el.currentStyle['fontFamily'] : ((window.getComputedStyle) ? window.getComputedStyle(el).getPropertyValue('font-family') : '');
			
		}
		
	};
	
	//--------------------------------------------------------------------
	
	/**
	 * Get the :after content value of from the passed element's style.
	 *
	 * @return { string } Value or empty string.
	 */
	
	function _contentAfter(el) {
		
		if (el) {
			
			return (window.getComputedStyle) ? window.getComputedStyle(el, ':after').getPropertyValue('content') : ''; // getPropertyValue() Returns an empty string in Firefox and Opera and null in Google Chrome and Safari.
			
		}
		
	};
	
	//--------------------------------------------------------------------
	
	return omq; // Expose the API.
	
}(window.oMQ = window.oMQ || {})); // Use existing namespace or make a new object of that namespace.