BP.TabWindow = SC.Object.extend({
	backText: null,
	previous: NO,
	next: NO,
	rightButtonView: null,
	scroller: null,
	scrollerId: null,
	title: null,
	view: null,
	
	contentClass: function() {
		var contentClass = 'content';
		if (this.get('previous')) contentClass += ' previous';
		if (this.get('next')) contentClass += ' next';
		return contentClass;
	}.property('previous', 'next'),
	
	headerClass: function() {
		var headerText = this.get('title');
		var backText = this.get('backText');
		var hasRightButton = this.get('rightButtonView');
		
		var headerClass = 'header ';
		if (backText && hasRightButton)
		{
			headerClass += 'has_two_buttons ';
		}
		else if (backText)
		{
			if (backText.length > 6)
			{
				headerClass += 'has_long_back_button ';
			}
			else
			{
				headerClass += 'has_short_back_button ';
			}
		}
		else if (hasRightButton)
		{
			headerClass += 'has_right_button ';
		}
		if (headerText && headerText.length > 12)
		{
			headerClass += 'has_long_header';
		}
		else
		{
			headerClass += 'has_short_header';
		}
		if (this.get('previous')) headerClass += ' previous';
		if (this.get('next')) headerClass += ' next';
		return headerClass;
	}.property('previous', 'next')
});