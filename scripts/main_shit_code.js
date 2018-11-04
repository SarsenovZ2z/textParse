import {data} from "./keywords.js";
var text = "",
    prevKeyWord = "",
    parsed = [];

window.addEventListener("DOMContentLoaded", function()
{

    document.getElementById('input').addEventListener('change', readSingleFile, false);

    document.getElementById("start-btn").onclick = function()
    {
        var tmp = text;
        prevKeyWord = "";
        text = "";
        for(var i=0;i<tmp.length;++i) {
            text+=tmp[i];
            if (tmp[i]!=' ')
                parseText();
        }
        parseText();
        // parsed.push({keyword: prevKeyWord, index: 100, value: prevKeyWord + " " + text});
        text = tmp;
        console.log(text);
        updateFront();
    }

});

function responseEventListener()
{
    var tmp = text;
    var tmpData = data;
    prevKeyWord = "";
    text = "";
    for(var i=0;i<tmp.length;++i)
    {
        text+=tmp[i];
        if (tmp[i]!=' ')
        {
            parseText();
        }
    }
    parseText();
    // parsed.push({keyword: prevKeyWord, index: 100, value: prevKeyWord + " " + text});
    text = tmp;
    data = tmpData;
    updateFront();
}

function getKeyWordFromText(str)
{
    var s = str.toLowerCase();

    var mxLen = 0;
    var word = "";
    var keyword = "";
    var ind;
    var res = -1;
    for (var i = 0;i<data.length;++i)
    {
        var el = data[i];
        el.data.forEach(function(keywordOriginal)
        {
            keyword = keywordOriginal.toLowerCase();
            ind = s.indexOf(keyword);
            if (ind!=-1)
            {
                if (mxLen<keyword.length)
                {
                    mxLen = keyword.length;
                    word = keyword;
                    res = i;
                }
            }
        });
    }
    return {index: res, keyword: word};
}


function parseText()
{
    var originalText = text;
    text = text.toLowerCase();
    text = text.replace(/^\s+|\s+$/gm,'');
    // console.log("parsing ...");
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
        if (res!=-1)
        {
            data.splice(res, 1);

            text = text.replace(word, "");
            var val = text.substring(0, foundInd-1);
            if (prevKeyWord.length)
            {
                parsed.push({keyword: prevKeyWord, index: res, value: prevKeyWord + " " + val});
                // console.log(prevKeyWord + ": " + val);
            }
            text = text.replace(val, "");
            prevKeyWord = word;
            // console.log(data);
            return;
        }
        // console.log("not found");
    }
    // text = originalText;
}

function getParsedText()
{
    // console.log(parsed);
    var parsedText = "";
    parsedText+="<table class='table table-striped'>";
    parsedText+="<thead>";
    parsedText+="<tr>";
    parsedText+="</tr>";
    parsedText+="<td>";
    parsedText+="Keyword";
    parsedText+="</td>";
    parsedText+="<td>";
    parsedText+="Value";
    parsedText+="</td>";
    parsedText+="</thead>";
    parsedText+="<tbody>";
    // console.log(parsed);
    parsed.forEach(function(el) {
        parsedText+="<tr>";
        parsedText+="<td>";
        parsedText+=el.keyword;
        parsedText+="</td>";
        parsedText+="<td>";
        // var t = getMxKeyWord(el.);
        parsedText+=el.value.replace(getKeyWordFromText(el.value).keyword, '');
        parsedText+="</td>";
    });
    parsedText+="</tbody>";
    parsedText+="</table>";
    return parsedText;
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
