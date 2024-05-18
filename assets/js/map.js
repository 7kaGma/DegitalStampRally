"use strict";

/*定数と変数*/
let map; 
let watchId;
let latitude;
let longitude;
let pos;
let marker;
let locationMarkerA;
let locationMarkerB;
const initialVal ={lat:35.71003238031915, lng:139.52313091592086};
//法政大図書館
const locationA={lat:35.709443978852676, lng:139.52235862613207};
//江戸東京たてもの園
// const locationA={lat:35.71700572259025, lng:139.51220896072294};
//電大附属
const locationB={lat:35.70649846021312, lng:139.5259753757966};

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
}

/*関数群*/
async function getMap(){
  await initMap();
  setLandmark();
  marker = new google.maps.Marker({
    map: map,
  });
  getPosition();
}

async function initMap(){
  const{Map} =await google.maps.importLibrary("maps");
  map = new Map(document.getElementById("map"), {
    center: initialVal,
    zoom: 16,
  });
}

function getPosition(){
  if ("geolocation" in navigator) {
    watchId = navigator.geolocation.watchPosition(successful, unsuccessful, options);
  }
}

function successful(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  pos = {
    lat: latitude,
    lng: longitude
  };
  console.log(pos);
  marker.setPosition(pos);
  ankerAvailable();
}

function unsuccessful(error) {
  console.error("エラー" + error.name);
  alert(" ページを再読み込みして、位置情報を許可してください")
}

function setLandmark(){
  locationMarkerA= new google.maps.Marker({
    map: map,
    position:locationA
  });
  locationMarkerB= new google.maps.Marker({
    map: map,
    position:locationB
  });
}

function ankerAvailable (){
  let distanceA =Math.round(calcDistance(pos,locationA));
  let distanceB =Math.round(calcDistance(pos,locationB));
  judge(distanceA);
}

function judge(distanceA,distanceB){
  const linkCameraBtn = document.querySelector(".linkCamera__btn");
  if(distanceA<100 || distanceB<100){
  linkCameraBtn.classList.add("active");
  }else{
    linkCameraBtn.classList.remove("active");
    linkCameraBtn.addEventListener("click",(e)=>{
      e.preventDefault();
    })
  }
}

function calcDistance (pos,location){
  const R = Math.PI / 180;
  let lat1 =pos.lat;
  let lng1 =pos.lng;
  let lat2 =location.lat;
  let lng2 =location.lng;
  lat1 *= R;
  lng1 *= R;
  lat2 *= R;
  lng2 *= R;
  return (6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2)))*1000;
}
/*==========
読み込み時処理
==========*/
/*地図の生成と現在位置の取得*/
getMap();


/*==========
イベントハンドラ
==========*/

/*関数群*/