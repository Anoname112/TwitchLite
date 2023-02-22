function processParams (href) {
	var processed = [];
	href = href.split('?');
	href = href[href.length - 1];
	var params = href.split("&");
	for (var i = 0; i < params.length; i++) {
		var param = params[i].split('=');
		processed.push({
			name: param[0],
			value: param[1]
		});
	}
	return processed;
}

window.onload = function () {
	var success = false;
	var href = window.location.href;
	if (href.includes('?') && href.includes('=')) {
		var ch = null;
		var mode = null;
		var params = processParams(href);
		for (var i = 0; i < params.length; i++) {
			if (params[i].name == 'ch' && twitchIDRegex.test(params[i].value)) ch = params[i].value;
			if (params[i].name == 'mode') mode = params[i].value;
		}
		
		if (ch != null && mode != null) {
			// Create embed object that will render within the "twitch" element
			if (mode == 'player') {
				new Twitch.Player("twitch", {
					width: "100%",
					height: "100%",
					channel: ch,
					// layout: "video-with-chat",
					// Only needed if this page is going to be embedded on other websites
					// parent: ["embed.example.com", "othersite.example.com"],
					autoplay: true,
					muted: false
				});
				success = true;
			}
			else if (mode == 'embed') {
				new Twitch.Embed("twitch", {
					width: "100%",
					height: "100%",
					channel: ch,
					// layout: "video-with-chat",
					// Only needed if this page is going to be embedded on other websites
					// parent: ["embed.example.com", "othersite.example.com"],
					autoplay: true,
					muted: false
				});
				success = true;
			}
		}
	}
	
	// Failed to embed a channel
	if (!success) {
		document.getElementById('twitch').innerHTML = '<form class="myform" method="get">' +
				'<div class="myclass">' +
					'Twitch Channel ID: <input type="text" id="ch" name="ch"> ' +
					'<select id="mode" name="mode">' +
						'<option value="player">Player Only</option>' +
						'<option value="embed">Player & Chat</option>' +
					'</select> ' +
					'<input type="submit" value="Open">' +
				'</div>' +
			'</form>';
		document.getElementById('ch').focus();
	}
}