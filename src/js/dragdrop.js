function makeDragDrop() {
    var widget, color;

    var drag = d3.drag()
        .on('start', function () {
            color = d3.select(this).attr('fill');
            widget = d3.select(this).attr('fill', 'lime');
        })
        .on('drag', function () {
            var pt = d3.mouse(d3.select(this).node());
            widget.attr('cx', pt[0]).attr('cy', pt[1]);
        })
        .on('end', function () {
            widget.attr('fill', color);
            widget = undefined;

        });
    drag(d3.select('#dragdrop').selectAll('circle'));
}
