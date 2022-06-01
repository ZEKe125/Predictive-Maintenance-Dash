import React, {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';

const LineChart = ({ data = [], limits = [], predict = {}, dimensions = {}, startDate, endDate }) => {

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  const myRef = useRef(null);
  const { width, height, margin = {} } = dimensions;

  useEffect(() => {
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Set rvg using ref
    const svgRef = d3.select(myRef.current);

    // Find the domain based on all the lines datapoints
    const lineDomainValues = []

    // Get values from limits
    limits.map(d => {
      if(d.value)
        lineDomainValues.push(d.value)
    })
    
    // Get values from line chart (metric values)
    data.forEach(arr => {
      arr.items.map(d => {
        lineDomainValues.push(d.value)
      })
    })

    if(!isEmpty(predict)) {
      predict.items.map(d => {
        lineDomainValues.push(d.upper_value)
        lineDomainValues.push(d.lower_value)
      })
      if(predict.items.length !== 0) {
        let predictEndDate = predict.items.slice(-1).pop().date;
        if(new Date(endDate) < new Date(endDate))
          endDate = predictEndDate;
      }
      
    }

  // Clear svg content before adding new elements
    svgRef.selectAll("*").remove(); 
    // Create scales
    const xScale = d3.scaleTime()
      .domain([new Date(startDate), new Date(endDate)]).nice()
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(lineDomainValues)).nice()
      .range([innerHeight, 0]);
    
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
    
    // draw clipped path on the screen
    svg.append("clipPath")   
        .attr("id", "chart-clip")  
        .append("rect")   // attach a rectangle
            .attr("x", 0)        // position the left of the rectangle
            .attr("y", 0)         // position the top of the rectangle
            .attr("height", innerHeight)    // set the height
            .attr("width", innerWidth);    // set the width

    // Draw the lines
    const line = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value));

    
    limits.map(d => {
      if(d.value) {
      svg.append('line')
          .style("stroke", d.color)
          .style("stroke-width", 2)
          .style("stroke-dasharray","5,5")
          .attr("x1", 0)
          .attr("y1", yScale(d.value))
          .attr("x2", innerWidth)
          .attr("y2", yScale(d.value));
        }
    })
    // Add the line
    if(!isEmpty(predict)) {
       svg.append("path")
      .datum(predict)
      .attr("fill", "none")
      .attr("stroke", predict.color)
      .attr("stroke-width", 1.5)
      .attr("clip-path", "url(#chart-clip)")
      .attr("d", line(predict.items));

      var area = d3.area()
        .x(function (d) { return xScale(d.date); })
        .y0(function (d) { return yScale(d.upper_value); })
        .y1(function (d) { return yScale(d.lower_value); });

      svg.append('path')
        .datum(predict.items)
        .attr('class', 'area')
        .attr('d', area)
        .style("fill", "#AEC7E8")
        .attr("clip-path", "url(#chart-clip)")
        .style("opacity", .5);

    }

    const lines = svg
      .selectAll(".line")
      .data(data)
      .join("path")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("clip-path", "url(#chart-clip)")
      .attr("d", (d) => line(d.items));

  }, [data, limits, predict, dimensions]);

  return (
    <div>
      <svg ref={myRef}></svg>
    </div>
  );
};

export default LineChart;