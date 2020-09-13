function makeList() {
    var vs = [
        {
            text: 'symbol',
            url: './symbol.html'
        },
        {
            text: 'stagger',
            url: '/stagger.html',
        },
        {
            text: 'lissajous',
            url: '/lissajous.html'
        },
        {
            text: 'voter',
            url: '/voter.html',
        }
   ];

    d3.select('body')
        .append('ul')
        .selectAll('li')
        .data(vs)
        .enter()
        .append('li')
        .append('a')
        .text(d => d.text)
        .attr('href', d => d.url)
        // .on('click', function (d) {
        //     console.log(d);
        //     window.location.url = d.url;
        // })

}
