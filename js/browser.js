/******************************************************
 * author: Mr. Pi <mrpi@mr-pi.de>
 * copyright: 2013 Mr. Pi
 *-----------------------------------------------------
 * browser specific stuff
 ******************************************************/

var browser_specific_stuff = function() {
	if(window.chrome !== undefined) {
		var chrome_only = document.getElementsByClassName("chrome_only");
		for(var i=0; i<chrome_only.length; i++) {
			chrome_only[i].style.display = "initial";
		}
	} else {
	}
}
