function makeDemo() {
    d3.tsv('./data/examples-multiple.tsv')
        .then(function(data) {
            var svg = d3.select('svg');

            var pxX = svg.attr('width');
            var pxY = svg.attr('height');

            var makeScale = function(accessor, range) {
                return d3.scaleLinear()
                    .domain(d3.extent(data, accessor))
                    .range(range)
                    .nice();
            };

            var scX = makeScale(d => d['x'], [0, pxX]);
            var scY1 = makeScale(d => d['y1'], [pxY, 0])
            var scY2 = makeScale(d => d['y2'], [pxY, 0])

            var drawData = function(g, accessor, curve) {
                g.selectAll('circle')
                    .data(data)
                    .enter()
                    .append('circle')
                    .attr('x', 5)
                    .attr('cx', d => scX(d['x']))
                    .attr('cy', accessor);
                var lineMaker = d3.line()
                    .curve(curve)
                    .x(d => scX(d['x']))
                    .y(accessor);

                g.append('path')
                    .attr('fill', 'none')
                    .attr('d', lineMaker(data));
            };

            var g1 = svg.append('g');
            var g2 = svg.append('g');

            drawData(g1, d => scY1(d['y1']), d3.curveStep);
            drawData(g2, d => scY2(d['y2']), d3.curveNatural);

            g1.selectAll('circle').attr('fill', 'green');
            g1.selectAll('path').attr('stroke', 'cyan');

            g2.selectAll('circle').attr('fii', 'blue');
            g2.selectAll('path').attr('stroke', 'red');

            var axMK = d3.axisRight(scY1);
            axMK(svg.append('g'));

            axMK = d3.axisLeft(scY2);
            svg.append('g')
                .attr('transform', 'translate(' + pxX + ',0)')
                .call(axMK);

            svg.append('g')
                .call(d3.axisTop(scX))
                .attr('transform', 'translate(0,' + pxY + ')');

        })
}