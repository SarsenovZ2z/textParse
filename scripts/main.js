var text = "",
    parsed = {};

window.addEventListener("DOMContentLoaded", function()
{

    document.getElementById('input').addEventListener('change', readSingleFile, false);

    document.getElementById("start-btn").onclick = function()
    {
        parseText();
        updateFront();
    }

});

function parseText()
{
    console.log("parsing ...");
    // TODO: parse text

    

    console.log("success!");
}

function getParsedText()
{
    // TODO: return html
    return text;
}

function updateFront()
{
    console.log("updating ...");
    document.getElementById('original').innerHTML = text;
    document.getElementById('parsed').innerHTML = getParsedText();
    console.log("success!");
}

function readSingleFile(e)
{
    var file = e.target.files[0];
    if (!file)
    {
        alert("Something went wrong:()");
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e)
    {
        text = e.target.result;
    };
    reader.readAsText(file);
}
