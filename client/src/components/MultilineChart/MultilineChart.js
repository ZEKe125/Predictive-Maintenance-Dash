import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';

const MultilineChart = ({ data = [], dimensions = {} }) => {
  const myRef = useRef(null);
  // to detect what line to animate we should store previous data state
  const [prevItems, setPrevItems] = useState([]);
  const { width, height, margin = {} } = dimensions;

  useEffect(() => {
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Set rvg using ref
    const svgRef = d3.select(myRef.current);

    // Find the domain based on all the lines datapoints
    const lineDomainValues = []
    data.forEach(arr => {
      arr.items.map(d => {
        lineDomainValues.push(d.value)
      })
    })
    // console.log(lineDomainValues)

    // Create scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(data[0].items, (d) => d.date)).nice()
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(lineDomainValues)).nice()
      .range([innerHeight, 0]);
    
    // Clear svg content before adding new elements
    svgRef.selectAll("*").remove(); 

    // Set svg to main container
    const svg = svgRef.attr("width", width)
      .attr("height", height)
      .append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})` );

    // Adding x-axis
    svg.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScale).tickSizeOuter(0));
    
    // Adding y-axis
    svg.append("g")
    .call(d3.axisLeft(yScale).tickSizeOuter(0));

    // Add top and right axis
    svg.append("g")
                .call(d3.axisTop(xScale).ticks(0).tickSizeOuter(0));
        
    svg.append("g")
            .attr("transform", `translate(${innerWidth}, 0)`)
            .call(d3.axisRight(yScale).ticks(0).tickSizeOuter(0));

    // Draw the lines
    const line = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value));

    const lines = svg
      .selectAll(".line")
      .data(data)
      .join("path")
      .attr("fill", "none")
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 2)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", (d) => line(d.items));

    // Use stroke-dashoffset for transition
    // NOTE: Need to have data sorted to render in 
    // correct order
    lines.each((d, i, nodes) => {
      const element = nodes[i];
      const length = element.getTotalLength();
      if (!prevItems.includes(d.name)) {
        d3.select(element)
          .attr("stroke-dasharray", `${length},${length}`)
          .attr("stroke-dashoffset", length)
          .transition()
          .duration(1000)
          .ease(d3.easeLinear)
          .attr("stroke-dashoffset", 0);
      }
    });
    setPrevItems(data.map(({ name }) => name));
  }, [data]);

  return (
    <div>
      <svg ref={myRef}></svg>
    </div>
  );
};

export default MultilineChart;