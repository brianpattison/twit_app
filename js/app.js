// Create the TWiT SproutCore Application
Twit = SC.Application.create();

// Create the TWiT Live Tab
Twit.twitLiveView = SC.View.extend({
	templateName: 'twit_live'
});
Twit.twitLiveTab = BP.Tab.create({
	icon: 'twit',
	label: 'TWiT Live',
	rootWindowOptions: {
		title: 'TWiT Live',
		view: Twit.twitLiveView
	}
});

// Create the Netcasts Tab
Twit.netcastsView = SC.View.extend({
	templateName: 'netcasts'
});

Twit.netcastsTab = BP.Tab.create({
	icon: 'tv',
	label: 'Netcasts',
	rootWindowOptions: {
		title: 'Netcasts',
		view: Twit.netcastsView
	}
});

// Add the tabs to the tabs controller we're done here
BP.tabsController.set('content', [Twit.twitLiveTab, Twit.netcastsTab]);

// Disable default scrolling for mobile devices
document.addEventListener('touchmove', function(evt) { evt.preventDefault(); }, NO);