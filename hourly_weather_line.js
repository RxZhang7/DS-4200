const margin = { top: 50, right: 120, bottom: 60, left: 60 },
      width = 850 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

d3.json("hourly_weather_avgline.json").then(data => {
  const x = d3.scaleLinear()
    .domain([0, 23])
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.avg_count)])
    .nice()
    .range([height, 0]);

  const weatherTypes = ["Clear", "Cloudy", "Fair", "Rain", "Snow"];

  const color = d3.scaleOrdinal()
    .domain(weatherTypes)
    .range([
      "#F57C00",  
      "#78909C", 
      "#81C784", 
      "#039BE5",  
      "#90CAF9"   
    ]);

  const grouped = d3.group(data, d => d.weather);

  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).ticks(24).tickFormat(d => `${d}:00`));

  svg.append("g")
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height + 45)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .text("Hour of Day (0–23)");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -45)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .text("Average Ride Count");

  const line = d3.line()
    .x(d => x(d.hour))
    .y(d => y(d.avg_count));

  const tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("padding", "6px 10px")
    .style("background", "#fff")
    .style("border", "1px solid #999")
    .style("border-radius", "4px")
    .style("pointer-events", "none")
    .style("opacity", 0);

  for (let weather of weatherTypes) {
    const values = data.filter(d => d.weather === weather);

    svg.append("path")
      .datum(values)
      .attr("fill", "none")
      .attr("stroke", color(weather))
      .attr("stroke-width", 2)
      .attr("d", line);

    svg.selectAll(`.dot-${weather}`)
      .data(values)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.hour))
      .attr("cy", d => y(d.avg_count))
      .attr("r", 3)
      .attr("fill", color(weather))
      .on("mouseover", function (event, d) {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip.html(
          `<strong>${d.weather}</strong><br/>Hour: ${d.hour}:00<br/>Avg Rides: ${d.avg_count.toFixed(1)}`
        )
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 30) + "px");
      })
      .on("mouseout", function () {
        tooltip.transition().duration(300).style("opacity", 0);
      });
  }

  const legend = svg.append("g")
    .attr("transform", `translate(${width + 20}, 0)`);

  weatherTypes.forEach((weather, i) => {
    legend.append("rect")
      .attr("x", 0)
      .attr("y", i * 25)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", color(weather));

    legend.append("text")
      .attr("x", 25)
      .attr("y", i * 25 + 14)
      .text(weather)
      .style("font-size", "14px")
      .attr("alignment-baseline", "middle");
  });
});





