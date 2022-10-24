import './Home.css';

export default function Home() {
  return (
    <main>
      <div className="header">
        <div className="headline">
          <h1>Create.</h1>
          <h2>Contribute.</h2>
          <h2>Collaborate.</h2>

          <div className="button-div">
            <a href="./start-project">
              <button className="collabo-btn">Start a Collabo</button>
            </a>
          </div>

          <p className="tagline">
            Collabo is a platform for like minded musicians to meet and collaborate.
          </p>
          <p className="tagline">
            Record your track and contribute to open-source remote recording projects.
          </p>
        </div>

        <div id="video-wrapper">
          <video
            src="https://lhopwipdeoyzrdkhgnll.supabase.co/storage/v1/object/public/files-bucket/video/marketing.mp4?t=2022-09-01T19%3A00%3A47.253Z"
            type="video/mp4"
            autoPlay
            muted
            loop
          ></video>
        </div>

        <h2 className="headline title">Featured Projects:</h2>
        <div className="project-wrapper">
          <div className="projects-container" id="projects-container"></div>
        </div>
      </div>
    </main>
  );
}
