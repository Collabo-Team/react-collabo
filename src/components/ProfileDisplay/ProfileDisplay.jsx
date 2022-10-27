import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { getProfileById, updateProfile, uploadProfileImage } from '../../services/calls';
import './ProfileDisplay.css';
import { useRef } from 'react';
import useProfile from '../../hooks/useProfile';
import useAvatar from '../../hooks/useAvatar';
import { Redirect } from 'react-router-dom';

export default function ProfileDisplay() {
  const { profile } = useProfile();
  const { avatar } = useAvatar();

  const handleEdit = async () => {
    await getProfileById();
    //! just a template for the logic - are we going to refresh the page with a useEffect when the
    //! button is clicked, or navigate to a separate component?
    return <Redirect to="/user-profile/:id" />;
  };

  return (
    <>
      <div className="profile-container">
        <h3>Profile for {profile.username}</h3>
        <div className="avatar-container">
          <img className="profile-avatar" src={avatar} />
        </div>
        <div className="profile-username">{profile.username}</div>
        <div className="profile-first-name">{profile.firstName}</div>
        <div className="profile-last-name">{profile.lastName}</div>
        <div className="profile-email">{profile.email}</div>
        <div className="profile-city">{profile.city}</div>
        <div className="profile-bio">{profile.bio}</div>

        <div className="profile-projects">{profile.projects}</div>
        <button id="update-button" type="submit" className="profile-submit" onClick={handleEdit}>
          edit profile
        </button>
      </div>
    </>
  );
}
