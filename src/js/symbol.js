function makeSymbols() {
    var data = [
        {
            x: 40, y: 0, val: 'A',
        },
        {
            x: 80, y: 30, val: 'A',
        },
        {
            x: 120, y: -10, val: 'B',
        },
        {
            x: 160, y: 15, val: 'A',
        },
        {
            x: 200, y: 0, val: 'C',
        },
        {
            x: 240, y: 10, val: 'B',
        },

    ];
    var symbMKr = d3.symbol().size(81).type(d3.symbolStar);
    var scY = d3.scaleLinear().domain([-10, 30]).range([80, 40]);
    d3.select('#svg').append('g')
        .selectAll('path')
        .data(data)
        .enter()
        .append('path')
        .attr('d', symbMKr)
        .attr('fill', 'red')
        .attr('transform', d => 'translate(' + d['x'] + ', ' + scY(d['y']) + ')');

    var scT = d3.scaleOrdinal(d3.symbols).domain(['A', 'B', 'C']);
    var scColor = d3.scaleOrdinal(['red', 'green', 'blue']).domain(['A', 'B', 'C'])
    d3.select('#svg')
        .append('g')
        .attr('transform', 'translate(300, 0)')
        .selectAll('path').data(data).enter().append('path')
        .attr('d', d => symbMKr.type(scT(d['val']))())
        .attr('fill', d => scColor(d['val']))
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('transform', d => 'translate(' + d['x'] + ',' + scY(d['y']) + ')');

}
