Task description:

Technologies:
1. TS for great typing support
2. Css modules: really fast compared to css in js
3. React 18, Router
4. No state management library for the purpose of the task

How to run the task:
1. yarn start - to start the dev server
2. Go to public --> run widget.html to see widget on the separate page rendered by iframe


Social Feed React App
Implement a widget, which renders N last social posts from the given JSON feed.

The widget should pull updates from the feed with the given interval and update the displayed list by removing old items and displaying the new ones, so the most recent N posts will be displayed.
Each post record should display:

1. Post date (formatted as DD/MM/YYYY HH:MM) in the user's timezone
2. Author name
3. Message body

The widget should accept the following configuration options:
1. Feed URL
2. Number of posts to display
3. Update interval

While implementing, think about loading and rendering performance, memory usage and leaks.
The following feed can be used as an example: http://api.massrelevance.com/MassRelDemo/kindle.json. It supports both CORS and JSONP. It also provides some Web API: http://dev.massrelevance.com/docs/api/v1.0/stream/#ref-params-standard


Bonus points for more advanced webpack/babel configurations, adding unit tests, atomic component design and or use of higher order components, and UI/UX best practices.
