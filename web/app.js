// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.

    // 4b. Save the value that was changed as a variable.
    //let value = d3.select.property("value");

    // 4c. Save the id of the filter that was changed as a variable.
    //let id = d3.select.property("id");

    let date = d3.select("#datetime").property("value");
    let city = d3.select("#city").property("value");
    let state = d3.select("#state").property("value");
    let country = d3.select("#country").property("value");
    let shape = d3.select("#shape").property("value");

    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (date != "") {
      filters.datetime = date
    }
    if (city != "") {
      filters.city = city
    }
  
    if (state != "") {
      filters.state = state
    }
  
    if (country != "") {
      filters.country = country
    }
  
    if (shape != "") {
      filters.shape = shape
    }
  
  
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    var filterData = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    Object.entries(filters).forEach(function(filter){
      var filterLabel = filter[0]
      var filterValue = filter[1]
      filterData = filterData.filter(dataItem => {
        if (dataItem[filterLabel] == filterValue)
        return true
        else return false
      });
    });
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filterData);
  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.select("#datetime").on("keypress", function(){
    updateFilters()
  })
  d3.select("#city").on("keypress", function(){
    updateFilters()
  })
  d3.select("#state").on("keypress", function(){
    updateFilters()
  })
  d3.select("#country").on("keypress", function(){
    updateFilters()
  })
  d3.select("#shape").on("keypress", function(){
    updateFilters()
  })
  
  // Build the table when the page loads
  buildTable(tableData);
