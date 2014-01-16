/******************************************************
 * @author: Mr. Pi <mrpi@mr-pi.de>
 * @copyright: 2014 Mr. Pi
 *-----------------------------------------------------
 * signaling functions
 ******************************************************/

Signaling = function(optionsIn) {
/******************************************************
 * variable initialization
 */
	var config = {};
	var connection;
	var options = {};

	return {
		init: function(userOptions) {
			var emptyFun = function(){};

			options = userOptions || {};
			options.stun = options.stun || "stun2.l.google.com:19302";

			config = {'iceServers': [{'url': 'stun:'+options.stun}]};
			connection = new RTCPeerConnection(config);

			connection.onicecandidate = options.onCandidate = options.onCandidate || emptyFun;
			connection.onaddstream = options.onAddStream = options.onAddStream || emptyFun;
			connection.ondatachannel = options.onDataChannel = options.onDataChannel || emptyFun;
			connection.oniceconnectionstatechange = options.onConnectionStateChange = options.onConnectionStateChange || emptyFun;
			connection.onnegotiationneeded = options.onNegotiationNeeded = options.onNegotiationNeeded || emptyFun;
			connection.onremovestream = options.onRemoveStream = options.onRemoveStream || emptyFun;
			connection.onsignalingstatechange = options.onSignalingStateChange = options.onSignalingStateChange || emptyFun;
		},
		getConfig: function() {
			return config;
		},
		getStun: function() {
			return options.stun;
		}
	};
};
