# Use Cases
These use cases were drafted by Jack on 04/30/2018. They are listed below in no particular order.

## 1. Search for Location
Actors:
 - User
 - Node Server (SSNS)
 - Database
 - Leaflet API

Triggers:
 - The user presses the search button
 - The user requests a page, using URL GET parameters
 - The user begins to type a query (at least 3 characters)

Preconditions:
 - The user has entered a search query.

Post-conditions:
 - A list of possible locations will appear

Normal Flow:
 1. The user activates one of the triggers, above.
 2. Locally stored/cached data is searched (eliminating HTTP requests for duplicate data).
 3. A request is sent to the shared sustainability node server (SSNS).
 4. The SSNS processes the request, and searches the database for relevant geographic points.
 5. The database returns a list of JSON location objects (these contain only location name, geographic location, and references to other relevant documents).
 6. This list is used to populate the suggested search results (if a query is being entered), or these points are placed on the map.
 7. The user hovers over a point on the map with their mouse.
 8. An event trigger is activated and a tooltip is displayed, containing the downloaded data for that specific point.

Alternate Flows:
 - If no items are found, a message is displayed in the suggested search box.
 - If the user doesn't find the desired data point immediately, the user can hover over other data points.
 - If the user wishes to cancel their search, they can delete all characters in the search bar. Currently displayed locations will remain on screen until all characters are deleted.
