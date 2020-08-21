function makeList() {
    var vs = [
        'From East',
        'To West',
        'At Home',
        'IS Best',
    ];

    d3.select('body')
        .append('ul')
        .selectAll('li')
        .data(vs)
        .enter()
        .append('li')
        .text(d => d)
        .on('click', function() {
            this.toggleState = !this.toggleState;
            d3.select(this)
                .transition()
                .duration(200)
                .style('color', this.toggleState ? 'red' : 'black');
        })
}