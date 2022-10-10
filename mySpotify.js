console.log("welcome to spotify")


// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('mysong/1.mp3')
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    { songName: "Childhood", filePath: "mysong/1.mp3", coverPath: "mylogo/c1.jpg" },
    { songName: "Khalouni Neiche", filePath: "mysong/2.mp3", coverPath: "mylogo/kn1.jpg" },
    { songName: "Mitti De Tibbe", filePath: "mysong/3.mp3", coverPath: "mylogo/k1.jpg" },
    { songName: "Moon Rise", filePath: "mysong/4.mp3", coverPath: "mylogo/m1.jpg" },
    { songName: "Na Ja", filePath: "mysong/5.mp3", coverPath: "mylogo/n1.jpg" },
    { songName: "Nazar", filePath: "mysong/6.mp3", coverPath: "mylogo/n1.jpeg" },
    { songName: "Rollin", filePath: "mysong/7.mp3", coverPath: "mylogo/r1.jpg" },
    { songName: "Safari", filePath: "mysong/8.mp3", coverPath: "mylogo/s1.jpg" }
]
songItems.forEach((element, i) => {
    // console.log(element ,i)
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
// audio element.play();
// handle play pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity = 0;
    }
})
// Listen to events 
audioElement.addEventListener('timeupdate', () => {
    // console.log('timeupdate')
    // update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(progress);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})


const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');

    })
}
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        // console.log(e.target);
        makeAllPlays();

        masterSongName.innerText = songs[songIndex].songName
        songIndex = parseInt(e.target.id);
        e.target.classList.add('fa-circle-pause')
        audioElement.src = `mysong/${songIndex + 1}.mp3`;
        e.target.classList.remove('fa-circle-play')
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 7) {
        songIndex = 0
    }
    else {

        songIndex += 1;
    }
    audioElement.src = `mysong/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})



document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {

        songIndex -= 1;
    }
    audioElement.src = `mysong/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})