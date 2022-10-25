import { useEffect, useState } from 'react';
import { getProject } from '../services/calls';

export function useProject(id) {
  const [projectDetail, setProjectDetail] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProject(id);
        setProjectDetail(data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return { projectDetail, setProjectDetail, loading, error, setError };
}
