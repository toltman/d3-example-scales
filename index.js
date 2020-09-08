const KG_PER_POUND = 0.45;
const METER_PER_INCH = 0.0254;

let container = d3.select("#container");
d3.csv("data.csv").then(showData);

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
