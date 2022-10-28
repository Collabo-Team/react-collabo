/* eslint-disable no-console */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { useParams } from 'react-router-dom';
// import { useProject } from '../../hooks/useProject';
// import { getUser } from '../../services/auth';
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
import { useEffect } from 'react';

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

  // getUser();

  useEffect(() => {
    // eslint-disable-next-line no-undef, new-cap
    const playlist = WaveformPlaylist({
      container: document.getElementById('playlist'),
      samplesPerPixel: 1000,
      waveHeight: 75,
      timescale: true,
      state: 'cursor',
      // seekStyle: 'line',
      isAutomaticScroll: true,
      colors: {
        waveOutlineColor: '#c78283',
      },
      zoomLevels: [128, 256, 512, 1000, 2000],
      controls: {
        show: true,
        width: 200,
      },
    });

    // HORIZONTAL SCROLLING INSIDE WAVEFORM
    const container = document.querySelector('.playlist-tracks');
    container.addEventListener('wheel', function(e) {
      if (e.deltaY > 0) {
        container.scrollLeft += 100;
        e.preventDefault();
      } else {
        container.scrollLeft -= 100;
        e.preventDefault();
      }
    });

    // RENDER PROJECT
    function renderProject(project) {
      const div = React.createElement(
        'div',
        {},
        React.createElement('h2', { className: 'project-name' }, `${project.name}`),
        React.createElement('div', { className: 'track-metadata' }, [
          React.createElement('p', {}, `${project.genre}`),
          React.createElement('p', {}, `${project.tempo} bpm`),
          React.createElement('p', {}, `${project.time_signature}`),
          React.createElement('p', {}, `${project.musical_key}`),
        ])
      );
      const root = createRoot(document.getElementById('project-container'));
      root.render(div);
    }

    let project = null;

    // UPLOAD TRACK FORM
    const uploadForm = document.getElementById('upload-form');

    function downloadBlob(blob, instrument) {
      const a = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = project.name + '-' + instrument + '.mp3';
      a.click();
      window.URL.revokeObjectURL(url);
    }

    async function downloadTrack(track) {
      const response = await getTrack(track.folder);
      const blob = response.data;
      downloadBlob(blob, track.instrument);
    }

    const downloadButton = document.getElementById('download-button');
    downloadButton.addEventListener('click', async () => {
      project = await getProject(id);
      Promise.all(project.tracks.map(downloadTrack));
    });

    const params = new URLSearchParams(window.location.search);
    async function loadDetails() {
      // projectContainer.innerHTML = '';
      project = await getProject(id);
      renderProject(project);
      // projectContainer.append(projectDisplay);
      async function displayTracks(tracks) {
        let loadList = [];
        for (const track of tracks) {
          loadList.push({ src: track.url, name: track.instrument });
        }

        await playlist.load(loadList);

        playButton.addEventListener('click', () => {
          ee.emit('play');
        });

        pauseButton.addEventListener('click', () => {
          ee.emit('pause');
        });

        stopButton.addEventListener('click', () => {
          ee.emit('stop');
        });

        recordButton.addEventListener('click', () => {
          ee.emit('record');
        });
      }
      await displayTracks(project.tracks);

      uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(uploadForm);

        const trackUpload = {
          instrument: formData.get('instrument'),
        };

        const audioFile = formData.get('audio-input');
        if (audioFile.size) {
          const audioName = `${project.id}/${Math.floor(Math.random() * 1000000)}${audioFile.name}`;
          const url = await uploadAudio('files-bucket', audioName, audioFile);
          trackUpload.folder = audioName;
          trackUpload.url = url;
          trackUpload.project_id = project.id;
          await updateTrack(trackUpload);
        }
        uploadForm.reset();
      });
    }

    loadDetails();

    var userMediaStream;
    const constraints = { audio: true };

    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    function gotStream(stream) {
      userMediaStream = stream;
      playlist.initRecorder(userMediaStream);
    }

    function logError(err) {
      console.error(err);
    }

    //initialize the WAV exporter.
    playlist.initExporter();

    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia(constraints).then(gotStream).catch(logError);
    } else if (navigator.getUserMedia && 'MediaRecorder' in window) {
      navigator.getUserMedia(constraints, gotStream, logError);
    }

    const playButton = document.getElementById('play-button');
    const pauseButton = document.getElementById('pause-button');
    const stopButton = document.getElementById('stop-button');
    const recordButton = document.getElementById('record-button');

    const ee = playlist.getEventEmitter();

    updateTrackInRealtime(loadDetails, playlist, params.get('id'));

    // TRACK LOADING STATE
    const loaderEl = document.querySelector('.loader');
    ee.on('audiosourcesrendered', function() {
      loaderEl.style.display = 'none';
    });
  }, [id]);

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
