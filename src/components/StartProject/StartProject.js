import { Redirect } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

export default function StartProject() {
  const { user } = useUserContext();

  if (!user) {
    return <Redirect to="/auth" />;
  }

  return (
    <>
      <form>
        <label>Project Name</label>
        <input>
        
        </input>
        <label>Genre</label>
        <input>
        
        </input>
        <label>Tempo</label>
        <input>
        
        </input>
        <label>Time Signature</label>
        <input>
        
        </input>
        <label>Key</label>
        <input>
        
        </input>
      </form>;

    </>
  );
}
