// @TODO: YOUR CODE HERE!
// set svg and chart dimensions
var svgWidth = 920;
var svgHeight = 620;

// set margin
var margin = {
  top: 20,
  right: 40,
  bottom: 200,
  left: 100
};

// calculate chart height and width
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//append a div classed chart to the scatter element
var chart = d3.select("#plot")
  .append("div")
  .classed("chart", true);

//append an svg element to the chart with appropriate height and width
var svg = chart.append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//initial Parameters
var chosenXAxis = "male";
var chosenYAxis = "non_agg_assault ";

//function used for updating x-scale var upon clicking on axis label
function xScale(crimesData, chosenXAxis) {
  //create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(crimesData, d => d[chosenXAxis]) * 0.9,
    d3.max(crimesData, d => d[chosenXAxis]) * 1.4])
    .range([0, width]);

  return xLinearScale;
}

//function used for updating y-scale var upon clicking on axis label
function yScale(crimesData, chosenYAxis) {
  //create scales
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(crimesData, d => d[chosenYAxis]) * 0.9,
    d3.max(crimesData, d => d[chosenYAxis]) * 1.4])
    .range([height, 0]);

  return yLinearScale;
}

//function used for updating xAxis var upon click on axis label
function renderAxesX(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

//function used for updating yAxis var upon click on axis label
function renderAxesY(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}

//function used for updating circles group with a transition to new circles
//for change in x axis or y axis
function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", data => newXScale(data[chosenXAxis]))
    .attr("cy", data => newYScale(data[chosenYAxis]));

  return circlesGroup;
}

//function used for updating state labels with a transition to new one
function renderText(textGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

  textGroup.transition()
    .duration(1000)
    .attr("x", d => newXScale(d[chosenXAxis]))
    .attr("y", d => newYScale(d[chosenYAxis]));

  return textGroup;
}
//function to stylize x-axis values for tooltips
function styleX(value, chosenXAxis) {

  //stylize based on variable chosen
  //male percentage
  if (chosenXAxis === 'male') {
    return `${value}%`;
  }
  //female percentage
  else if (chosenXAxis === 'female') {
    return `${value}%`;
  }
  //age (number)
  else {
    return `${value}`;
  }
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

  //select x label
  //male percentage
  if (chosenXAxis === 'male') {
    var xLabel = "Male:";
  }
  //female percentage
  else if (chosenXAxis === 'female') {
    var xLabel = "Female:";
  }
  //age (number)
  else {
    var xLabel = "Age:";
  }

  //select y label
  //percentage of non_agg_assault 
  if (chosenYAxis === 'non_agg_assault ') {
    var yLabel = "Non-Aggr Assault:"
  }
  //percentage stealing
  else if (chosenYAxis === 'stealing') {
    var yLabel = "Stealing:"
  }
  //percentage of aggravated assault
  else {
    var yLabel = "Aggravated Assault:"
  }

  //create tooltip
  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-8, 0])
    .html(function (d) {
      var x = styleX(d[chosenXAxis].toFixed(2), chosenXAxis);
      var y = Number.parseFloat(d[chosenYAxis]).toFixed(2);
      return (`${d.zipcode}<br>${xLabel} ${x}<br>${yLabel} ${y}%`);
    });

  circlesGroup.call(toolTip);

  //add events
  circlesGroup.on("mouseover", toolTip.show)
    .on("mouseout", toolTip.hide);

  return circlesGroup;
}

//retrieve csv data and execute everything below
d3.csv("static/data/plot_chart.csv").then(function (crimesData) {

  console.log(crimesData);

  //parse data
  crimesData.forEach(function (data) {
    data.stealing = +data.stealing;
    data.female = +data.female;
    data.aggr = +data.aggr;
    data.age = +data.age;
    data.non_agg_assault  = +data.non_agg_assault ;
    data.male = +data.male;
  });

  //create first linear scales
  var xLinearScale = xScale(crimesData, chosenXAxis);
  var yLinearScale = yScale(crimesData, chosenYAxis);

  //create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  //append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  //append y axis
  var yAxis = chartGroup.append("g")
    .classed("y-axis", true)
    .call(leftAxis);

  //append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(crimesData)
    .enter()
    .append("circle")
    .classed("stateCircle", true)
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 12)
    .attr("opacity", ".5");

  //append initial text
  var textGroup = chartGroup.selectAll(".stateText")
    .data(crimesData)
    .enter()
    .append("text")
    .classed("stateText", true)
    .attr("x", d => xLinearScale(d[chosenXAxis]))
    .attr("y", d => yLinearScale(d[chosenYAxis]))
    .attr("dy", 3)
    .attr("font-size", "10px")
    .text(function (d) { return d.abbr });

  //create group for 3 x-axis labels
  var xLabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20 + margin.top})`);

  var maleLabel = xLabelsGroup.append("text")
    .classed("aText", true)
    .classed("active", true)
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "male")
    .text("Male (%)");

  var ageLabel = xLabelsGroup.append("text")
    .classed("aText", true)
    .classed("inactive", true)
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "age")
    .text("Age (Average)")

  var femaleLabel = xLabelsGroup.append("text")
    .classed("aText", true)
    .classed("inactive", true)
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "female")
    .text("Female (%)")

  //create group for 3 y-axis labels
  var yLabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${0 - margin.left / 4}, ${(height / 2)})`);

  var non_agg_assaultLabel = yLabelsGroup.append("text")
    .classed("aText", true)
    .classed("active", true)
    .attr("x", 0)
    .attr("y", 0 - 20)
    .attr("dy", "1em")
    .attr("transform", "rotate(-90)")
    .attr("value", "non_agg_assault ")
    .text("Non-Aggr Assault (%)");

  var aggrLabel = yLabelsGroup.append("text")
    .classed("aText", true)
    .classed("inactive", true)
    .attr("x", 0)
    .attr("y", 0 - 40)
    .attr("dy", "1em")
    .attr("transform", "rotate(-90)")
    .attr("value", "aggr")
    .text("Aggravated Assault (%)");

  var stealingLabel = yLabelsGroup.append("text")
    .classed("aText", true)
    .classed("inactive", true)
    .attr("x", 0)
    .attr("y", 0 - 60)
    .attr("dy", "1em")
    .attr("transform", "rotate(-90)")
    .attr("value", "stealing")
    .text("Stealing (%)");

  //updateToolTip function with data
  var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

  //x axis labels event listener
  xLabelsGroup.selectAll("text")
    .on("click", function () {
      //get value of selection
      var value = d3.select(this).attr("value");

      //check if value is same as current axis
      if (value != chosenXAxis) {

        //replace chosenXAxis with value
        chosenXAxis = value;

        //update x scale for new data
        xLinearScale = xScale(crimesData, chosenXAxis);

        //update x axis with transition
        xAxis = renderAxesX(xLinearScale, xAxis);

        //update circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

        //update text with new x values
        textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

        //update tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

        //change classes to change bold text
        if (chosenXAxis === "male") {
          maleLabel.classed("active", true).classed("inactive", false);
          ageLabel.classed("active", false).classed("inactive", true);
          femaleLabel.classed("active", false).classed("inactive", true);
        }
        else if (chosenXAxis === "age") {
          maleLabel.classed("active", false).classed("inactive", true);
          ageLabel.classed("active", true).classed("inactive", false);
          femaleLabel.classed("active", false).classed("inactive", true);
        }
        else {
          maleLabel.classed("active", false).classed("inactive", true);
          ageLabel.classed("active", false).classed("inactive", true);
          femaleLabel.classed("active", true).classed("inactive", false);
        }
      }
    });

  //y axis labels event listener
  yLabelsGroup.selectAll("text")
    .on("click", function () {
      //get value of selection
      var value = d3.select(this).attr("value");

      //check if value is same as current axis
      if (value != chosenYAxis) {

        //replace chosenYAxis with value
        chosenYAxis = value;

        //update y scale for new data
        yLinearScale = yScale(crimesData, chosenYAxis);

        //update x axis with transition
        yAxis = renderAxesY(yLinearScale, yAxis);

        //update circles with new y values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

        //update text with new y values
        textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis)

        //update tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

        //change classes to change bold text
        if (chosenYAxis === "stealing") {
          stealingLabel.classed("active", true).classed("inactive", false);
          aggrLabel.classed("active", false).classed("inactive", true);
          non_agg_assaultLabel.classed("active", false).classed("inactive", true);
        }
        else if (chosenYAxis === "aggr") {
          stealingLabel.classed("active", false).classed("inactive", true);
          aggrLabel.classed("active", true).classed("inactive", false);
          non_agg_assaultLabel.classed("active", false).classed("inactive", true);
        }
        else {
          stealingLabel.classed("active", false).classed("inactive", true);
          aggrLabel.classed("active", false).classed("inactive", true);
          non_agg_assaultLabel.classed("active", true).classed("inactive", false);
        }
      }
    });
});