// select tags
let selDataSetTag = d3.select('#selDataset')
let data = [];

// Get data
d3.json('../data/samples.json').then(dataIn => {
    // Parse data
    let names = []
    dataIn.names.forEach(function(val){
        names.push(parseInt(val));
    });
    dataIn.names = names

    dataIn.samples.forEach(function(row){
        row.id = parseInt(row.id);
    });
    data = dataIn;
    // log parsed data
    console.log(data);

    selDataSetTag
        .selectAll('option')
        .data(data.samples).enter()
        .append('option')
        .html( d => `${d.id}`);
    // get initial id
    initialId = selDataSetTag.node().value;
    // Run script for initial id
    optionChanged(initialId);
});

// When dropdown id selector had been init/changed
function optionChanged(id){ 
    id = +id
    // Get metadata for only the selected ID
    let selectedRow = {};
    data.metadata.forEach( row => {
        if(row.id === id){
            selectedRow = row;
        };
    });
    // Fill metadata box
    fillMetaData(id, selectedRow)
    createGaugeChart(id, selectedRow);

    // Get samples data for only the selected ID
    data.samples.forEach( row => {
        if(row.id === id){
            selectedRow = row;
        };
    });

    // create array of dictionaries for subject id. Dict format {'otu_id': val, 'sample_value': val, 'otu_label': val}
    let samples = [];
    for(i = 0; i < selectedRow.otu_ids.length; i++){
        samples.push({'otu_id': selectedRow.otu_ids[i], 'sample_value': selectedRow.sample_values[i], 'otu_label': selectedRow.otu_labels[i]})
    };

    // Create charts for select id
    createBarChart(id, samples);
    createBubbleChart(id, samples);
};

function fillMetaData(id, idMetadata){
    d3.select('#sample-metadata').html("");
    d3.select('#sample-metadata').append('p').html(`id: ${idMetadata.id}`);
    d3.select('#sample-metadata').append('p').html(`ethnicity: ${idMetadata.ethnicity}`);
    d3.select('#sample-metadata').append('p').html(`gender: ${idMetadata.gender}`);
    d3.select('#sample-metadata').append('p').html(`age: ${idMetadata.age}`);
    d3.select('#sample-metadata').append('p').html(`location: ${idMetadata.location}`);
    d3.select('#sample-metadata').append('p').html(`bbtype: ${idMetadata.bbtype}`);
    d3.select('#sample-metadata').append('p').html(`wfreq: ${idMetadata.wfreq}`);
}

// Create bar chart, otu vs. sample values, for select id
function createBarChart(id, samples){
    // sort to get top otus by sample_value
    samples.sort(function(a, b) {
        return a.sample_values - b.sample_values;
        });

    // Get top 10 otus by sample_value
    let topSamples = samples.slice(0,10);

    // Cast otu_ids to string to display as categories on bar chart
    let otu_ids = topSamples.map(row => row.otu_id.toString());
    let sample_values = topSamples.map(row => row.sample_value);
    let otu_labels = topSamples.map(row => row.otu_label);

    // Bar chart data
    var trace1 = {
        x: sample_values.reverse(),
        y: otu_ids.reverse(),
        text: otu_labels,
        type: 'bar',
        orientation: 'h'
    };
    var traces = [trace1];

    // Bar plot layout
    var layout = {
        title: `Bacteria Counts in Subject ${id}`,
        xaxis: {title: 'Bacteria Count', automargin: true},
        yaxis: {title: 'OTU IDs', automargin: true, type: 'category'},
        height: '100%',
        width: '100%'
        
    };
    // Plot bar chart
    Plotly.newPlot('bar', traces, layout);
};

function createBubbleChart(id, samples){
    // Cast otu_ids to string to display as categories on bar chart
    let otu_ids = samples.map(row => row.otu_id);
    let sample_values = samples.map(row => row.sample_value);
    let otu_labels = samples.map(row => row.otu_label);
    console.log()
    let maxOtuId = d3.max(otu_ids);
    let bubbleColors = otu_ids.reverse().map(val => `rgb(${127 - val / maxOtuId * 127},0,${127 + val / maxOtuId * 127})`);
    console.log('here');
    console.log('max', maxOtuId);
    console.log('ids', otu_ids.reverse());
    console.log('colors', bubbleColors);

    // Bubble chart data
    var trace1 = {
        x: otu_ids.reverse(),
        y: sample_values.reverse(),
        text: otu_labels,
        mode: 'markers',
        marker: {
            color: bubbleColors,
            size: sample_values.reverse()
        }
    };
    var traces = [trace1];

    // Bubble plot layout
    var layout = {
        title: `Bacteria Counts in Subject ${id}`,
        height: '100%',
        width: '100%',
        xaxis: {title: 'OTU IDs', automargin: true},
        yaxis: {title: 'Bacteria Count', automargin: true}
    };

    // Plot Bubble chart
    Plotly.newPlot('bubble', traces, layout);
};
  
// Plotly.newPlot('myDiv', data, layout);
function createGaugeChart(id, idMetadata){
    let wfreq = idMetadata.wfreq;

    // Gauge chart data
    var trace1 = {
        type: "indicator",
        value: idMetadata.wfreq,
        //delta: { reference: 0 },
        gauge: { axis: { visible: true, range: [0, 9] }},
        //domain: { row: 1, column: 1 },
        title: { text: "Scrubs per Week" },
        mode: "number+delta+gauge"
      };

    var traces = [trace1];
    
    var layout = {width: 475};

    // Plot Gauge chart
    Plotly.newPlot('gauge', traces, layout);
};