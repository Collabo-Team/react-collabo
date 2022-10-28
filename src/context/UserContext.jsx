import { useEffect } from 'react';
import { useState, useContext, createContext } from 'react';
import { getUser } from '../services/auth';
import { getProfileById } from '../services/calls';
import { client } from '../services/client';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const currentUser = getUser();
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = getUser();

      if (sessionUser) {
        const { data: profile } = await client
          .from('profiles')
          .select('*')
          .eq('id', sessionUser.id)
          .single();
        setUser({
          ...sessionUser,
          ...profile,
        });
      }
    };
    getUserProfile();

    client.auth.onAuthStateChange(() => {
      getUserProfile();
    });
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, UserContext, useUserContext };
