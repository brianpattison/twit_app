BP.tabWindowsController = SC.ArrayProxy.create({
	content: [],
	
	activeWindow: function() {
		return this.filterProperty('previous', NO).filterProperty('next', NO).objectAt(0);
	}.property('@each.previous', '@each.next'),
	
	nextWindow: function() {
		return this.filterProperty('next', YES).objectAt(0);
	}.property('@each.next'),
	
	previousWindow: function() {
		return this.filterProperty('previous', YES).objectAt(0);
	}.property('@each.previous'),
	
	// Close the current window with a transition (Go back)
	close: function() {
		var activeWindow = this.get('activeWindow');
		var previousWindow = this.get('previousWindow');
		if (previousWindow) // Make sure there is a previous window
		{
			activeWindow.set('next', YES);
			previousWindow.set('previous', NO);
			// Set the current tab's window options back to the root window options for switching between tabs
			var activeTab = BP.tabsController.get('activeTab');
			activeTab.set('windowOptions', activeTab.get('rootWindowOptions'));
		}
	},
	
	// Open a new window with the tab
	open: function(options) {
		var activeWindow = this.get('activeWindow'),
			nextWindow = this.get('nextWindow'),
			openedWindow;
		// Switch out the contents if switching tabs
		if (options.openTab)
		{
			openedWindow = activeWindow;
		}
		// Perform the transition if opening within a tab
		else
		{
			options.backText = activeWindow.get('title');
			activeWindow.set('previous', YES);
			nextWindow.set('next', NO);
			openedWindow = nextWindow;
		}
		// Setup the new window
		openedWindow.set('backText', options.backText);
		openedWindow.set('onLoad', options.onLoad);
		openedWindow.set('title', options.title);
		openedWindow.set('view', options.view);
		
		// Set the current tab's window options to the new window for switching between tabs
		BP.tabsController.get('activeTab').set('windowOptions', options);
		
		// Perform any action assigned to opening this window
		if (openedWindow.onLoad) openedWindow.onLoad();
		
		// Refresh iScroll objects to reflect new window height
		BP.tabWindowsController.refreshScrollers();
	},
	
	// Refresh the scrollers to reflect new content length
	refreshScrollers: function() {
		setTimeout(function() {
			BP.tabWindowsController.get('content').forEach(function(item, index, enumerable) {
				var scroller = item.get('scroller');
				if (scroller) scroller.refresh();
			});
		}, 0);
	},
	
	// Setup the iScroll 4 scrollers
	setupScrollers: function() {
		var setupComplete = YES;
		BP.tabWindowsController.get('content').forEach(function(item, index, enumerable) {
			var scrollEl = document.getElementById(item.get('scrollerId'));
			if (scrollEl) item.set('scroller', new iScroll(item.get('scrollerId'), { useTransition: YES }));
			else setupComplete = NO;
		});
		// Try again if the elements aren't ready
		if (!setupComplete) setTimeout(BP.tabWindowsController.setupScrollers, 100);
	}

});

BP.tabWindowsController.set('content', [
	BP.TabWindow.create({title: 'Active', scrollerId: 'scroller_1'}),
	BP.TabWindow.create({next: YES, title: 'Next', scrollerId: 'scroller_2'})
]);

BP.tabWindowsController.setupScrollers();