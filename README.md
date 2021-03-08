# Overview
This project generates webpage visualizations for a navel organism study. The page accepts a user input to identify the test subject, and displays three charts to display the subjects results.

The project uses D3.js and Plotly.js as its main libraries.

## Data and Subject Selection

1. Data for the navel study is read from samples.json.

2. Test subject's IDs are displayed in the dropdown pane on the left of the page.

3. User selects the subject's ID for visualizations and metadata (age, gender etc.)

## Metadata Pane

1. The metadata pane shows demographic information for the subject

## Horizontal Bar Chart

1. The bar chart displays OTU (operating taxinomic units) count for the top 10 OTUs (by count) in the subject's navel. OTUs are clusters of similar organisms.

2. y-axis: the OTU ID refers to a specific OTU

3. x-axis: the OTU count refers to the instance count of each OTU in the subject's navel

4. Hover text: Hover text: Hovering over a bar shows the OTU count and OTU label

## Gauge Chart

1. The gauge chart displays the washing behavior of the subject.

2. The value shown refers to the number of time a subject washes the navel region in an average week

## Bubble Chart

1. The bubble chart displays OTU count for the each OTU in the subject's navel.

3. y-axis: the OTU count refers to the instance count of each OTU in the subject's navel

2. x-axis: the OTU ID refers to a specific OTU

3. Bubble size: size is defined by the instance count of each OTU in the subject's navel

4. Bubble color: color is defined by the OTU ID

5. Hover text: Hovering over a bar shows the OTU count and OTU label

![](images/capture.png)

