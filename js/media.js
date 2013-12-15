/******************************************************
 * author: Mr. Pi <mrpi@mr-pi.de>
 * copyright: 2013 Mr. Pi
 *-----------------------------------------------------
 * the webrtc media stuff
 ******************************************************/

var media = (function() {
	var options;
	var src;
	
	function mediaInit() {
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

		if(navigator.getUserMedia) { //get user media
			options.onSupported();

			navigator.getUserMedia({
				video: options.video,
				audio: options.audio
			}, function(stream) {
				src =	(window.URL && //generate media source url(blob)
					 window.URL.createObjectURL(stream)) ||
					 stream;
				
				options.handleStream(stream, src);
			}, options.onError);
		} else {
			options.onNotSupported();
		}
	}


	return {
		init: function(userOptions) {
			var emptyFun = function(){};

			//get arguments or uses defaults
			options = userOptions || {};

			options.video = options.video || false;
			options.audio = options.audio || false;
			if(options.screen) { //screensharing needs a special chrome video source and audio disabled
				options.video = { mandatory: {chromeMediaSource: 'screen'} };
				options.audio = false;
			}

			options.onError = options.onError || emptyFun;
			options.onSupported = options.onSupported || emptyFun;
			options.onNotSupported = options.onNotSupported || emptyFun;

			options.handleStream = options.handleStream || emptyFun;

			//do the real stuff
			mediaInit();
		},
		getOptions: function() {
			return options;
		}
	};
})();

