function makeVoters() {
    var n = 50, w = 900 / n, dt = 3000, svg = d3.select('#voters');

    // 创建一个n*n对象数组。每个对象具有0-1之间的随机value值。计算出数据所在正方形的x和y坐标
    var data = d3.range(n * n)
        .map(d => {
            return {
                x: d % n,
                y: d / n | 0, // 用位运算快速取整。
                val: Math.random()
            }
        });

    // 容器比例尺，将定义域分隔为大小相同的容器。默认的值[0, 1]被分割成了三个大小相同的容器，颜色各不相同
    var sc = d3.scaleQuantize()
        .range(['white', 'red', 'black']);

    // 创建方块并绑定数据集,将值映射为不同的颜色。
    svg.selectAll('rect').data(data).enter().append('rect')
        .attr('x', d => w * d.x)
        .attr('y', d => w * d.y)
        .attr('width', w - 1).attr('height', w - 1)
        .attr('fill', d => sc(d.val));

    /**
     * 重新计算数据，随机访问数组中的每个元素。
     * 每个元素则随机选择周围八个相邻元素中的一个，并将当前的value的值赋给自身。
     * @returns {*}
     */
    function update() {
        // 相邻八个元素的相对坐标
        var nbs = [
            [0, 1], [0, -1],
            [1, 0], [-1, 0],
            [1, 1], [1, -1],
            [-1, 1], [-1, -1]
        ];
        return d3.shuffle(d3.range(n * n)).map(i => {
            var nb = nbs[nbs.length * Math.random() | 0];
            var x = (data[i].x + nb[0] + n) % n;
            var y = (data[i].y + nb[1] + n) % n;
            data[i].val = data[y * n + x].val;
        });
    }

    // 定时器
    d3.interval(function () {
        update();
        svg.selectAll('rect').data(data)
            // 从上到下盐城更新图形元素
            .transition().duration(dt).delay((d, i) => i * 0.25 * dt / (n * n))
            .attr('fill', d => sc(d.val))
    }, dt)
}
