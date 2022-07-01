prediction1="";
prediction2="";

Webcam.set({
    width:300,
    height:320,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="imagecap" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6yrldzudu/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded !!');
}

function speak(){
    var cookie=window.speechSynthesis;
    speak1="Your First Prediction: "+prediction1;
    speak2="Your Second Prediction:  "+prediction2;
    var simonsays=new SpeechSynthesisUtterance(speak1+speak2);
    cookie.speak(simonsays);
}

function check(){
    img=document.getElementById("imagecap");
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
        else{
            console.log(results);
            document.getElementById("resultemotion1").innerHTML=results[0].label;
            document.getElementById("resultemotion2").innerHTML=results[1].label;
            prediction1=results[0].label;
            prediction2=results[1].label;
            speak();
            if(prediction1=="Happy"){
                document.getElementById("resultemoji1").innerHTML="&#128512";
            }
            if(prediction1=="Mad"){
                document.getElementById("resultemoji1").innerHTML="&#128520";
            }
            if(prediction1=="Sad"){
                document.getElementById("resultemoji1").innerHTML="&#128546";
            }
            if(prediction2=="Happy"){
                document.getElementById("resultemoji2").innerHTML="&#128578";
            }
            if(prediction2=="Mad"){
                document.getElementById("resultemoji2").innerHTML="&#128545";
            }
            if(prediction2=="Sad"){
                document.getElementById("resultemoji2").innerHTML="&#128557";
        }
    }
    }
