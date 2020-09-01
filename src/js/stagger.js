function makeStagger() {
    var ds1 = [2, 1, 3, 5, 7, 8, 9, 9, 9, 8, 7, 5, 3, 1, 2];
    var ds2 = [8, 9, 8, 7, 5, 3, 2, 1, 2, 3, 5, 7, 8, 9, 8];
    var n = ds1.length, mx = d3.max(d3.merge([ds1, ds2]));

    var svg = d3.select('#stagger');

    var scX = d3.scaleLinear().domain([0, n]).range([50, 540]);
    var scY = d3.scaleLinear().domain([0, mx]).range([250, 50]);

    svg.selectAll('line').data(ds1).enter().append('line')
        .attr('stroke', 'red')
        .attr('stroke-width', 20)
        .attr('x1', (d, i) => scX(i))
        .attr('y1', scY(0))
        .attr('x2', (d, i) => scX(i))
        .attr('y2', d => scY(d));

    svg.on('click', function () {
        [ds1, ds2] = [ds2, ds1];
        svg.selectAll('line').data(ds1)
            .transition().duration(1000).delay((d, i) => 200 * i)
            .attr('y2', d => scY(d));
    })
    // 字符串的渐变
    var t1 = d3.select('#t1'), t2 = d3.select('#t2');
    t1.on('click', function () {
        t1.transition().attr('fill-opacity', 0);
        t2.transition().attr('fill-opacity', 1);
        console.log('click')
    });
    t2.on('click', function () {
        t1.transition().attr('fill-opacity', 1);
        t2.transition().attr('fill-opacity', 0);
    });
    // 链式调用过度
    d3.select('#circle')
        .on('click', function (d) {
            d3.select(this).transition().duration(2000).attr('fill', 'red')
                .transition().attr('fill', 'blue');
        })
        .on('mouseenter', function () {
            // 自定义补间函数
            d3.select(this).transition().duration(2000).ease(t => t)
                .attrTween('fill', function () {
                    return t => 'hsl(' + 360 * t + ', 100%, 50%)';
                });
        });

    d3.select('#customer')
        .append('rect')
        .attr('x', 30)
        .attr('y', 30)
        .attr('width', 40)
        .attr('height', 40)
        .on('mouseenter', function () {
            d3.select(this).transition().duration(200).ease(t => t)
                .attrTween('transform', function () {
                    return t => 'rotate(' + 360 * t + ', 50, 50)';
                })
        })
    ;
}
