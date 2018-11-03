import {data} from "./keywords.js";
var text = "",
    parsed = {};

window.addEventListener("DOMContentLoaded", function()
{

    document.getElementById('input').addEventListener('change', readSingleFile, false);

    document.getElementById("start-btn").onclick = function()
    {
        var tmp = text;
        text = "";
        for(var i=0;i<tmp.length;++i) {
            text+=tmp[i];
            parseText();
        }
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
    var foundInd = -1;
    for (var i = 0;i<data.length;++i)
    {
        var el = data[i];
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
                    res = i;
                    label = el.label;
                    foundInd = ind;
                }
            }
        });
        if (res!=-1) {
            data.splice(res, 1);

            text.replace(keyword, "");
            var val = text.substring(0, foundInd);
            console.log({label: label, keyword: keyword, index: res, val});
            text.replace(val, "");
            // console.log(data);
            return;
        }
        console.log("not found");
    }
    text = originalText;
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
