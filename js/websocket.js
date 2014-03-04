/******************************************************
 * @author: Mr. Pi <mrpi@mr-pi.de>
 * @copyright: 2014 Mr. Pi
 *-----------------------------------------------------
 * websocket library
 ******************************************************/

WS = function(optionsIn) {
/******************************************************
 * variable initialization
 */
	/** @private */	var data = {socket: undefined};
	/** @private */ var options = optionsIn || {};

	/** @private */ var emptyFun = function(){}; //dummy function

/******************************************************
 * set defaults if not specified
 */
	options.url = options.url || "ws://echo.websocket.org";
	options.onSupported = options.onSupported || emptyFun;
	options.onNotSupported = options.onNotSupported || emptyFun;
	options.onError = options.onError || emptyFun;
	options.onOpen = options.onOpen || emptyFun;
	options.onClose = options.onClose || emptyFun;
	options.onMessage = options.onMessage || emptyFun;
	options.onChanged = options.onChanged || emptyFun;

/******************************************************
 * initialization function calls
 */
	if(window.WebSocket) {options.onSupported();}
	else {options.onNotSupported();}

	data.socket = new WebSocket(options.url);

	data.socket.onerror = options.onError;
	data.socket.onopen = options.onOpen;
	data.socket.onclose = options.onClose;
	data.socket.onmessage = options.onMessage;

/******************************************************
 * prototype functions
 */
	this.change = function(mediaIn) {
		var media = mediaIn || {}; //get new media sources
		
		options.url = (media.url!==undefined)?media.url:options.url;
		options.onChanged = media.onChanged || options.onChanged;
		options.onError = media.onError || options.onError;

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

	this.getOptions = function() {
		return options;
	};
	this.getURL = function() {
		return options.url;
	};
};
Media.test = function() {
	if(navigator.getUserMedia) { return true; } else { return false; }
};

