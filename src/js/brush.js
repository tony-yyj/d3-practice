function makeBrush() {
    d3.csv('./data/dense.csv').then(function (data) {
        var svg1 = d3.select('#brush1');
        var svg2 = d3.select('#brush2');
        var sc1 = d3.scaleLinear().domain([0, 10, 50])
            .range(['lime', 'yellow', 'red']);
        var sc2 = d3.scaleLinear().domain([0, 10, 50])
            .range(['lime', 'yellow', 'blue']);
        var cs1 =  drawCircles(svg1, data, d=>d['A'], d=>d['B'], sc1);
        var cs2 =  drawCircles(svg2, data, d=>d['A'], d=>d['C'], sc2);
        // svg1.call(installHandlers, data, cs1, cs2, sc1, sc2);
        svg1.call(installHandlersPlus, data, cs1, cs2, sc1, sc2);
    })


}

function drawCircles(svg, data, accX, accY, sc) {
    var color = sc(Infinity);
    return svg.selectAll('circle').data(data).enter()
        .append('circle')
        .attr('r', 5)
        .attr('cx', accX)
        .attr('cy', accY)
        .attr('fill', color)
        .attr('fill-opacity', 0.4);
}

function installHandlers(svg, data, cs1, cs2, sc1, sc2) {
    svg.attr('cursor', 'crosshair')
        .on('mouseover', function () {
            var pt = d3.mouse(svg.node());
            cs1.attr('fill', function (d, i) {
                var dx = pt[0] - d3.select(this).attr('cx');
                var dy = pt[1] - d3.select(this).attr('cy');
                // 两个参数的平方和的平方根，斜面？
                var r = Math.hypot(dx, dy);
                data[i]['r'] = r;
                return sc1(r);

            });
            cs2.attr('fill', (d, i) => sc2(data[i]['r']))
        })
        .on('mouseleave', function () {
            cs1.attr('fill', sc1(Infinity));
            cs2.attr('fill', sc2(Infinity));

        })
}

function installHandlersPlus(svg, data, cs1, cs2, sc1, sc2) {
    var cursor = svg.append('circle').attr('r', 50)
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stock-width', 10)
        .attr('stroke-opacity', 0.1)
        .attr('visibility', 'hidden');
    var hotZone = svg.append('rect')
        .attr('cursor', 'none')
        .attr('x', 50)
        .attr('y', 50)
        .attr('width', 200)
        .attr('height', 200)
        .attr('visibility', 'hidden')
        .attr('pointer-events', 'all')
        .on('mouseenter', function () {
            cursor.attr('visibility', 'visible');
        })
        .on('mousemove', function () {
            var pt = d3.mouse(svg.node());
            cursor.attr('cx', pt[0])
                .attr('cy', pt[1]);
            cs1.attr('fill', function (d, i) {
                var dx = pt[0] - d3.select(this).attr('cx');
                var dy = pt[1] - d3.select(this).attr('cy');
                // 两个参数的平方和的平方根，斜面？
                var r = Math.hypot(dx, dy);
                data[i]['r'] = r;
                return sc1(r);

            });
            cs2.attr('fill', (d, i) => sc2(data[i]['r']))

        })
        .on('mouseleave', function () {
            cursor.attr('visibility', 'hidden');
            cs1.attr('fill', sc1(Infinity));
            cs2.attr('fill', sc2(Infinity));

        })

}
