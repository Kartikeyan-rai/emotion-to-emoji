Webcam.set({
    height:300,
    width:350,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach( '#camera' );
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
};
console.log('ml5 version',ml5.version);
clasierfier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/jWqhCEmA7/model.json',modelLoaded);
function modelLoaded(){
    console.log('model loaded');
}
function talk(){
    synth=window.speechSynthesis;
    speak_data_1="The First Prediction is "+prediction_1;
    speak_data_2="And The second prediction is "+prediction_2;
    utterthis=new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterthis);
}
function check(){
    img=document.getElementById("captured_image");
    clasierfier.classify(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        prediction_1=results[0].label;
        prediction_2=results[1].label;

        talk();
        if(prediction_1=="Happy"){
            document.getElementById("update_emoji1").innerHTML="&#128522;";
            document.getElementById("result_emotion_name_1").innerHTML="Happy";
        }
        if(prediction_1=="Sab"){
            document.getElementById("update_emoji1").innerHTML="&#128532;";
            document.getElementById("result_emotion_name_1").innerHTML="Sad";
        }
        if(prediction_1=="angry"){
            document.getElementById("update_emoji1").innerHTML="&#128548;";
            document.getElementById("result_emotion_name_1").innerHTML="Angry";
        }
        if(prediction_2=="Happy"){
            document.getElementById("update_emoji2").innerHTML="&#128522;";
            document.getElementById("result_emotion_name_2").innerHTML="Happy";
        }
        if(prediction_2=="Sab"){
            document.getElementById("update_emoji2").innerHTML="&#128532;";
            document.getElementById("result_emotion_name_2").innerHTML="Sad";
        }
        if(prediction_2=="angry"){
            document.getElementById("update_emoji2").innerHTML="&#128548;";
            document.getElementById("result_emotion_name_2").innerHTML="Angry";
        }

    }
}