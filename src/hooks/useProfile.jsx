import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { UserContext, useUserContext } from '../context/UserContext';

import { getProfileById } from '../services/calls';
import { client } from '../services/client';

export default function useProfile() {
  const [profile, setProfile] = useState();
  const [profileLoading, setProfileLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useUserContext();

  //! template for when we set up the profile display component

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     const { data, error } = await client.from('profiles').select('*').eq('id', user.id).single();

  //     if (error) {
  //       setError(error.message);
  //     }

  //     if (data) {
  //       setProfile(data);
  //       setError(null);
  //     }
  //   };
  //   fetchProfile();
  // }, [user.id]);

  // useEffect(() => {
  //   const loadProfileData = async () => {
  //     setProfileLoading(true);
  //     try {
  //       const { data } = await client.from('profiles').select('*').eq('id', user.id).single();

  //       setProfile(data);
  //       console.log('useProfile.jsx: ', setProfile(data));
  //       console.log('user.id from useProfile', user.id);
  //       console.log('user.email', user.email);
  //       console.count(user);
  //       setProfileLoading(false);
  //     } catch (e) {
  //       setError(e.message);
  //       setProfileLoading(false);
  //     }
  //   };
  //   loadProfileData();
  // }, [user]);

  // OG profile useEffect
  useEffect(() => {
    const loadProfileData = async () => {
      setProfileLoading(true);
      try {
        const data = await getProfileById(user.uuid);

        setProfile(data);
        setProfileLoading(false);
      } catch (e) {
        setError(e.message);
        setProfileLoading(false);
      }
    };
    loadProfileData();
  }, [user]);
  return { profile, setProfile, profileLoading, error };
}
