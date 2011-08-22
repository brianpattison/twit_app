Twit.mediaController = SC.Object.create({
	playMp3Audio: function(playButton) {
		var liveAudioEl = $('#live_audio'),
			liveAudio = liveAudioEl.get(0);
		var liveVideoEl = $('#live_video'),
			liveVideo = liveVideoEl.get(0);
		var mp3AudioEl = $('#mp3_audio'),
			mp3Audio = mp3AudioEl.get(0);
			
		mp3Audio.pause();
		liveAudio.pause();
		liveVideo.pause();
		
		var mp3Url = playButton.get('parentView').get('content').get('mp3Url');
		mp3AudioEl.find('source').attr('src', mp3Url);
		mp3Audio.load();
		mp3Audio.play();
	},
	
	playLiveAudio: function() {
		var liveAudioEl = $('#live_audio'),
			liveAudio = liveAudioEl.get(0);
		var liveVideoEl = $('#live_video'),
			liveVideo = liveVideoEl.get(0);
		var mp3AudioEl = $('#mp3_audio'),
			mp3Audio = mp3AudioEl.get(0);
			
		liveVideo.pause();
		mp3Audio.pause();
		
		if (liveAudio.paused) liveAudio.play();
		else liveAudio.pause();
	},
	
	playLiveVideo: function() {
		var liveAudioEl = $('#live_audio'),
			liveAudio = liveAudioEl.get(0);
		var liveVideoEl = $('#live_video'),
			liveVideo = liveVideoEl.get(0);
		var mp3AudioEl = $('#mp3_audio'),
			mp3Audio = mp3AudioEl.get(0);
			
		liveAudio.pause();
		mp3Audio.pause();
		
		if (liveVideo.paused) 
		{
			liveVideoEl.addClass('playing');
			liveVideo.play();
		}
		else 
		{
			liveVideoEl.removeClass('playing');
			liveVideo.pause();
		}
	}
});