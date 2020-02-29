// Fetch the JSON data and console log it
// d3.json("data.json").then((data) 
// => {
//     console.log(data);
// });

// Fetch the JSON data and console log it
d3.json("data.json", function(data) {
    console.log(data);
});

// Draw BarGraph 
function DrawBarGraph(sampleID)
{
    console.log("DrawBarGraph: sample =", sampleID);

    d3.json("data.json").then((data)=>{
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == desiredSampleID);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_la
    })

    var barData =[
        {
            x:
            y: sample_values.slice(0:10).reverse();
            type: "bar",
            text:
            orientation: "h"
        }
    ];

    var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: {t: 30, l: 150}
    }

// Calling plotly to plot our Bar Graph 
    Plotly.newPlot("bar", barData, barLayout)
}

// Draw Bubble Chart 
function DrawBubbleChart(sampleID)
{
    console.log("DrawBubbleChart: sample =", sampleID);
}

// Show MetaData 
function ShowMetaData(sampleID)
{
    console.log("ShowMetaData: sample =", sampleID);
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
    d3.json("data.json").then((data) => {
        var sampleNames = data.names;
    // create loop to loop through all the sample names in the key names; in our json file and put them in
    // in the dropdown list.
        sampleNames.forEach((sampleID) => {
            selector
            //Here, we have our option coming in as text. We then set the propery to valu
                .append("option")
                .text(sample)
                .property("value", sample);
        })
        
    })
    
    DrawBarGraph(sampleID);
    DrawBubbleChart(sampleID);
    ShowMetaData(sampleID);

}

function optionChanged(newsampleID)
{
    console.log("Dropdown changed to:", newsampleID);
   
    DrawBarGraph(newsampleID);
    DrawBubbleChart(newsampleID);
    ShowMetaData(newsampleID);
}

Init();