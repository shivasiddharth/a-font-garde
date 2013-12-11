;(function( w ) {

	var doc = w.document,
		ref,
		css = ['.supports-fontface.supports-generatedcontent.%s .icon-fallback-text .icon { display: inline-block; }',
			'.supports-fontface.supports-generatedcontent.%s .icon-fallback-text label { clip: rect(0 0 0 0); overflow: hidden; position: absolute; height: 1px; width: 1px; }',
			'.supports-fontface.%s .icon-fallback-glyph .icon:before { font-size: inherit; line-height: inherit; }'];

	function addEvent( type, callback ) {
		if( 'addEventListener' in w ) {
			return w.addEventListener( type, callback, false );
		} else if( 'attachEvent' in w ) {
			return w.attachEvent( 'on' + type, callback );
		}
	}

	AFontGarde = function( fontFamily, sampleGlyphs ) {
		var executed = false;
		function init() {
			if( executed ) {
				return;
			}
			executed = true;

			if( typeof FontFaceOnload === 'undefined' ) {
				throw 'FontFaceOnload is a prerequisite.';
			}

			if( !ref ) {
				ref = doc.getElementsByTagName( 'script' )[ 0 ];
			}
			var style = doc.createElement( 'style' );
			style.innerHTML = css.join( '\n' ).replace( /\%s/gi, fontFamily );
			ref.parentNode.insertBefore( style, ref );

			FontFaceOnload( fontFamily, {
				// These characters are a few of the glyphs from the font above */
				glyphs: sampleGlyphs || '',
				timeout: 5000,
				success: function() {
					// If you’re using more than one icon font, change this classname (and in a-font-garde.css)
					doc.documentElement.className += ' ' + fontFamily;
				}
			});
		}

		// MIT credit: filamentgroup/shoestring
		addEvent( "DOMContentLoaded", init );
		addEvent( "readystatechange", init );
		addEvent( "load", init );

		if( doc.readyState === "complete" ){
			init();
		}
	};

})( this );