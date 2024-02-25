video="";
status = "";
objects=[];
function preload() 
{
    
}

function setup() 
{
    canvas = createCanvas(350 , 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw() 
{
    image(video, 0, 0, 350, 380);
      if(status != "")  //means if status is true (or false) then exexute following statements
      {
        objectDetector.detect(video, gotResult); 
        for (i = 0; i < objects.length; i++) {  
          document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
 
          fill("#FF0000"); 
          percent = floor(objects[i].confidence * 100);  
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);  
          noFill();  
          stroke("#FF0000");  
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
if(objects[i].label == object_name)
{
    document.getElementById("status").innerHTML = object_name + " Found!";   
}

else{
    document.getElementById("status").innerHTML = object_name + " Not Found!";   
}
        }
      }
}
function gotResult(error, results) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    objects = results; 
  }


function modelLoaded() 
{
    console.log("Model Loaded!");
    status = true;
}

function start() 
{
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects";
    object_name = document.getElementById("input").value;
}
