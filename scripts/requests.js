window.addEventListener("DOMContentLoaded", function() {
    var file = document.getElementById("file");
    var sendBtn = document.getElementById("sendBtn");

    sendBtn.onclick = cloud;
    function cloud() {
        console.log("sending to google cloud ...");
        console.time("cloud");
        if (!file.files[0])
        {
            console.log("File not chosen!");
            return;
        }
        var url = "https://www.googleapis.com/upload/storage/v1/b/speech-project-458/o?uploadType=media&name=testJs.flac";
        var data = new FormData();
        data.append("file", file.files[0]);
        data.append("uploadType", "media");
        data.append("name", "testJs.flac");

        var req = new XMLHttpRequest();
        req.withCredentials = true;
        req.onreadystatechange = function() {
            if (this.readyState === 4) {
                console.log("sent.");
                console.timeEnd("cloud");
                speech(JSON.parse(req.responseText)['name']);
            }
        };
        // req.setRequestHeader("", "");
        req.open("POST", url);
        req.send(data);
    };

    function speech(name) {
        console.time("speech");
        console.log("sending to google speech ...");
        var data = JSON.stringify({
          "audio": {
            "uri": "gs://speech-project-458/"+name
          },
          "config": {
            "enableAutomaticPunctuation": true,
            "languageCode": "ru-RU",
            "sampleRateHertz": 16000,
            "encoding": "FLAC",
          }
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
              console.timeEnd("speech");
              console.time("text");
              getText(JSON.parse(xhr.responseText)['name']);
          }
        });

        xhr.open("POST", "https://speech.googleapis.com/v1/speech:longrunningrecognize?key=AIzaSyBuKK7PR3RR0eheOHnIVBhWkzCDZSNfyJg");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.send(data);
    }

    function getText(name)
    {
        console.log("requesting text ...");
        var data = null;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
              if (JSON.parse(xhr.responseText)['done']) {
                  console.timeEnd("text");
                  console.log(JSON.parse(this.responseText));
              }
              else {
                  window.setTimeout(function() {
                      console.log("Not YET!");
                      getText(name);
                  }, 3000);
              }
          }
        });

        xhr.open("GET", "https://speech.googleapis.com/v1/operations/"+name+"?key=AIzaSyBuKK7PR3RR0eheOHnIVBhWkzCDZSNfyJg");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.send(data);
    }
});
