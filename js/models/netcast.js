Twit.Netcast = SC.Object.extend({
	episodes: [],
	feedUrl: null,
	shortTitle: null,
	title: null,
	
	removeTitle: function() {
		var shortTitle = this.get('shortTitle');
		var title = this.get('title');
		if (shortTitle) return shortTitle;
		else return title;
	}.property('shortTitle', 'title'),
	
	icon: function() {
		var icon = this.get('title').toLowerCase().replace(/\s/g, "_").replace(/\'/g, "").replace(/\./g, "");
		return 'images/show_icons/' + icon + '.jpg';
	}.property('title')
});