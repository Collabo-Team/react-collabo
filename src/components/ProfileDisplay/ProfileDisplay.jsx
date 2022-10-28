import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import useProfile from '../../hooks/useProfile';

export default function ProfileDisplay() {
  const { user } = useContext(UserContext);
  const { loading } = useProfile();

  return (
    <>
      {loading ? (
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
      ) : (
        <div className="profile-container">
          <div className="">
            <img src={user.avatar_url} />
            <p>{user.username}</p>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
            <p>{user.email}</p>
            <p>{user.location}</p>
            <p>{user.bio}</p>
            <p>{user.projects}</p>
          </div>
        </div>
      )}
    </>
  );
}
