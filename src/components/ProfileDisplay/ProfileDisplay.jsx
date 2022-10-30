import { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext, useUserContext } from '../../context/UserContext';
import useProfile from '../../hooks/useProfile';
import { getProfileById, getProfiles } from '../../services/calls';
import './ProfileDisplay.css';

export default function ProfileDisplay() {
  const { user } = useContext(UserContext);
  const { loading } = useProfile();
  const { userProfile } = useProfile();
  //   console.log('profile display user :', user);

  //   const fetchProfile = async () => {
  // const profile = await getProfileById(user.id);
  // console.log('fetched profile :', profile);
  // return profile;
  //   };
  //   const useProfiles = () => {
  useEffect(() => {
    const fetchProfiles = async () => {
      const profiles = await getProfileById();
      return profiles;
    };
    fetchProfiles();
  }, []);
  //   };

  //   const { profiles } = useProfiles();

  return (
    <>
      {/* {loading ? (
        <div className="loader">
          <svg width="120px" height="120px" viewBox="-4 -1 38 28">
            <polygon
              fill="transparent"
              stroke="#000"
              strokeWidth="2"
              points="15,0 30,30 0,30"
            ></polygon>
          </svg>
        </div>
      ) : ( */}
      <div className="profile-container">
        {/* {profiles.map((prof) => (
          <div key={prof.uuid} className="user-profile">
            <h3>Profile for {user.email}</h3>
            <img src={prof.avatar_url} />
            <p>{prof.username}</p>
            <p>{prof.firstName}</p>
            <p>{prof.lastName}</p>
            <p>{prof.email}</p>
            <p>{prof.location}</p>
            <p>{prof.bio}</p>
            <p>{prof.projects}</p>
          </div>
        ))} */}
      </div>
    </>
  );
}
