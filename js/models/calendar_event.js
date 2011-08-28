Twit.CalendarEvent = SC.Object.extend({
	date: null,
	title: null,
	
	formattedStartTime: function() {
		var d = this.get('date');
		var hour = d.getHours();
		var amPm = 'AM';
		var minutes = d.getMinutes() + '';
		if (hour > 12)
		{
			hour = hour - 12;
			amPm = 'PM';
		}
		else if (hour == 12)
		{
			amPM = 'PM';
		}
		else if (hour == 0)
		{
			hour = 12;
		}
		if (minutes.length < 2) minutes = '0' + minutes;
		return hour + ':' + minutes + ' ' + amPm;
	}.property('date'),
	
	startTime: function() {
		return this.get('date').getTime();
	}.property('date')
});