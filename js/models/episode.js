Twit.Episode = SC.Object.extend({
	description: null,
	mp3Url: null,
	removeTitle: null,
	title: null,
	
	displayTitle: function() {
		var regEx = new RegExp(this.get('removeTitle'), 'i');
		return this.get('title').replace(regEx, '');
	}.property('removeTitle', 'title')
});