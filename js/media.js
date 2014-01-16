/******************************************************
 * @author: Mr. Pi <mrpi@mr-pi.de>
 * @copyright: 2014 Mr. Pi
 *-----------------------------------------------------
 * the webrtc media stuff
 ******************************************************/

Media = function(optionsIn) {
/******************************************************
 * variable initialization
 */
	/** @private */	var data = {stream: {}, src: undefined, video: false, audio: false};
	/** @private */ var options = optionsIn || {};

	/** @private */ var emptyFun = function(){}; //dummy function

/******************************************************
 * set defaults if not specified
 */
	options.video = options.video || false;
	options.audio = options.audio || false;
	options.screen = options.screen || false;
	options.onChanged = options.onChanged || emptyFun;
	options.onError = options.onError || emptyFun;
	options.onSupported = options.onSupported || emptyFun;
	options.onNotSupported = options.onNotSupported || emptyFun;
	options.onEnded = options.onEnded || emptyFun;
	options.handleStream = options.handleStream || emptyFun;

/******************************************************
 * initialization function calls
 */
	if(navigator.getUserMedia) {options.onSupported();}
	else {options.onNotSupported();}

/******************************************************
 * prototype functions
 */
	this.start = function(mediaIn) {
		var media = mediaIn || {}; //get new media sources
		
		options.video = (media.video!==undefined)?media.video:options.video;
		options.audio = (media.audio!==undefined)?media.audio:options.audio;
		options.screen = (media.audio===true || media.video===true)?false:options.screen;
		options.screen = (media.screen!==undefined)?media.screen:options.screen;
		options.onChanged = media.onChanged || options.onChanged;
		options.onError = media.onError || options.onError;
		options.onSupported = media.onSupported || options.onSupported;
		options.onNotSupported = media.onNotSupported || options.onNotSupported;
		options.onEnded = media.onEnded || options.onEnded;
		options.handleStream = media.handleStream || options.handleStream;

		data.video = options.video;
		data.audio = options.audio;
		if(options.screen) {
			options.video = false;
			options.audio = false;
			data.video = { mandatory: {chromeMediaSource: 'screen'} };
			data.audio = false;
		}

		if(data.stream.ended === false) {
			data.stream.onended = function() {
				options.onChanged(options);
			};
			data.stream.stop(); //stop stream if running
		}

		if(navigator.getUserMedia) {
			navigator.getUserMedia({
				video: data.video,
				audio: data.audio
			}, function(stream) {
				data.stream = stream;
				data.stream.onended = function() {options.onEnded(options);};
				data.src = (window.URL && window.URL.createObjectURL(stream)) || stream; //generate media source url(blob), take stream object for old firefox browsers
				options.handleStream(stream, data.src);
			}, options.onError);
			return true;
		} else { return false; }
	};

	this.isAlive = function() {
		return (data.stream.ended===false)?true:false;
	};
	this.stop = function() {
		return data.stream.stop();
	};
	this.getStream = function() {
		return data.stream;
	};
	this.getSource = function() {
		return data.src;
	};
	this.getOptions = function() {
		return options;
	};
};
Media.test = function() {
	if(navigator.getUserMedia) { return true; } else { return false; }
};

