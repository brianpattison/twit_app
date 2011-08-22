BP.Button = SC.Button.extend({
	tagName: 'span',
	classNames: ['bp_button'],
	touchStartX: null,
	touchStartY: null,
	
	touchStart: function(touch) {
		this.set('touchStartX', touch.pageX);
		this.set('touchStartY', touch.pageY);
		this.mouseDown(touch);
	},
	
	// Don't press the button if the user moves off it
	touchMove: function(e) {
		var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		var startX = this.get('touchStartX');
		var startY = this.get('touchStartY');
		var endX = touch.pageX;
		var endY = touch.pageY;
		if (Math.abs(startX - endX) > 100 || Math.abs(startY - endY) > 50)
		{
			this.set('isActive', NO);
		}
		return YES;
	},

	touchEnd: function(touch) {
		this.mouseUp(touch);
	}
});