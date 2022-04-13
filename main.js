status1 = "";
inputid = "";
objects = [];

function setup() {
    canvas = createCanvas(480, 480);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(480, 480);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modalLoaded);
    document.getElementById("Status").innerHTML = "Status : object is detecting";
    inputid = document.getElementById("object").value;
}

function modalLoaded() {
    console.log("modal is loaded");
    status1 = true;
}

function draw() {
    image(video, 0, 0, 480, 480);
    if (status1 != "") {
        objectDetector.detect(video, gotResults);

        document.getElementById("Status").innerHTML = "Object is detecting";

        for (i = 0; i < objects.length; i++) {
            fill("#00FF00");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);

            noFill();
            stroke("#00FF00");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].length);

            if (objects[i].label == inputid) {
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("object_status").innerHTML = inputid + "Found";

                synth = window.speechSynthesis;
                Utterthis = new SpeechSynthesisUtterance(inputid + "found");

                synth.speak(Utterthis);
            }else{
                document.getElementById("object_status").innerHTML = inputid + "Not found"; 
                
                synth = window.speechSynthesis;
                Utterthis = new SpeechSynthesisUtterance(inputid + "Not found");

                synth.speak(Utterthis);
            }
        }
    }
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}