Twit.Netcast = SC.Object.extend({
	episodes: [],
	feed: null,
	shortTitle: null,
	title: null,
	
	feedUrl: function() {
		if (window.location.host == '')
			return this.get('feed');
		else
			return this.get('feed').replace('http://', '/_strobe/proxy/');
	}.property('feed'),
	
	icon: function() {
		var icon = this.get('title').toLowerCase().replace(/\s/g, "_").replace(/\'/g, "").replace(/\./g, "");
		return 'images/show_icons/' + icon + '.jpg';
	}.property('title'),
	
	removeTitle: function() {
		var shortTitle = this.get('shortTitle');
		var title = this.get('title');
		if (shortTitle) return shortTitle;
		else return title;
	}.property('shortTitle', 'title')
});