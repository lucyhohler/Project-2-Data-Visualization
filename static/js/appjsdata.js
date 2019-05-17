// data from data.js
var tableData = data;

// Check to make sure KC Crime data is accessible
//console.log(tableData)

 // locate table tbody
var tbody = d3.select("tbody");

// script to populate table with KC Crime data
 tableData.forEach((crime) => {
  var row = tbody.append("tr");
  Object.entries(crime).forEach(([key, value]) => {
    var cell = row.append("td");
    cell.text(value);
  });
});