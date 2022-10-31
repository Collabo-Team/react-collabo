import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

export default function StartProject() {
  const { user } = useUserContext();
  const [projectName, setProjectName] = useState('');
  const [genre, setGenre] = useState('');
  const [tempo, setTempo] = useState('');
  const [timeSignature, setTimeSignature] = useState('');
  const [key, setKey] = useState('');

  // if (!user) {
  //   return <Redirect to="/auth" />;
  // }

  return (
    <>
      <form>
        <label>Project Name</label>
        <input value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        <label>Genre</label>
        <input value={genre} onChange={(e) => setGenre(e.target.value)} />
        <label>Tempo</label>
        <input value={tempo} onChange={(e) => setTempo(e.target.value)} />
        <label>Time Signature</label>
        <input value={timeSignature} onChange={(e) => setTimeSignature(e.target.value)} />
        <label>Key</label>
        <input value={key} onChange={(e) => setKey(e.target.value)} />
      </form>
    </>
  );
}
