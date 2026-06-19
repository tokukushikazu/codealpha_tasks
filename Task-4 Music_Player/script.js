const audio = document.getElementById("audio");

const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");

const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

const volume = document.getElementById("volume");

const playlist = document.getElementById("playlist");

const songs = [
{
    title:"Stereo Love",
    artist:"Edward Maya & Vika Jigulina",
    file:"songs/Stereo Love.mp3"
},
{
    title:"Highway To Hell",
    artist:"AC/DC",
    file:"songs/Highway To Hell.mp3"
},

{
    title:"Beat It",
    artist:"Michael Jackson",
    file:"songs/Beat It.mp3"
},

{
    title:"Billie Jean",
    artist:"Michael Jackson",
    file:"songs/Billie Jean.mp3"
},

{
    title:"I Was Made For Loving You",
    artist:"KISS",
    file:"songs/I Was Made For Loving You.mp3"
}

];
 
let currentSong = 0;

loadSong(currentSong);

function loadSong(index){

    audio.src = songs[index].file;

    title.textContent = songs[index].title;

    artist.textContent = songs[index].artist;
}

function playSong(){

    audio.play();

    playBtn.textContent = "⏸";
}

function pauseSong(){

    audio.pause();

    playBtn.textContent = "▶";
}

playBtn.addEventListener("click", ()=>{

    if(audio.paused){
        playSong();
    }
    else{
        pauseSong();
    }

});

nextBtn.addEventListener("click", ()=>{

    currentSong++;

    if(currentSong >= songs.length){
        currentSong = 0;
    }

    loadSong(currentSong);

    playSong();
});

prevBtn.addEventListener("click", ()=>{

    currentSong--;

    if(currentSong < 0){
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);

    playSong();
});

audio.addEventListener("loadedmetadata", ()=>{

    progress.max = audio.duration;

    durationEl.textContent =
        formatTime(audio.duration);
});

audio.addEventListener("timeupdate", ()=>{

    progress.value = audio.currentTime;

    currentTimeEl.textContent =
        formatTime(audio.currentTime);
});

progress.addEventListener("input", ()=>{

    audio.currentTime = progress.value;
});

function formatTime(time){

    let minutes = Math.floor(time / 60);

    let seconds = Math.floor(time % 60);

    if(seconds < 10){
        seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
}

volume.addEventListener("input", ()=>{

    audio.volume = volume.value;
});

/* Playlist */

songs.forEach((song,index)=>{

    const li = document.createElement("li");

    li.textContent =
        song.title + " - " + song.artist;

    li.addEventListener("click", ()=>{

        currentSong = index;

        loadSong(currentSong);

        playSong();
    });

    playlist.appendChild(li);
});

/* Autoplay Next Song */

audio.addEventListener("ended", ()=>{

    currentSong++;

    if(currentSong >= songs.length){
        currentSong = 0;
    }

    loadSong(currentSong);

    playSong();
});