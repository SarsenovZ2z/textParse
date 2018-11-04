import {data as dataOriginal} from "./keywords.js";
// integrate
var text = "",
    buffer = "",
    prevData = {index: -1},
    data = [],
    parsed = [];

window.addEventListener("DOMContentLoaded", function()
{
    document.getElementById('input').addEventListener('change', readSingleFile, false);

    document.getElementById("start-btn").onclick = function()
    {
        // google response event handler
        // integrate
        data = dataOriginal;
        parseText();
        updateFront();
    }

});

// integrate
// handle google response
function parseText()
{
    console.log("parsing ...");
    var tmp = "";
    for (var i = 0;i<text.length;++i)
    {
        buffer+=text[i];
        if (text[i]!=' ')
        {
            var curr = tryToGetKeyWord();
            if (curr.index!=-1)
            {
                if (prevData.index!=-1)
                {
                    tmp = buffer.substr(0, curr.position);
                    parsed.push(getNormalizedValue(tmp));
                    buffer = buffer.replace(tmp, '');
                }
                prevData = curr;
            }
        }
    }
    parsed.push(getNormalizedValue(buffer));
    console.log(parsed);
}

// integrate
function tryToGetKeyWord()
{
    var maxLen = 0;
    var dataIndex = -1;
    var ind = -1;
    var position = -1;
    var tmp = "";

    for (var i = 0;i<data.length;++i)
    {
        var el = data[i];
        el.data.forEach(function(keyword)
        {
            ind = buffer.toLowerCase().indexOf(keyword.toLowerCase());
            if (ind!=-1)
            {
                if (maxLen < keyword.length)
                {
                    position = ind;
                    maxLen = keyword.length;
                    dataIndex = i;
                }
            }
        });
    }
    if (dataIndex!=-1)
    {
        tmp = data[dataIndex].data.slice();
        data.splice(dataIndex, 1);
    }
    return {keywords: tmp, index: dataIndex, position: position};
}

// integrate
function getNormalizedValue(value)
{
    var maxLen = 0;
    var maxKeyWord = "";
    var ind;

    for (var i in prevData.keywords)
    {
        var keyword = prevData.keywords[i];
        ind = value.toLowerCase().indexOf(keyword.toLowerCase());
        if (ind!=-1)
        {
            if (maxLen<keyword.length)
            {
                maxLen = keyword.length;
                maxKeyWord = keyword;
            }
        }
    }
    return {keyword: maxKeyWord, value: value.toLowerCase().replace(maxKeyWord.toLowerCase(), '').replace(/^\s+|\s+$/gm,'')};
}

// integrate
function getParsedText()
{
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
