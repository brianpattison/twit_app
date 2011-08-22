BP.tabsController = SC.ArrayProxy.create({
	content: [],
	
	activeTab: function() {
		return this.filterProperty('isActive', YES).objectAt(0);
	}.property('@each.isActive'),
	
	contentDidChange: function() {
		// Select the first tab if none are set as active
		var tabs = this.get('content');
		if (tabs.length > 0)
			if (!this.get('activeTab')) 
				this.selectTab(this.objectAt(0));
	}.observes('content'),
	
	selectTab: function(tabButton) {
		var oldTab = BP.tabsController.get('activeTab');
		var newTab = (tabButton.get('constructor') == 'BP.Tab' ? tabButton : tabButton.get('parentView').get('content'));
		if (oldTab == newTab)
		{
			// Go back to root window
			BP.tabWindowsController.close();
		}
		else
		{
			// Set the new tab as active and open the tab's current window
			if (oldTab) oldTab.set('isActive', NO);
			newTab.set('isActive', YES);
			var options = newTab.get('currentWindowOptions');
			options.openTab = YES;
			BP.tabWindowsController.open(options);
		}
	},
	
	tabWidthClass: function() {
		return 'tabs_' + this.get('content').length;
	}.property('content')
});