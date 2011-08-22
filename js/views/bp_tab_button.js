BP.TabButton = SC.Button.extend({
	target: 'BP.tabsController',
	action: 'selectTab',
	
	tabWidthClassBinding: "BP.tabsController.tabStyle",

	render: function(context) {
		var tab = this.get('parentView').get('content'),
			icon = tab.get('icon'),
			label = tab.get('label'),
			tabStyle = this.get('tabStyle');
		context.addClass(icon);
		context.push('<span>' + label + '</span>');
	},
	
	touchStart: function(touch) {
		this.mouseDown(touch);
		this.mouseUp(touch);
	}
	
});