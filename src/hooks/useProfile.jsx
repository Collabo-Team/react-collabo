import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { UserContext } from '../context/UserContext';

import { getProfileById } from '../services/calls';

export function useProfile() {
  const [profile, setProfile] = useState({});
  const [loadProfile, setLoadProfile] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(UserContext);

  //! template for when we set up the profile display component

  useEffect(() => {
    const loadData = async () => {
      setLoadProfile(true);
      try {
        const data = await getProfileById(user.id);

        setProfile(data);
        setLoadProfile(false);
      } catch (e) {
        setError(e.message);
        setLoadProfile(false);
      }
    };
    loadData();
  }, [user]);
  return { profile, setProfile, loadProfile, error };
}
