const KG_PER_POUND = 0.45;
const METER_PER_INCH = 0.0254;

let container = d3.select("#container");
d3.csv("data.csv").then(showData3);

function write(text) {
  container.append("div").text(text);
}

function showData(clients) {
  let max = d3.max(clients, (d) => d.Weight);
  let scale = d3.scaleLinear().range([0, 200]).domain([0, max]);
  let join = container.selectAll("div").data(clients);
  join
    .enter()
    .append("div")
    .text((d) => d.Name + ": " + scale(d.Weight))
    .style("background-color", "steelblue")
    .style("margin", "5px")
    .style("padding", "2px")
    .style("color", "white")
    .style("width", (d) => scale(d.Weight) + "px");
}

function showData2(clients) {
  let maxWeight = d3.max(clients, (d) => d.Weight);
  let xScale = d3.scaleLinear().range([0, 300]).domain([0, maxWeight]);
  let yScale = d3
    .scaleBand()
    .range([0, 200])
    .domain(clients.map((d) => d.Name))
    .padding(0.1);
  let join = container.selectAll("rect").data(clients);

  join
    .enter()
    .append("rect")
    .attr("y", (d) => yScale(d.Name))
    .attr("width", (d) => xScale(d.Weight))
    .attr("height", yScale.bandwidth());
}

function showData3(clients) {
  // sort the clients by weight
  clients.sort((a, b) => d3.descending(a.Weight, b.Weight));
  console.log(clients);
  let body = d3.select("#body");
  let maxWeight = d3.max(clients, (d) => d.Weight);
  let xScale = d3.scaleLinear().range([0, 250]).domain([0, maxWeight]);
  let yScale = d3
    .scaleBand()
    .range([0, 200])
    .domain(clients.map((d) => d.Name))
    .padding(0.3);
  let join = body.selectAll("rect").data(clients);

  join
    .enter()
    .append("rect")
    .attr("y", (d) => yScale(d.Name))
    .attr("width", (d) => xScale(d.Weight))
    .attr("height", yScale.bandwidth());

  let xAxis = d3
    .axisBottom(xScale)
    .ticks(4)
    .tickFormat((d) => d + " lb");
  d3.select("#xAxis").attr("transform", "translate(50,200)").call(xAxis);

  let yAxis = d3.axisLeft(yScale);
  d3.select("#yAxis").attr("transform", "translate(50,0)").call(yAxis);
}
