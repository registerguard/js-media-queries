/**
 * onMediaQuery
 *
 * @docs      https://github.com/JoshBarr/js-media-queries (original)
 *            https://github.com/registerguard/js-media-queries (this fork)
 * @copyright Copyright (c) 2012 Springload.
 * @license   Released under the MIT license.
 *            http://www.opensource.org/licenses/mit-license.php
 * @patterns  1) Closure 2) Alias 3) Namespace extension.
 * @version   2.0.0
 * @date      Wednesday, October 24, 2012
 */

(function(omq) { // rgne.ws/V4HOQy
	
	//--------------------------------------------------------------------------
	//
	// Public methods:
	//
	//--------------------------------------------------------------------------
	
	/**
	 * Initializes the oMQ object and sets the initial media query callbacks.
	 *
	 * @param query_array { object } The query object.
	 * @constructor
	 */
	
	omq.init = function(query_array) {
		
		this.callbacks    = []; // Container for all callbacks registered with the plugin.
		this.last_context = ''; // Current active query.
		this.context      = ''; // Current active query to be read inside callbacks, as this.last_context won't be set when they're called!
		
		if (typeof query_array !== 'undefined') {
			
			for (var i = 0, l = query_array.length; i < l; i++) {
				
				this.addQuery(query_array[i]);
				
			}
			
		}
		
		// Add a listener to the window.resize event, pass omq/self as the scope:
		_addEvent(window, 'resize', _listenForChange, omq);
		
		// Figure out which query is active on load:
		_listenForChange.call(this);
		
	};
	
	//--------------------------------------------------------------------
	
	/**
	 * Attach a new query to test.
	 *
	 * @return { object } A reference to the query that was added.
	 */
	
	omq.addQuery = function(query_object) {
		
		if ((query_object !== null) && (query_object !== undefined)) {
			
			this.callbacks.push(query_object);
			
			if (typeof query_object.context === 'string') {
				
				// If the context is passed as a string then turn it into an array (for unified approach elsewhere in the code):
				query_object.context = [query_object.context];
				
			}
			
			if (typeof query_object.call_for_each_context !== 'boolean') {
				
				// See if "call_for_each_context" is set; if not then set a default (IBID):
				query_object.call_for_each_context = true; // Default
				
			}
			
			if ((this.last_context !== '') && _inArray(this.last_context, query_object.context)) {
				
				// Fire the added callback if it matches the current context:
				query_object.match();
				
			}
			
			return this.callbacks[this.callbacks.length - 1];
			
		}
		
	};
	
	//--------------------------------------------------------------------
	
	/**
	 * Remove a query by reference.
	 *
	 * @param query_object { object }
	 */
	
	omq.removeQuery = function(query_object) {
		
		if ((query_object !== null) && (query_object !== undefined)) {
			
			var match = -1;
			
			while ((match = this.callbacks.indexOf(query_object)) > -1) {
				
				this.callbacks.splice(match, 1);
				
			}
			
		}
		
	};
	
	//--------------------------------------------------------------------
	
	/**
	 * Getter that returns the media query's last context.
	 *
	 * @return { string } The current media query's context.
	 */
	omq.getLastContext = function() {
		
		return this.last_context;
		
	};
	
	//--------------------------------------------------------------------
	
	/**
	 * Getter that returns the media query's current context.
	 *
	 * @return { string } Returns the current media query's context.
	 */
	
	omq.getContext = function() {
		
		return (this.context) ? this.context : _pickContext();
		
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
		var query_string = _pickContext();
		
		// Do we have a context? Note that Opera doesn't jive with font-family on the <html> element...
		if (query_string !== null) {
			
			if (query_string !== this.last_context) {
				
				this.context = query_string;
				
				// Unmatched callback:
				_triggerCallbacks.call(this, this.last_context, 'unmatch');
				
				// Matched callback:
				_triggerCallbacks.call(this, this.context, 'match');
				
			}
			
			// Update the last context:
			this.last_context = this.context;
			
		}
		
	}
	
	//--------------------------------------------------------------------
	
	/**
	 * Loop through the stored callbacks and execute the ones that are bound to the current context.
	 *
	 * @this { object } Current instance.
	 * @param size { string } The current context.
	 * @param key { string } Either "match" or "unmatch".
	 */
	
	function _triggerCallbacks(size, key) {
			
			var callback_function;
			
			for (var i = 0, l = this.callbacks.length; i < l; i++) {
				
				// Don't call for each context?
				if (this.callbacks[i].call_for_each_context === false) {
					
					if (((key === 'match') && _inArray(this.last_context, this.callbacks[i].context)) || ((key === 'unmatch') && _inArray(this.context, this.callbacks[i].context))) {
						
						continue; // Was previously called, and we don't want to call it for each context.
						
					}
					
				}
				
				callback_function = this.callbacks[i][key]; // Callback function.
				
				if (_inArray(size, this.callbacks[i].context) && (callback_function !== undefined)) {
					
					callback_function(); // Callback!
					
				}
				
			}
		
	}
	
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
		
		if ((elem !== null) && (elem !== undefined)) {
			
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
		
	}
	
	//--------------------------------------------------------------------
	
	/**
	 * Get the current context.
	 *
	 * @return { string } The currently defined media query.
	 */
	
	function _pickContext() {
		
		// Returns the first value that is "truth-like", or the last value, if no values are "truth-like":
		var context = _contentAfter(document.body) || _fontFamily(document.documentElement);
		
		// Android browsers place a "," after an item in the font family list; most browsers either single or double quote the string:
		return context.replace(/['",]/g, '');
		
	}
	
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
			
			if (haystack[i] == needle) {
				
				return true;
				
			}
			
		}
		
		return false;
		
	}
	
	//--------------------------------------------------------------------
	
	/**
	 * Get the font-family style value of the passed element's style.
	 *
	 * @param elem { object } The Element that is the root element of the document (for example, the <html> element for HTML documents).
	 * @return { string } Value or empty string.
	 */
	
	function _fontFamily(elem) {
		
		if ((elem !== null) && (elem !== undefined)) {
			
			// return (IE browser?) ? (Return IE fontFamily) : ((W3C browser?) ? (Return W3C font-family) : Return empty string);
			return (elem.currentStyle) ? elem.currentStyle['fontFamily'] : ((window.getComputedStyle) ? window.getComputedStyle(el).getPropertyValue('font-family') : '');
			
		}
		
	}
	
	//--------------------------------------------------------------------
	
	/**
	 * Get the :after content value of from the passed element's style.
	 *
	 * @param elem { object } The <body> or <frameset> node of the current document.
	 * @return { string } Value or empty string.
	 */
	
	function _contentAfter(elem) {
		
		if ((elem !== null) && (elem !== undefined)) {
			
			return (window.getComputedStyle) ? window.getComputedStyle(elem, ':after').getPropertyValue('content') : ''; // getPropertyValue() Returns an empty string in Firefox and Opera and null in Google Chrome and Safari.
			
		}
		
	}
	
	//--------------------------------------------------------------------
	
	return omq; // Expose the API.
	
}(window.oMQ = window.oMQ || {})); // Use existing namespace or make a new object of that namespace.