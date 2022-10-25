import { Link } from 'react-router-dom';
import './Project.css';

export default function Project({ name, id }) {
  return (
    <>
      <Link to={`/projects/${id}`}>
        <div className="project">{name}</div>
      </Link>
    </>
  );
}
