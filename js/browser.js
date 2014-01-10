/******************************************************
 * author: Mr. Pi <mrpi@mr-pi.de>
 * copyright: 2013 Mr. Pi
 *-----------------------------------------------------
 * browser specific stuff
 ******************************************************/

var browser_type = function() {
	navigator.getUserMedia = //set correct user media prototype
		navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		navigator.oGetUserMedia || //TODO: function test
		navigator.msGetUserMedia;

	window.URL = //same for url, is needed for stream object
		window.URL ||
		window.webkitURL ||
		window.mozURL ||
		window.oURL || //TODO: function test
		window.msURL;

	if(window.chrome !== undefined) {
		var chrome_only = document.getElementsByClassName("chrome_only");
		for(var i=0; i<chrome_only.length; i++) {
			chrome_only[i].style.display = "initial";
		}
	} else {
	}
}
