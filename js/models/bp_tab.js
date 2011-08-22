BP.Tab = SC.Object.extend({
	isActive: NO,
	icon: null,
	label: null,
	rootWindowOptions: {},
	windowOptions: null,
	
	cssClass: function() {
		return this.get('isActive') ? 'active' : null;
	}.property('isActive'),
	
	currentWindowOptions: function() {
		var windowOptions = this.get('windowOptions');
		if (windowOptions) return windowOptions;
		else return this.get('rootWindowOptions');
	}.property('rootWindowOptions', 'windowOptions')
});