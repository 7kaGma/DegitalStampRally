"use strict";
"use strict";
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");

let setting;

// ビデオカメラの取得
function initVideoCamera() {
  
  navigator.mediaDevices.getUserMedia({ 
    video:{
      facingMode:'user'},
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
  document.getElementById("photograph").src=dataURL
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