Twit.calendarEventsController = SC.ArrayProxy.create({
	content: [],
	googleLoaded: NO,
	loaded: NO,
	
	load: function() {
		if (Twit.calendarEventsController.get('googleLoaded') && !Twit.calendarEventsController.get('loaded'))
		{
			// Create the calendar service object
			var calendarService = new google.gdata.calendar.CalendarService('twitApp');

			// The default "private/full" feed is used to retrieve events from 
			// the primary private calendar with full projection 
			var feedUri = 'https://www.google.com/calendar/feeds/r8psn8mpajnfa2703k43l6o014%40group.calendar.google.com/public/full';

			// Create a CalendarEventQuery, and specify that this query is 
			// applied toward the "private/full" feed
			var query = new google.gdata.calendar.CalendarEventQuery(feedUri);

			// Get the schedule for today only
			var d = new Date();
			var startDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
			var endDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);

			// Create and set the minimum and maximum start time for the date query	
			var startMin = new google.gdata.DateTime(startDate);
			var startMax = new google.gdata.DateTime(endDate);
			query.setMinimumStartTime(startMin);
			query.setMaximumStartTime(startMax);

			// The callback that will be called when getEventsFeed() returns feed data
			var callback = function(root) {
				// Obtain the array of matched CalendarEventEntry
				var eventEntries = root.feed.getEntries();

				// If there is matches for the date query
				if (eventEntries.length > 0) 
				{
					var events = [];
					for (var i = 0; i < eventEntries.length; i++) {
						var event = eventEntries[i];
						var eventTitle = event.getTitle().getText();
						var eventDate;

						// Determine if the start date/time is available
						var timesLength = event.getTimes().length;
						if (timesLength > 0)
							eventDate = event.getTimes()[0].getStartTime().getDate();
						else
							eventDate = "No Date";

						// Create Twit.CalendarEvent object
						events.push(Twit.CalendarEvent.create({
							date: eventDate,
							title: eventTitle
						}));
				  	}
					// Load the events
					Twit.calendarEventsController.set('content', events);
					Twit.calendarEventsController.set('loaded', YES);
					BP.tabWindowsController.refreshScrollers();
				} 
				else 
				{
					// No match is found for the date query
					console.log('No events found in date range!');
				}
			}

			// Error handler to be invoked when getEventsFeed() produces an error
			var handleError = function(error) {
			  	console.log(error);
			}

			// Submit the request using the calendar service object. Notice the CalendarEventQuery 
			// object is passed in place of the feed URI
			calendarService.getEventsFeed(query, callback, handleError);			
		}
		else if (!Twit.calendarEventsController.get('googleLoaded') && !Twit.calendarEventsController.get('loaded'))
		{
			setTimeout(Twit.calendarEventsController.load, 1000);
		}
	},
	
	sorted: function() {
		return this.get('content').sort(function(a, b) {
			return a.get('startTime') - b.get('startTime');
		});
	}.property('content')
});