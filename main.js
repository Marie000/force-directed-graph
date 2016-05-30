d3.json('https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json',
    function(data) {
        var nodes = data.nodes;
        var links = data.links;

        var svg = d3.select('body').append('svg')
            .attr('width',900)
            .attr('height',900)
            .style('background','grey')

        var force = d3.layout.force()
            .size([900,900])
            .charge(-100)
            .nodes(nodes)
            .links(links)
            .linkDistance(20)

        var link = svg.selectAll('.link')
            .data(links)
            .enter()
            .append('line')
            .attr('class','link')
            .style('stroke','black')

        var node = svg.selectAll('.flag')
            .data(nodes)
            .enter()
            .append('image')
            .attr('class',function(d){
                return "flag flag-"+d.code
            })
            .attr('width',25)
            .attr('height',16)
            .attr("xlink:href", function(d){
                return 'images/'+d.code+".png"
            })
            .call(force.drag)


        force.on('tick',function(){
            link.attr('x1',function(d){
                    return d.source.x
                })
                .attr('x2',function(d){
                    return d.target.x
                })
                .attr('y1',function(d){
                    return d.source.y
                })
                .attr('y2',function(d){
                    return d.target.y
                })

            node.attr('x',function(d){
                    return d.x-5
                })
                .attr('y',function(d){
                    return d.y-5
                })
        })

        force.start()

    });
