let mediaRecorder;
let chunks = [];
let sample = [];
const timeslice = 200;
let totalTime = 0;
let startTime = 0;
let audios = {};

function createPlayer (ancora, url, width, height, cursor) {
    if (width === undefined) {
        width = 154;
    }
    if (height === undefined) {
        height = 30;
    }
    if (cursor === undefined) {
        cursor = true;
    }
    document.getElementById (ancora).innerHTML = '';
    const wavesurfer = WaveSurfer.create({
        container: document.getElementById (ancora),
        waveColor: 'rgb(200,200,200)',
        progressColor: '#808090',
        url: url,
        barWidth: 2,
        barGap: 2,
        barRadius: 2,
        cursorColor: cursor ? '#808090' : '#80809000',
        cursorWidth: 10,
        cursorTop: height / 2 - 5,
        cursorRadius: 5,
        cursorHeight: '10px',
        width: width,
        height: height
    });
    wavesurfer.on ('finish', () => {
        swicthPlaying (ancora);
    })
    audios [ancora] = wavesurfer;
}

let stopRecordingAction = (dados, time) => {};
let sampleRecordingAction = (dados, time) => {};

window.addEventListener ('load', () => {
    navigator.mediaDevices.getUserMedia ({audio: true}).then (
        stream => {
            mediaRecorder = new MediaRecorder (stream);
            mediaRecorder.ondataavailable = (data) => {
                chunks.push (data.data);
                let currentTime = totalTime + tm () - startTime;
                sampleRecordingAction (chunks, currentTime);
            }
            mediaRecorder.onstop = (data) => {
                const blob = new Blob (chunks, {type: 'audio/ogg; code=opus'});
                const reader = new window.FileReader ();
                reader.readAsDataURL (blob);    
                reader.onloadend = () => {
                    totalTime +=  new Date ().getTime () - startTime;
                    stopRecordingAction (reader.result, totalTime);
                };
            }
        }).catch (
        err => {
            loggar ('getUserMedia falhou');
        });
});

function startRec () {
    startTime = tm ();
    totalTime = 0;
    mediaRecorder.start (timeslice);
    chunks = [];
}
function stopRec () {
    mediaRecorder.stop ();
}
function pauseRec () {
    totalTime +=  tm () - startTime;
    mediaRecorder.pause ();
}
function resumeRec () {
    startTime = tm ();
    mediaRecorder.resume ();
}

let playing = false;
function swicthPlaying (ancora) {
    const btn = document.getElementById ('play_pause_btn_' + ancora);
    if (playing) {
        btn.src = 'assets/img/play.svg';
        playing = false;
        audios [ancora].pause ();
    }
    else {
        btn.src = 'assets/img/pause.svg';
        playing = true;
        audios [ancora].play ();
    }
}

function formatTime (ms) {
    s = Math.trunc (ms / 1000);
    let min = Math.trunc (s / 60);
    s -= min * 60;
    let tm = min + ':';
    if (min < 10) tm = '0' + tm;
    if (s < 10) tm += '0';
    tm += s;
    return tm;
}