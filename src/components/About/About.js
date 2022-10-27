import React from 'react';
import './About.css';

export default function About() {
  const devs = [
    {
      name: 'Ryan Smith',
      gitHubUserName: 'ryanjeffrey',
      linkedInUserName: 'ryan-jeffrey-smith',
      spotifyLink: ''
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
      <h2 id="title">ABOUT US</h2>
      <section id="about-container">
        <p className="image-wrapper">
          { devs.map((dev, index) => <DevCard
            key={ index }
            dev={ dev }
          />) }
        </p>
      </section>
    </>
  );
}

function DevCard({ dev }) {
  // set functions for inserting names into paths when mapping through and calling for the links and images
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

        { dev.spotifyLink &&
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