//get elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullBtn = player.querySelector(".full__button");

//build functions
function togglePlay(){
    const method = video.paused ? "play" : "pause";
    video[method]();

    /* work the same as below 
    if(video.paused){
        video.play();
    }
    else{
        video.pause();
    }
    */
}

function updateButton(){
    const icon = this.paused ?  '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    //playback rate or volume
    video[this.name] = this.value;
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function toggleFull(){
    player.webkitRequestFullScreen();
}

//hook up event listeners

//play and puse vid
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);

//for play/pause icon change
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

//skip
skipButtons.forEach(button => button.addEventListener("click", skip));

//handle slider change
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));

//update progress bar
video.addEventListener("timeupdate", handleProgress);

let mousedown = false;

//scrub progress
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);

//fullscreen btn
fullBtn.addEventListener("click", toggleFull);