/******************************************************
 * author: Mr. Pi <mrpi@mr-pi.de>
 * copyright: 2014 Mr. Pi
 *-----------------------------------------------------
 * the webrtc media stuff
 ******************************************************/

var media = (function() {
	var options;
	var data = {stream: {}, src: undefined};
	
	function mediaInit() {
		if(navigator.getUserMedia) { //get user media
			options.onSupported();

			navigator.getUserMedia({
				video: data.video,
				audio: data.audio
			}, function(stream) {
				data.stream = stream;
				data.stream.onended = options.onEnded;
				data.src = (window.URL && //generate media source url(blob)
				            window.URL.createObjectURL(stream)) ||
				            stream;

				options.handleStream(stream, data.src);
			}, options.onError);
		} else {
			options.onNotSupported();
		}
	}


	return {
		test: function() {
			if(navigator.getUserMedia) { return true; } else { return false; }
		},
		init: function(userOptions) {
			if(data.stream.ended == false) { data.stream.stop(); } //stop old stream, if running
			var emptyFun = function(){};

			//get arguments or uses defaults
			options = userOptions || {};

			data.video = options.video || false;
			data.audio = options.audio || false;
			if(options.screen) { //screensharing needs a special chrome video source and audio disabled
				data.video = { mandatory: {chromeMediaSource: 'screen'} };
				data.audio = false;
			}

			options.onError = options.onError || emptyFun;
			options.onSupported = options.onSupported || emptyFun;
			options.onNotSupported = options.onNotSupported || emptyFun;
			options.onEnded = options.onEnded || emptyFun;

			options.handleStream = options.handleStream || emptyFun;

			//do the real stuff
			mediaInit();
		},
		getOptions: function() {
			return options;
		},
		getStream: function() {
			return data.stream;
		},
		getSource: function() {
			return data.src;
		},
		isAlive: function() {
			return (data.stream.ended==false)?true:false;
		},
		stop: function() {
			data.stream.stop();
		}
	};
})();

