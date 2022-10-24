import { useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { getProjects } from '../services/calls';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { submit } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      // fetch all the posts from supabase
      try {
        const data = await getProjects();
        setProjects(data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [submit]);

  return { projects, error, loading };
}
