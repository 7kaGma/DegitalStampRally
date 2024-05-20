'use strict';

const mapBtn=document.getElementById("mapBtn");
const mainBtn=document.getElementById("mainBtn");

document.addEventListener('DOMContentLoaded',()=>{
  if(window.location.pathname.endsWith("/map.html")){
    mapBtn.addEventListener('click',preventDefaultHandler);
    mainBtn.removeEventListener('click',preventDefaultHandler);
    mapBtn.classList.add('aBtnActive');
    mainBtn.classList.remove('aBtnActive');
  }else if(window.location.pathname.endsWith("/main.html")){
    mainBtn.addEventListener('click',preventDefaultHandler);
    mapBtn.removeEventListener('click',preventDefaultHandler);
    mainBtn.classList.add('aBtnActive');
    mapBtn.classList.remove('aBtnActive');
  }
});

function preventDefaultHandler(e){
  e.preventDefault();
}
