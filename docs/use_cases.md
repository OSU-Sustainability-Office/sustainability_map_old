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
 3. A asynchronous request is sent to the shared sustainability node server (SSNS).
 4. The SSNS processes the request, and searches the database for relevant geographic points.
 5. The database returns a list of JSON location objects (these contain only location name, geographic location, and references to other relevant documents).
 6. This list is used to populate the suggested search results (if a query is being entered), or these points are placed on the map using Leaflet API.
 7. The user hovers over a point on the map with their mouse.
 8. An event trigger is activated and a tooltip is displayed, containing downloaded data for that specific point.

Alternate Flows:
 - If no items are found, a message is displayed in the suggested search box indicating that the query matched no documents.
 - If the user doesn't find the desired data point immediately, the user can hover over other data points.
 - If the user wishes to cancel their search, they can delete all characters in the search bar. Currently displayed locations will remain on screen until all characters are deleted.

## 2. Viewing Information About a Building
Actors:
- User
- Node Server (SSNS)
- Database
- Leaflet API

Triggers:
- The user hovers their mouse over a point on the map, triggering an event listener.

Preconditions:
- The user has entered a search query.
- The query has returned at least one result.

Post-conditions:
- The user will have access to detailed information "beneath" a point.

Normal Flow:
1. The user activates one of the triggers, above.
2. The local object pertaining to that point is accessed, and asynchronous request(s) are sent to the database for more detailed information about relevant points. A callback function is specified.
3. The tooltip is displayed with a loading animation.
4. The SSNS requests for data from the database.
5. The database returns a document for each reference supplied by the SSNS.
6. The SSNS sends a response consisting of a javascript file with a call to the specified callback function. The document's data is passed into the function as parameters.
7. The asynchronous function call populates the tooltip as responses are received.


Alternate Flows:
- If an error occurs, an error message is displayed in the tooltip. An error request is sent to the database for logging purposes.
