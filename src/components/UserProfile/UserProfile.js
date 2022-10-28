import { useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import { updateProfile, uploadProfileImage } from '../../services/calls';
import './UserProfile.css';
import { useRef } from 'react';
// import useProfile from '../../hooks/useProfile';
import useAvatar from '../../hooks/useAvatar';

export default function UserProfile() {
  const { user } = useUserContext();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');
  const [projects, setProjects] = useState('');
  const [imageFile, setImageFile] = useState('');

  const imageRef = useRef(null);
  
  const { setProfile, profile } = useProfile();

  const { result, uploader } = useAvatar();

  const handleProfile = async (e) => {
    e.preventDefault();
    let url = null;
    if (imageFile.name) {
      const randomFolder = Math.floor(Date.now() * Math.random());
      const imagePath = `profile-pictures/${randomFolder}/${imageFile.name}`;

      url = await uploadProfileImage(imagePath, imageFile);
    }
    await updateProfile(username, firstName, lastName, email, bio, city, projects, url);

    setProfile(profile);
  };

  //! Issue we faced:
  //* Needed to route to user signup to create a new account before I can then go into profile page to update
  //* need to make auth fully functional for all pages

  return (
    <>
      <div className="profile-container">
        <div className="avatar-display-area">
          <h3>{user.email}</h3>
          <div className="avatar-container">
            <img
              className={imageFile.name ? 'avatar-preview' : 'hidden'}
              src={result}
              ref={imageRef}
            />
          </div>
        </div>
        <form onSubmit={handleProfile} className="profile-form" id="profile-form">
          <label htmlFor="avatar">upload avatar</label>
          <input
            id="avatar-input"
            name="avatar-input"
            type="file"
            accept="*/"
            onChange={(e) => {
              setImageFile(e.target.files[0]);
              uploader(e);
            }}
          />
          <label htmlFor="username">username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={username}
          />
          <label htmlFor="first-name">first name</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            name="first-name"
            placeholder={firstName}
          />
          <label htmlFor="last-name">last name</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            name="last-name"
            placeholder={lastName}
          />
          <label htmlFor="email">email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder={email}
          />
          <label htmlFor="city">city</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            name="city"
            placeholder={city}
          />
          <label htmlFor="bio">bio</label>
          <textarea
            rows="2"
            cols="20"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            name="bio"
            placeholder="what should people know about you?"
          />
          <label htmlFor="projects">projects</label>
          <textarea
            rows="2"
            cols="20"
            value={projects}
            onChange={(e) => setProjects(e.target.value)}
            name="projects"
            placeholder="what have you been working on?"
          />
          <button
            id="update-button"
            type="submit"
            className="profile-submit"
            onClick={handleProfile}
          >
            update profile
          </button>
        </form>
      </div>
    </>
  );
}
