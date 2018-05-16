function initializeAutocomplete(json) {

  // TEMP: Populate autocomplete results with building list from JSON
  var list = document.getElementById("searchComplete");
  var items = [];
  for (var i = 0; i < json.data.length; i++) {
    items.push(json.data[i].attributes.name);
  }

  // Instantiate autocomplete with awesomeplete
  var input = document.getElementById("search");
  new Awesomplete(input, {
    list: items,
    minChars: 1,
    maxItems: 15,
    autoFirst: true
  });
}



/*********************
 * Callback Functions*
 *********************/

/*******************
 * Event Listeners *
 *******************/
