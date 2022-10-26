import React from 'react';
import NavBar from '../NavBar/NavBar';
// https://github.com/ryanjeffrey
// https://www.linkedin.com/in/ryan-jeffrey-smith/
// https://github.com/ryan-j-parker
export default function About() {
  const devs = [
    {
      name: 'Ryan Smith',
      gitHubUserName: 'ryanjeffrey',
      linkedInUserName: 'ryan-jeffrey-smith',
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
      <NavBar navLinks={ [{ text: 'Home', path: '/' }] } />
      <div>
        <p className="about title">
          ABOUT US
        </p>
        <span>
          { devs.map((dev, index) => <DevCard key={ index } dev={ dev } />) }
        </span>
      </div>
    </>
  );
}

function DevCard({ dev }) {
  // set functions for inserting names into paths when mapping through and calling for the links and images
  function photoFn(dev) {
    return process.env.PUBLIC_URL + `/assets/${dev.name}.jpg`;
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
    <section>
      <div>
        <a href={ gitHubFn(dev) } target="_blank noreferrer">
          <img src={ photoFn(dev) } />
        </a>
      </div>

      <div>
        <p>
          { dev.name }
        </p>
      </div>

      <div>
        <a href={ gitHubFn(dev) } target="_blank noreferrer">
          <img width="42" height="42" src={ iconFn('gitHubIcon') } alt="gitHub-icon" />
        </a>

        <a href={ linkedInFn(dev) } target="_blank noreferrer">
          <img width="42" height="42" src={ iconFn('linkedInIcon') } alt="linkedIn-icon" />
        </a>

        { dev.spotifyLink &&
          <a href={ dev.spotifyLink } target="_blank noreferrer">
            <img width="42" height="42" src={ iconFn('spotifyIcon') } alt="linkedIn-icon" />
          </a>
        }
      </div>
    </section>
  );
}