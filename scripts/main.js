import {data} from "./keywords.js";
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
    var originalText = text;
    text = text.toLowerCase();
    console.log("parsing ...");
    var mxLen = 0;
    var res = -1;
    var word = "";
    var keyword = "";
    var label = "";
    var ind;

    data.forEach(function(el)
    {
        el.data.forEach(function(keywordOriginal)
        {
            keyword = keywordOriginal.toLowerCase();
            ind = text.indexOf(keyword);
            if (ind!=-1)
            {
                if (mxLen<keyword.length)
                {
                    mxLen = keyword.length;
                    word = keyword;
                    res = ind;
                    label = el.label;
                }
            }
            console.log(1);
        });
        if (res!=-1) {
            console.log("asd");
            return;
        }
    });
    text = originalText;
    console.log(label);
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
