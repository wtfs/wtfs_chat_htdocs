/******************************************************
 * @author: Mr. Pi <mrpi@mr-pi.de>
 * @copyright: 2014 Mr. Pi
 *-----------------------------------------------------
 * the webrtc media stuff
 ******************************************************/

var lw = (function() {
	var capture;
	var signaling;
	var resize = function() {
		console.debug('resize');
		var videos = document.getElementsByTagName('video');
		var width = (document.getElementById('videos').offsetWidth-30)/videos.length;
		var height = (window.window.innerHeight/100*40);
		var maxHeight = 0;
		for(var i=0; i<videos.length; i++) {
			videos[i].removeAttribute("height");
			videos[i].width=width;
			maxHeight = (videos[i].offsetHeight>maxHeight)?videos[i].offsetHeight:maxHeight;
		}
		if(videos.length > 0 && maxHeight > height) {
			for(i=0; i<videos.length; i++) { videos[i].removeAttribute("width"); videos[i].height=height; }
		}
	};
	var addVideo = function(source, name) {
		console.debug("add video "+name);
		if(document.getElementById('vidCon_'+name) !== null) {
			document.getElementById('video_'+name).src = source;
		}
		else {
			var old = document.getElementById('videos').innerHTML;
			document.getElementById('videos').innerHTML = old +
				'<div class="vidCon" id="vidCon_'+name+'">'+
				'<span class="vidTitle">'+name+'</span>'+
				'<video muted autoplay poster="./img/nopic.png" id="video_'+name+'" src="'+source+'"></video>'+
				'</div>';
		}
		resize();
	};
	var removeVideo = function(name) {
		console.debug("remove video "+name);
		if(document.getElementById('vidCon_'+name)!==null) {
			document.getElementById('vidCon_'+name).remove();
		}
		resize();
	};
	var prepare_lw = function() {
		capture = new Media({
			onChanged: function(options) {
				console.info("change media source");
				type=(options.video!==true)?"video":"screen";
				document.getElementById('btn_broadcast'+type).innerHTML = "broadcast "+type;
				document.getElementById('btn_broadcast'+type).setAttribute('onclick', 'lw.start_streaming("'+type+'")');
			},
			onEnded: function(options) {
				type=(options.video===true)?"video":"screen";
				console.info("end capture "+type);
				document.getElementById('btn_broadcast'+type).innerHTML = "broadcast "+type;
				document.getElementById('btn_broadcast'+type).setAttribute('onclick', 'lw.start_streaming("'+type+'")');
				removeVideo("self");
			},
			onError: function(error) {
				console.error("webrtc error: "+error);
				alert("ERROR: " + error);
				removeVideo("self");
			},
			onSupported: function() {
				console.info("webrtc is supported");
			},
			onNotSupported: function() {
				console.error("webrtc is not supported");
			}
		});
	};
	return {
		addvid: function(src, name) {
			addVideo(src, name);
		},
		init: function() {
			browser.init();
			prepare_lw();
			resize();
			window.onresize = resize;
		},
		stop_streaming: function(mediaType) {
			capture.stop();
			removeVideo("self");
			document.getElementById('btn_broadcast'+mediaType).innerHTML = "broadcast "+mediaType;
			document.getElementById('btn_broadcast'+mediaType).setAttribute('onclick', 'lw.start_streaming("'+mediaType+'")');
		},
		start_streaming: function(mediaType) {
			console.debug('start streaming '+mediaType);
			capture.start({
				handleStream: function(stream, src) {
					console.info("start capture "+mediaType);
					document.getElementById('btn_broadcast'+mediaType).innerHTML = "stop streaming "+mediaType;
					document.getElementById('btn_broadcast'+mediaType).setAttribute('onclick', 'lw.stop_streaming("'+mediaType+'")');
					addVideo(src, "self");
				},
				video: mediaType=="video",
				audio: false,
				screen: mediaType=="screen"
			});
		},
		setCounter: function(timeRemaining,percent) {
			document.getElementById("counter").childNodes[1].style.width = percent+"%";
			document.getElementById("counter").childNodes[5].childNodes[0].innerHTML = percent+"% ("+timeRemaining+"min left)";
		}
	};
})();
