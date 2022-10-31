import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { newProject } from '../../services/calls';

export default function StartProject() {
  const { user } = useUserContext();
  // const [projectName, setProjectName] = useState('');
  // const [genre, setGenre] = useState('');
  // const [tempo, setTempo] = useState('');
  // const [timeSignature, setTimeSignature] = useState('');
  // const [key, setKey] = useState('');

  const [project, setProject] = useState({ name: '', genre: 'Rock', tempo: '120', timeSignature: '4/4', key: 'C major' });

  console.log('project', project);

  // if (!user) {
  //   return <Redirect to="/auth" />;
  // }

  const handleStartProject = async () => {
    await newProject(project);
  };

  return (
    <>
      <form onSubmit={handleStartProject}>
        <label>Project Name</label>
        <input placeholder='My Cool New Tune' value={project.name} onChange={(e) => setProject((prevState) => ({ ...prevState, name: e.target.value }))} />
        <label>Project Genre:
          <select value={project.genre} onChange={(e) => setProject((prevState) => ({ ...prevState, genre: e.target.value }))} required >
            <option>Rock</option>
            <option>Hip Hop</option>
            <option>Pop</option>
            <option>Electronic</option>
            <option>Jazz</option>
            <option>Country</option>
            <option>Classical</option>
            <option>Reggae</option>
            <option>Soul</option>
            <option>R&amp;B</option>
            <option>World</option>
            <option>Indie Rock</option>
            <option>Punk</option>
            <option>Metal</option>
            <option>Folk</option>
            <option>Latin</option>
            <option>Gospel</option>
            <option>New Wave</option>
            <option>Ambient</option>
            <option>Lofi</option>
            <option>Prog Rock</option>
            <option>Funk</option>
            <option>Vocal</option>
          </select>
        </label>
        <label>Tempo</label>
        <input value={project.tempo} onChange={(e) => setProject.tempo((prevState) => ({ ...prevState, tempo: e.target.value }))} />
        <label>Project Time Signature:
          <select value={project.timeSignature} onChange={(e) => setProject((prevState) => ({ ...prevState, timeSignature: e.target.value }))} required>
            <option>3/4</option>
            <option>4/4</option>
            <option>5/4</option>
            <option>6/8</option>
            <option>7/8</option>
            <option>12/8</option>
            <option disabled>───</option>
            <option>11/4</option>
            <option>11/8</option>
          </select>
        </label>
        <label> Project Key:
          <select value={project.key} onChange={(e) => setProject((prevState) => ({ ...prevState, key: e.target.value }))} required>
            <optgroup label='Major Keys'>
              <option>B major</option>
              <option>B&#9837; major</option>
              <option>A major</option>
              <option>A&#9837; major</option>
              <option>G major</option>
              <option>G&#9837; major</option>
              <option>F&#9839; major</option>
              <option>F major</option>
              <option>E major</option>
              <option>E&#9837; major</option>
              <option>D major</option>
              <option>D&#9837; major</option>
              <option>C&#9839; major</option>
              <option>C major</option>
            </optgroup>
            <option disabled>───────</option>
            <optgroup label='Minor Keys'>
              <option>B minor</option>
              <option>B&#9837; minor</option>
              <option>A&#9839; minor</option>
              <option>A minor</option>
              <option>A&#9837; minor</option>
              <option>G&#9839; minor</option>
              <option>G minor</option>
              <option>F&#9839; minor</option>
              <option>F minor</option>
              <option>E minor</option>
              <option>E&#9837; minor</option>
              <option>D&#9839; minor</option>
              <option>D minor</option>
              <option>C&#9839; minor</option>
              <option>C minor</option>
            </optgroup>
          </select>
        </label>
        <button>Start Project</button>
      </form>
    </>
  );
}
