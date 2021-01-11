// Get data
d3.json('../data/samples.json').then(data => {
    // log data
    console.log(data);

    d3.select('#selDataset')
        .selectAll('option')
        .data(data.samples).enter()
        .append('option')
        .html( d => `${d.id}`)

});
