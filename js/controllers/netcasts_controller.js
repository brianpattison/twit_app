Twit.netcastsController = SC.ArrayProxy.create({
	content: [],
	current: null,
	
	show: function(netcastButton) {
		var netcast = netcastButton.get('parentView').get('content');
		Twit.netcastsController.set('current', netcast);
		BP.tabWindowsController.open({
			title: netcast.get('title'),
			view: Twit.netcastView
		});
		
		$.get(netcast.get('feedUrl'), function(xml) {
			var episodes = [];
			$(xml).find('item').each(function() {
				var $this = $(this);
				var episode = Twit.Episode.create({
					removeTitle: netcast.get('removeTitle'),
					title: $this.find('title').text(),
					description: $this.find('description').text(),
					mp3Url: $this.find('enclosure').attr('url')
				})
				episodes.push(episode);
			});
			netcast.set('episodes', episodes);
			BP.tabWindowsController.refreshScrollers();
		});
	}
});

Twit.netcastsController.set('content', [
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/9017/feed',
		title: 'All About Android'
	}),
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/7174/feed',
		title: "Dr. Kiki's Science Hour"
	}),
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/4350/feed',
		title: 'FLOSS Weekly'
	}),
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/8176/feed',
		title: 'FourCast'
	}),
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/8447/feed',
		title: 'Frame Rate'
	}),
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/4352/feed',
		title: 'Futures in Biotech'
	}),
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/9250/feed',
		title: 'Ham Nation'
	}),
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/7282/feed',
		title: 'Home Theater Geeks'
	}),
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/7952/feed',
		title: 'iPad Today'
	}),
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/4445/feed',
		title: 'MacBreak Weekly'
	}),
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/7240/feed',
		title: 'NSFW'
	}),
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/4347/feed',
		title: 'Security Now'
	}),
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/7790/feed',
		title: 'Tech News Today'
	}),
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/9019/feed',
		title: 'The Social Hour'
	}),
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/4354/feed',
		shortTitle: 'Leo Laporte - The Tech Guy',
		title: 'The Tech Guy'
	}),
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/7272/feed',
		title: 'This Week in Computer Hardware'
	}),
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/6902/feed',
		title: 'This Week in Google'
	}),
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/4605/feed',
		shortTitle: 'TWiL',
		title: 'This Week in Law'
	}),
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/4346/feed',
		shortTitle: 'TWiT',
		title: 'This Week in Tech'
	}),
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/8741/feed',
		title: 'Triangulation'
	}),
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/7299/feed',
		title: 'TWiT Live Specials'
	}),
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/8996/feed',
		title: 'TWiT Photo'
	}),
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/4349/feed',
		title: 'Weekly Daily Giz Wiz'
	}),
	Twit.Netcast.create({
		feedUrl: 'http://www.twit.tv/node/4544/feed',
		title: 'Windows Weekly'
	})
]);