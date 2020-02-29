// Fetch the JSON data and console log it
// d3.json("data.json", function(data) {
//     console.log(data);
// });

// Draw BarGraph 
function DrawBarGraph(choosenSampleID)
{
    console.log("DrawBarGraph: sample =", choosenSampleID);

// Fetching and filtering values from Jason file. 
    d3.json("samples.json").then((data)=>{
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == choosenSampleID);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;


//Create variable barData. You will be using barData when you call Plotly
        var yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
//Create trace (Populating data to be plotted.)
        var barData =[
        {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text:  otu_labels.slice(0,10).reverse(),
            orientation: "h"
        }
    ];

//Asign variable to barLayout. You will be using barLayout when you call Plotly
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
    }

// Call plotly to plot Bar and direct HTML tag that will hold graph
    Plotly.newPlot("bar", barData, barLayout);
});
}

// Draw Bubble Chart 
function DrawBubbleChart(choosenSampleID)
{
    console.log("DrawBubbleChart: sample =", choosenSampleID);

    //Filtering and fetching values from Jason File.
    d3.json("samples.json").then((data)=>{
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == choosenSampleID);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

//Create variable barData. You will be using barData when you call Plotly
// var yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
//Create trace (Populating data to be plotted.)
        var bubbleData =[
        {
            x: otu_ids,
            y: sample_values,
            type: "scatter",
            text:  otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
            
        }
    ];
//Asign variable to barLayout. You will be using barLayout when you call Plotly
var bubbleLayout = {
    title: "All Samples Display",
    margin: {t: 30, l: 150}
}

// Call plotly to plot Bar and direct HTML tag that will hold graph
Plotly.newPlot("bubble", bubbleData, bubbleLayout);


    });
}

// Show MetaData 
function ShowMetaData(choosenSampleID)
{
    console.log("ShowMetaData: sample =", choosenSampleID);

//Filtering and fetching data
d3.json("samples.json").then((data)=>{
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == choosenSampleID);
    var result = resultArray[0];

//creating for 
    var panel = d3.select("#sample-metadata");
//clearing data from panel to generate new information 
    panel.html("");
//To iterate throug every value, we use Entries used with key and values
    Object.entries(result).forEach(([key, value]) => {
    panel.append("h6").text(`${key.toUpperCase()}: ${value}`);

});
});
}

// Populate charts when new sampleID is called
function optionChanged(newsampleID)
{
    console.log("Dropdown changed to:", newsampleID);
   
    DrawBarGraph(newsampleID);
    DrawBubbleChart(newsampleID);
    ShowMetaData(newsampleID);
}

function Init()
{
    console.log("Initializing screen");
    //Populate the dropdown with all IDs 
    sampleID = 100;
    //create function that will allow initial selection of the data
    var selector = d3.select("#selDataset");

    //Within the initialization function, 
    //Fetch json file where data will be read from, and select the sample name needed from the key names;
    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;
    // create loop to loop through all the sample names in the key names; in our json file and put them in
    // in the dropdown list.
        sampleNames.forEach((sampleID) => {
            selector
            //Here, we have our option coming in as text. We then set the propery to valu
                .append("option")
                .text(sampleID)
                .property("value", sampleID);
        });
        
    });
    
    DrawBarGraph(sampleID);
    DrawBubbleChart(sampleID);
    ShowMetaData(sampleID);

}

Init();