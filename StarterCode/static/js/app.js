// select tags
let selDataSetTag = d3.select('#selDataset')
let data = [];
let otu_ids = [];
let sample_values = [];
let otu_labels = [];
let selectId = 0;

// Get data
d3.json('../data/samples.json').then(dataIn => {
    // log data
    console.log(dataIn);
    data = dataIn;
    selDataSetTag
        .selectAll('option')
        .data(dataIn.samples).enter()
        .append('option')
        .html( d => `${d.id}`);
    // get initial id
    selectId = selDataSetTag.node().value;
    console.log(selectId);
    optionChanged(selectId);
});

function optionChanged(id){ 
    let selectedId = id;
    data.samples.forEach( row => {
        if(row.id === selectedId){
            otu_ids = row.otu_ids;
            sample_values = row.sample_values;
            otu_labels = row.otu_labels;
        };
    });
    console.log('otu_ids: ', otu_ids);
    console.log('sample_values: ', sample_values);
    console.log('otu_labels: ', otu_labels);
    createBarChart(selectedId, otu_ids, otu_labels, sample_values);
};

function createBarChart(id, otu_ids, otu_labels, sample_values){
    let otu_ids_text = otu_ids.map(id => id.toString());
    var trace1 = {
        x: otu_ids_text,
        y: sample_values,
        text: otu_labels,
        type: 'bar',
    };

    var traces = [trace1];
    var layout = {
        title: `Bacteria Counts in Subject ${id}`,
        height: '100%',
        width: '100%',
        xaxis: {title: 'Bacteria Type', automargin: true, type: 'category'},
        yaxis: {title: 'Bacteria Count', automargin: true}
    };

    Plotly.newPlot(
        'bar',
        traces,
        layout
    );
};
