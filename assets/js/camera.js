"use strict";
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const photoFrame =document.getElementById("photoFrame");
let facemode =true;
let mode;
let setting;
const frameMaterial=[
  {url:"zunko1.png"}
];

// ビデオカメラの取得

async function initVideoCamera() {
  modejude();
  navigator.mediaDevices.getUserMedia({ 
    video:{
      facingMode:mode},
    audio: false, 
  })
  .then((stream) => {
      video.srcObject = stream;
      video.play();
      const videoTrack = stream.getVideoTracks()[0];
      setting = videoTrack.getSettings();
      console.log(setting);
      photoFrameSet();
    }).catch((error) => {
      alert("カメラにアクセスできません")
      console.error("失敗");
  })
}

function photoFrameSet(){
  console.log(photoFrame);
  const context =photoFrame.getContext("2d");
  /*canvasのセット*/
  const screen = video.getBoundingClientRect();
  const screenwidth = screen.width;
  console.log(screenwidth);
  const ratio = setting.aspectRatio;
  console.log(ratio);
  photoFrame.width=screenwidth;
  photoFrame.height=Math.round(screenwidth/ratio);
  /*Frameの描画*/
  const path =` ./assets/img/${frameMaterial[0].url}`;
  const frameImage= new Image();
  frameImage.src=path;
  console.log(frameImage);
  const x = photoFrame.width-155;
  const y = photoFrame.height-200;

  frameImage.onload=()=>{
    context.drawImage(frameImage,x,y,155,200);
  };
}

// facemodeの制御
function modejude(){
  if(facemode){
    mode = 'user';
  }else if (!facemode){
    mode =  { exact: 'environment' };
  }
}

// 写真の撮影
const photograph =document.getElementById('photograph'); 
const synthesis  =document.getElementById('synthesis');


function capture(){
  const context =canvas.getContext("2d");
  const screen = video.getBoundingClientRect();
  const screenwidth = screen.width;
  const ratio = setting.aspectRatio;
  console.log(ratio);
  canvas.width=screenwidth;
  canvas.height=Math.round(screenwidth/ratio);
  context.drawImage(video,0,0,canvas.width,canvas.height);

  const photoFrame =document.getElementById('photoFrame');

  const resultContext=synthesis.getContext("2d");
  synthesis.width=screenwidth;
  synthesis.height=Math.round(screenwidth/ratio);
  const canvasSelector =document.querySelectorAll('.canvasSelector');

  canvasSelector.forEach((canvas)=>{
    resultContext.drawImage(canvas, 0, 0, synthesis.width, synthesis.height);
  });
  
  const dataURL =synthesis.toDataURL("image/png");
  photograph.src=dataURL;
}

// ビデオの停止処理
function stopVideo(video){
let streaming = video.srcObject;
let tracks =streaming.getTracks();
tracks.forEach((track)=>{
  track.stop();
})
console.log('CameraStop');
}

/*==========
処理
==========*/
initVideoCamera();

/*==========
イベントハンドラ
==========*/
/*撮影ボタン*/
document.getElementById("photo").addEventListener('click',function(){
  document.querySelector(".postProcess").classList.add('active');
  capture();
});

/*switchボタン*/
document.getElementById('switchBtn').addEventListener('click',()=>{
  stopVideo(video);//ビデオの停止処理
  if(facemode){
    facemode=false;
  }else{
    facemode=true;
  }
  console.log(facemode);
  modejude();
  initVideoCamera();//カメラの表示処理
});

/*画像の保存*/
const downloadBtn =document.getElementById('download');
downloadBtn.addEventListener('click',()=>{
const imgSrc =photograph.src;
downloadBtn.href=imgSrc;
downloadBtn.download ='image.png'
});

/*カメラに戻る*/
document.querySelector('.backCamera').addEventListener('click',()=>{
  document.querySelector(".postProcess").classList.remove('active');
});