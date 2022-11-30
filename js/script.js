const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = wrapper.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
showMoreBtn = wrapper.querySelector("#more-music"),
hideMusicBtn = musicList.querySelector("#close");






let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;
window.addEventListener("load", ()=>{
         loadMusic(musicIndex);
        playingSong(); 
});



function loadMusic(indexNumb){
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = `covers/${allMusic[indexNumb - 1].img}.jpg`;
  mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}


function playMusic(){
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause_circle";
  mainAudio.play();
}



function pauseMusic(){
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_circle";
  mainAudio.pause();
}



function prevMusic(){
  musicIndex--;
  musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
         loadMusic(musicIndex);
         playMusic();
         playingSong(); 
}




function nextMusic(){
  musicIndex++; 
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
          loadMusic(musicIndex);
         playMusic();
         playingSong(); 
}



    playPauseBtn.addEventListener("click", ()=>{
     const isMusicPlay = wrapper.classList.contains("paused");


    isMusicPlay ? pauseMusic() : playMusic();
         playingSong();
});




    prevBtn.addEventListener("click", ()=>{
         prevMusic();
});




    nextBtn.addEventListener("click", ()=>{
         nextMusic();
});



    mainAudio.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime;
  const duration = e.target.duration; 
     let progressWidth = (currentTime / duration) * 100;
        progressBar.style.width = `${progressWidth}%`;
            let musicCurrentTime = wrapper.querySelector(".current"),
                     musicDurration = wrapper.querySelector(".duration");
    mainAudio.addEventListener("loadeddata", ()=>{
  

    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
             if(totalSec < 10){ 
                  totalSec = `0${totalSec}`;
    }
                     musicDurration.innerText = `${totalMin}:${totalSec}`;
  });


  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){ 
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});


progressArea.addEventListener("click", (e)=>{
  let progressWidth = progressArea.clientWidth; 
  let clickedOffsetX = e.offsetX; 
  let songDuration = mainAudio.duration; 
  
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
         playMusic(); 
         playingSong();
});

const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", ()=>{
  let getText = repeatBtn.innerText; 

  switch(getText){
    case "repeat":

      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;

    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffled");
      break;

    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
});

mainAudio.addEventListener("ended", ()=>{

  let getText = repeatBtn.innerText; 
  switch(getText){
    case "repeat":
      nextMusic(); 
      break;
    case "repeat_one":
    mainAudio.currentTime = 0; 
         loadMusic(musicIndex); 
         playMusic(); 
      break;
    case "shuffle":

      let randIndex = Math.floor((Math.random() * allMusic.length) + 1); 


      do{
        randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      }while(musicIndex == randIndex); 

      musicIndex = randIndex;
      loadMusic(musicIndex);
      playMusic();
      playingSong();
      break;
  }
});

showMoreBtn.addEventListener("click", ()=>{

  musicList.classList.toggle("show");
});

hideMusicBtn.addEventListener("click", ()=>{
    showMoreBtn.click();
});

const ulTag = wrapper.querySelector("ul");

for (let i = 0; i < allMusic.length; i++) {
 
  let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusic[i].name}</span>
                  <p>${allMusic[i].artist}</p>
                </div>
                <span id="${allMusic[i].src}" class="audio-duration">1:33</span>
                <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
              </li>`;


  ulTag.insertAdjacentHTML("beforeend", liTag);


  let liAudioDurrationTag = ulTag.querySelector(`#${allMusic[i].src}`);

  let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

  liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10){ 
      totalSec = `0${totalSec}`;
    };

    liAudioDurrationTag.innerText = `${totalMin}:${totalSec}`; 

    liAudioDurrationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`); 
  });
}

        function playingSong(){
  const allLiTag = ulTag.querySelectorAll("li");
  
  for (let j = 0; j < allLiTag.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");
    
    if(allLiTag[j].classList.contains("Tocando")){
      allLiTag[j].classList.remove("Tocando");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }
   
    if(allLiTag[j].getAttribute("li-index") == musicIndex){
      allLiTag[j].classList.add("Tocando");
      audioTag.innerText = "Tocando";
    }
    allLiTag[j].setAttribute("onclick", "clicked(this)");
  }
}

        function clicked(element){
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
                loadMusic(musicIndex);
                playMusic();
                playingSong();
}