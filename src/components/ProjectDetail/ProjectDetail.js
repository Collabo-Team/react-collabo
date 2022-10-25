import { useHistory, useParams } from 'react-router-dom';
import { useProject } from '../../hooks/useProject';
import { checkAuth } from '../../services/auth';
import {
  getProject,
  getTrack,
  updateTrack,
  updateTrackInRealtime,
  uploadAudio,
} from '../../services/calls';
import WaveformPlaylist from 'waveform-playlist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop, faMicrophone } from '@fortawesome/free-solid-svg-icons';

import './ProjectDetail.css';

export default function ProjectDetail() {
  const { id } = useParams();
  // const history = useHistory();
  // const { projectDetail, setProjectDetail, loading, error, setError } = useProject(id);
  // if (loading) return <h1>Loading...</h1>;
  // if (error) return <h1>{error}</h1>;

  // const handleSubmit = async () => {
  //   console.log('update post called');
  //   try {
  //     await updateP(postDetail.id, postDetail.title, postDetail.description);
  //     history.push('/');
  //   } catch (e) {
  //     setError(e.message);
  //   }
  // };

  // checkAuth();

  // // eslint-disable-next-line no-undef, new-cap
  // const playlist = WaveformPlaylist(
  //   {
  //     container: document.getElementById('playlist'),
  //     samplesPerPixel: 1000,
  //     waveHeight: 100,
  //     timescale: true,
  //     state: 'cursor',
  //     // seekStyle: 'line',
  //     isAutomaticScroll: true,
  //     colors: {
  //       waveOutlineColor: '#c78283',
  //     },
  //     zoomLevels: [128, 256, 512, 1000],
  //     controls: {
  //       show: true,
  //       width: 220,
  //     },
  //   });

  // // HORIZONTAL SCROLLING INSIDE WAVEFORM
  // const container = document.querySelector('.playlist-tracks');
  // container.addEventListener('wheel', function(e) {
  //   if (e.deltaY > 0) {
  //     container.scrollLeft += 100;
  //     e.preventDefault();
  //   } else {
  //     container.scrollLeft -= 100;
  //     e.preventDefault();
  //   }
  // });

  // // RENDER PROJECT
  // function renderProject(project) {
  //   const div = document.createElement('div');

  //   const h2 = document.createElement('h2');
  //   h2.classList.add('project-name');

  //   const metadataDiv = document.createElement('div');
  //   metadataDiv.classList.add('track-metadata');

  //   const genre = document.createElement('p');
  //   const tempo = document.createElement('p');
  //   const timeSignature = document.createElement('p');
  //   const key = document.createElement('p');

  //   h2.textContent = project.name;
  //   genre.textContent = project.genre;
  //   tempo.textContent = `${project.tempo} bpm`;
  //   timeSignature.textContent = project.time_signature;
  //   key.textContent = project.musical_key;

  //   metadataDiv.append(genre, tempo, timeSignature, key);
  //   div.append(h2, metadataDiv);
  //   return div;
  // }

  // const projectContainer = document.getElementById('project-container');

  // let project = null;

  // // UPLOAD TRACK FORM
  // const uploadForm = document.getElementById('upload-form');

  // function downloadBlob(blob, instrument) {
  //   const a = document.createElement('a');
  //   const url = window.URL.createObjectURL(blob);
  //   a.href = url;
  //   a.download = project.name + '-' + instrument + '.mp3';
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  // }

  // async function downloadTrack(track) {
  //   const response = await getTrack(track.folder);
  //   const blob = response.data;
  //   downloadBlob(blob, track.instrument);
  // }

  // const downloadButton = document.getElementById('download-button');
  // downloadButton.addEventListener('click', async () => {
  //   project = await getProject(id);
  //   Promise.all(project.tracks.map(downloadTrack));
  // });

  // const params = new URLSearchParams(window.location.search);
  // async function loadDetails() {
  //   projectContainer.textContent = '';
  //   project = await getProject(id);
  //   const projectDisplay = renderProject(project);
  //   projectContainer.append(projectDisplay);
  //   await displayTracks(project.tracks);

  //   uploadForm.addEventListener('submit', async (e) => {
  //     e.preventDefault();
  //     const formData = new FormData(uploadForm);

  //     const trackUpload = {
  //       instrument: formData.get('instrument'),
  //     };

  //     const audioFile = formData.get('audio-input');
  //     if (audioFile.size) {
  //       const audioName = `${project.id}/${Math.floor(Math.random() * 1000000)}${audioFile.name}`;
  //       const url = await uploadAudio('files-bucket', audioName, audioFile);
  //       trackUpload.folder = audioName;
  //       trackUpload.url = url;
  //       trackUpload.project_id = project.id;
  //       await updateTrack(trackUpload);
  //     }
  //     uploadForm.reset();
  //   });
  // }

  // loadDetails();

  // var userMediaStream;
  // const constraints = { audio: true };

  // navigator.getUserMedia =
  //   navigator.getUserMedia ||
  //   navigator.webkitGetUserMedia ||
  //   navigator.mozGetUserMedia ||
  //   navigator.msGetUserMedia;

  // function gotStream(stream) {
  //   userMediaStream = stream;
  //   playlist.initRecorder(userMediaStream);
  // }

  // function logError(err) {
  //   console.error(err);
  // }

  // //initialize the WAV exporter.
  // playlist.initExporter();

  // if (navigator.mediaDevices) {
  //   navigator.mediaDevices.getUserMedia(constraints).then(gotStream).catch(logError);
  // } else if (navigator.getUserMedia && 'MediaRecorder' in window) {
  //   navigator.getUserMedia(constraints, gotStream, logError);
  // }

  // const playButton = document.getElementById('play-button');
  // const pauseButton = document.getElementById('pause-button');
  // const stopButton = document.getElementById('stop-button');
  // const recordButton = document.getElementById('record-button');

  // const ee = playlist.getEventEmitter();

  // async function displayTracks(tracks) {
  //   const loadList = [];
  //   for (const track of tracks) {
  //     loadList.push({ src: track.url, name: track.instrument });
  //   }

  //   await playlist.load(loadList);

  //   playButton.addEventListener('click', () => {
  //     ee.emit('play');
  //   });

  //   pauseButton.addEventListener('click', () => {
  //     ee.emit('pause');
  //   });

  //   stopButton.addEventListener('click', () => {
  //     ee.emit('stop');
  //   });

  //   recordButton.addEventListener('click', () => {
  //     ee.emit('record');
  //   });
  // }
  // updateTrackInRealtime(loadDetails, playlist, params.get('id'));

  // // TRACK LOADING STATE
  // const loaderEl = document.querySelector('.loader');
  // ee.on('audiosourcesrendered', function() {
  //   loaderEl.style.display = 'none';
  // });

  return (
    <>
      <div className="section-wrapper">
        <section className="audio-player">
          <div className="project-container" id="project-container"></div>
          <div id="audio-buttons">
            <button id="play-button">
              <FontAwesomeIcon icon={faPlay} />
            </button>
            <button id="pause-button">
              <FontAwesomeIcon icon={faPause} />
            </button>
            <button id="stop-button">
              <FontAwesomeIcon icon={faStop} />
            </button>
            <button id="record-button">
              <FontAwesomeIcon icon={faMicrophone} />
            </button>
          </div>

          <div className="loader">
            <svg width="120px" height="120px" viewBox="-4 -1 38 28">
              <polygon
                fill="transparent"
                stroke="#000"
                strokeWidth="2"
                points="15,0 30,30 0,30"
              ></polygon>
            </svg>
          </div>

          <div id="playlist"></div>

          <button id="download-button">Download All Tracks</button>
        </section>

        <section id="upload-section">
          <form id="upload-form">
            <h3>Upload Your Track</h3>
            <input name="audio-input" type="file" required accept=".mp3" />
            <input name="instrument" placeholder="Enter instrument name..." required />
            <button id="submit-button">Submit Your Track</button>
          </form>
          <div id="tips">
            <h4>Tips for a Successful Collabo:</h4>
            <ul>
              <li>✔️ Be sure your file is exactly the same length as the project files.</li>
              <li>
                ✔️ Be sure your file is the same tempo and key signature as the project files.
              </li>
              <li>✔️ You can use the DAW (Digital Audio Workstation) of your choice.</li>
              <li>✔️ Export your file as an mp3.</li>
              <li>✔️ Only upload one instrument track at a time.</li>
              <li>✔️ Get in touch with the project manager for further Collabos!</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
