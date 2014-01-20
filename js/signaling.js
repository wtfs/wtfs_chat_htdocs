/******************************************************
 * @author: Mr. Pi <mrpi@mr-pi.de>
 * @copyright: 2014 Mr. Pi
 *-----------------------------------------------------
 * signaling functions
 ******************************************************/

Signaling = function(userOptions) {
/******************************************************
 * variable initialization
 */
	var config = {};
	var connection;
	var options = {};

	var emptyFun = function(){};
	var localDescriptionCreated = function(description) {
		console.log('localDescriptionCreated');
		connection.setLocalDescription(description, function() {
			console.log("localDescriptionCreated\n\tdescription:\n\t"+JSON.stringify({
				'localDescription': connection.localDescription
			}));
		},emptyFun); //TODO: set real function
	};

/******************************************************
 * set defaults if not specified
 */
	options = userOptions || {};
	options.stun = options.stun || "stun2.l.google.com:19302";

	config = {'iceServers': [{'url': 'stun:'+options.stun}]};
	connection = new RTCPeerConnection(config);

/*	connection.onicecandidate = options.onCandidate = options.onCandidate || emptyFun;
	connection.onaddstream = options.onAddStream = options.onAddStream || emptyFun;
	connection.ondatachannel = options.onDataChannel = options.onDataChannel || emptyFun;
	connection.oniceconnectionstatechange = options.onConnectionStateChange = options.onConnectionStateChange || emptyFun;
	connection.onnegotiationneeded = options.onNegotiationNeeded = options.onNegotiationNeeded || emptyFun;
	connection.onremovestream = options.onRemoveStream = options.onRemoveStream || emptyFun;
	connection.onsignalingstatechange = options.onSignalingStateChange = options.onSignalingStateChange || emptyFun;
*/

	connection.onicecandidate = function(evt) {
		console.log('connection.onicecandidate');
		if(evt.candidate) {
			console.log("connection.onicecandidate\n\tit's a candidate:\n\t"+JSON.stringify({
				'candidate': evt.candidate
			}));
		}
	};

	connection.onnegotiationneeded = function() {
		console.log('connection.onnegotiationneeded');
		connection.createOffer(localDescriptionCreated, emptyFun);
	};

	connection.onaddstream = function(evt) {
		alert('new stream');
	};

	connection.onremovestream = function(evt) {
		alert(evt);
	};

/******************************************************
 * prototype functions
 */
	this.getConfig = function() {
		return config;
	};
	this.getStun = function() {
		return options.stun;
	};
	this.addStream = function(stream) {
		return connection.addStream(stream);
	};
	this.getConnection = function() {
		return connection;
	};
};
