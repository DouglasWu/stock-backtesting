function drawLineChart (data, type) {
	/*
		type: 'day', 'deal', 'week'
	*/
	var margin = {top: 20, right: 20, bottom: 30, left: 80},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	var formatDate = d3.time.format("%Y/%m/%d");

	var x;
	if(type=="deal") {
		x = d3.scale.linear().range([0, width]);
	} else{
		x = d3.time.scale().range([0, width]);	
	}

	var y = d3.scale.linear()
		.range([height, 0]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.tickSize(-width).tickSubdivide(true);

	if(type=="deal") {
		var line = d3.svg.line()
			.x(function(d) { return x(d.no); })
			.y(function(d) { return y(d.networth); });
	} else {
		var line = d3.svg.line()
			.x(function(d) { return x(formatDate.parse(d.date)); })
			.y(function(d) { return y(d.networth); });	
	}
	
	var className = "";
	if(type=="deal") {
		className = ".deal-line-chart";
	} else if(type=="day") {
		className = ".line-chart";
	} else {
		className = ".week-line-chart";
	}

	var svg = d3.select(className).append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	  if(type=="deal") {
			x.domain(d3.extent(data, function(d) { return d.no; }));
	  } else {
	  	x.domain(d3.extent(data, function(d) { return formatDate.parse(d.date); }));	
	  }	  
	  y.domain(d3.extent(data, function(d) { return d.networth; }));

	  svg.append("g")
		  .attr("class", "x axis")
		  .attr("transform", "translate(0," + height + ")")
		  .call(xAxis);

	  svg.append("g")
		  .attr("class", "y axis")
		  .call(yAxis)
		.append("text")
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .text("淨值");

	  svg.append('path')
	     .attr("class", "line")
		 .attr('d', line(data)); 
	  
}