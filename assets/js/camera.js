"use strict";
"use strict";
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
let facemode =true;
let mode;
let setting;

// ビデオカメラの取得
function initVideoCamera() {
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
    }).catch((error) => {
      alert("カメラにアクセスできません")
  })
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
function capture(){
  const context =canvas.getContext("2d");
  const screen = video.getBoundingClientRect();
  const screenwidth = screen.width;
  console.log(screenwidth);
  const ratio = setting.aspectRatio;
  console.log(ratio);
  canvas.width=screenwidth;
  canvas.height=Math.round(screenwidth/ratio);
  context.drawImage(video,0,0,canvas.width,canvas.height);
  const dataURL =canvas.toDataURL("image/png");
  photograph.src=dataURL
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