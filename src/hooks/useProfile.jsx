import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useUserContext } from '../context/UserContext';

import { getProfileById } from '../services/calls';

export default function useProfile() {
  const [profile, setProfile] = useState({});
  const [loadProfile, setLoadProfile] = useState(true);
  const [error, setError] = useState('');
  const { user } = useUserContext();

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
