const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const current = document.querySelector("#current");
const duration = document.querySelector("#duration");

// Song titles
const songs = ["Forest Walk", "Adventure", "Uplifting"];

// Keep track of song
let songIndex = 0;

//start wavesurfer object
var wavesurfer = WaveSurfer.create({
  container: "#wave",
  waveColor: "#cdedff",
  progressColor: "#343f53",
  height: 48,
  scrollParent: false,
  loopSelection: true,
});

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  //load audio file
  wavesurfer.load(`audio/${song}.mp3`);

  title.textContent = song;

  //load image jpg
  cover.src = `images/${song}.jpg`;
}

//get duration & currentTime for Time of song
var timeCalculator = function (value) {
  second = Math.floor(value % 60);
  minute = Math.floor((value / 60) % 60);

  if (second < 10) {
    second = "0" + second;
  }

  return minute + ":" + second;
};

// Play song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  wavesurfer.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  wavesurfer.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  wavesurfer.empty();
  loadSong(songs[songIndex]);

  pauseSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  wavesurfer.empty();
  loadSong(songs[songIndex]);

  pauseSong();
}

// Event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

//load audio duration on load
wavesurfer.on("ready", function (e) {
  duration.textContent = timeCalculator(wavesurfer.getDuration());
});

//get updated current time on play
wavesurfer.on("audioprocess", function (e) {
  current.textContent = timeCalculator(wavesurfer.getCurrentTime());
});

//update current time on seek
wavesurfer.on("seek", function (e) {
  current.textContent = timeCalculator(wavesurfer.getCurrentTime());
});
