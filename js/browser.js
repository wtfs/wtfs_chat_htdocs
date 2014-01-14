/******************************************************
 * author: Mr. Pi <mrpi@mr-pi.de>
 * copyright: 2013 Mr. Pi
 *-----------------------------------------------------
 * browser specific stuff
 ******************************************************/

var browser = (function() {
	function setClassHidded(className) {
		var elements = document.getElementsByClassName("chrome_only");
		for(var i=0; i<elements.length; i++) {
			elements[i].style.display = "none";
		}
	}

	function setBrowserPrototypes() {
		window.RTCPeerConnection =
			window.RTCPeerConnection ||
			window.webkitRTCPeerConnection ||
			window.mozRTCPeerConnection ||
			window.oRTCPeerConnection || //TODO: testing
			window.msRTCPeerConnection; //TODO: testing

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
	}

	return {
		init: function() {
			if(window.chrome === undefined) {
				setClassHidded('chrome_only');
			}
			if(window.location.protocol !== "https:") {
				setClassHidded('https_only');
			}
			setBrowserPrototypes();
		}
	};
})();

