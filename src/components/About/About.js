import React from 'react';
import './About.css';

export default function About() {
  const devs = [
    {
      name: 'Ryan Smith',
      gitHubUserName: 'ryanjeffrey',
      linkedInUserName: 'ryan-jeffrey-smith',
      spotifyLink: 'https://open.spotify.com/artist/02EBOshbjg80iHM2vawbyD?si=OSeUK7OdR9CsY_86Vp9X5Q&nd=1'
    },
    {
      name: 'Eddie Kuo',
      gitHubUserName: 'Eddie-Kuo',
      linkedInUserName: 'eddie-kuo17'
    },
    {
      name: 'Andrew Boyle',
      gitHubUserName: 'andrewjamesboyle',
      linkedInUserName: 'andrewjamesboyle'
    },
    {
      name: 'Ryan Parker',
      gitHubUserName: 'ryan-j-parker',
      linkedInUserName: 'ryanparkerdev'
    },
    {
      name: 'Adam Robson',
      gitHubUserName: 'Adam-Robson',
      linkedInUserName: 'adamrrobson',
      spotifyLink: 'https://open.spotify.com/artist/4NrRxIaVhlouvojuHGq62y?si=WeyC7-d_QUaTgQQafwlQ4g'
    }
  ];

  return (
    <>
      <h1 id="title">ABOUT US</h1>
      <section id="about-container">
        <p className="devCard-wrapper">
          { devs.map((dev, index) => <DevCard key={ index } dev={ dev } />) }
        </p>
      </section>
    </>
  );
}

function DevCard({ dev }) {

  function photoFn(dev) {
    return process.env.PUBLIC_URL + `/assets/${dev.name}.png`;
  }

  function gitHubFn(dev) {
    return `https://www.github.com/${dev.gitHubUserName}`;
  }

  function linkedInFn(dev) {
    return `https://www.linkedin.com/in/${dev.linkedInUserName}`;
  }

  function iconFn(icon) {
    return process.env.PUBLIC_URL + `/assets/${icon}.png`;
  }

  return (
    <section className="dev-wrapper">

      <div>
        <a href={ gitHubFn(dev) } target="_blank noreferrer" className="headshot-wrapper">
          <img src={ photoFn(dev) } className="headshot" />
          { dev.name }
        </a>
      </div>
      <br />
      <div className="icon-wrapper">

        <a href={ gitHubFn(dev) } target="_blank noreferrer">
          <img
            width="32"
            height="32"
            src={
              iconFn('gitHubIcon') }
            alt="gitHub-icon"
            className="github icon"
          />
        </a>

        <a href={ linkedInFn(dev) } target="_blank noreferrer">
          <img
            width="32"
            height="32"
            src={
              iconFn('linkedInIcon') }
            alt="linkedIn-icon"
            className="linkedin icon"
          />
        </a>
        {
          dev.spotifyLink &&
          <a href={ dev.spotifyLink } target="_blank noreferrer">
            <img
              width="32"
              height="32"
              src={
                iconFn('spotifyIcon')
              }
              alt="linkedIn-icon"
              className="spotify icon"
            />
          </a>
        }
      </div>
    </section>
  );
}


/*
lns 5-33: build array of dev information to display
lns 39-45: map through array of dev information to display each dev's information in DevCard component as appropriate
ln 52: build DevCard component which will hold each dev's information
lns 54-68: build functions that will return links to desired data for each dev in array
lns 73-82: call functions in placeholders for dev image and dev name wrapped in links to dev information
lns 84-121: call functions in placeholders for icons wrapped in links to dev information as appropriate
lns 107-120: conditionally include placeholder for spotify icon and link, based on whether or not the dev has spotifyLink property
*/
