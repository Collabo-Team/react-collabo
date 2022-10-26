import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext, useUserContext } from '../../context/UserContext';
import { authUser, getUser } from '../../services/auth';
// import { updateProfile, uploadProfileImage } from '../../services/calls';
import { createProfile, getProfileById, uploadProfileImage } from '../../services/calls';
import { updateProfile } from '../../services/calls';
import useAvatar from '../../hooks/useAvatar';
import useProfile from '../../hooks/useProfile';
import './UserProfile.css';

export default function UserProfile() {
  // const user = authUser();
  const { user } = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');
  const [projects, setProjects] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageFile, setImageFile] = useState('');

  const imageRef = useRef(null);
  const { setProfile, profile } = useProfile();
  const { result, uploader } = useAvatar();

  // const handleAvatar = async () => {
  //   let url = null;
  //   if (imageFile.name) {
  //     const randomFolder = Math.floor(Date.now() * Math.random());
  //     const imagePath = `profile-pictures/${randomFolder}/${imageFile.name}`;

  //     url = await uploadProfileImage(imagePath, imageFile);
  //   }
  //   await createProfile(firstName, lastName, username, url);
  // };

  const updateHandler = async (e) => {
    e.preventDefault();

    // let url = null;
    // if (imageFile.name) {
    //   const randomFolder = Math.floor(Date.now() * Math.random());
    //   const imagePath = `profile-pictures/${randomFolder}/${imageFile.name}`;

    //   url = await uploadProfileImage(imagePath, imageFile);
    // }
    await updateProfile({
      // id: user.id,
      user_name: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
      bio: bio,
      city: city,
      // projects: projects,
      // image_file: url,
    });
  };

  // const [images, setImages] = useState([]);
  // const [imageURLs, setImageURLs] = useState([]);

  // useEffect(() => {
  // const imageSrc = imageURLs.map((image) => image.imageSrc);

  //   if (images.length < 1) return;
  //   const newImageURLs = [];
  //   images.forEach((image) => newImageURLs.push(URL.createObjectURL(image)));
  //   setImageURLs(newImageURLs);
  // }, [images]);

  // function onImageChange(e) {
  //   setImages([...e.target.files]);
  // }
  // const imageSrc = imageURLs.join('');

  return (
    <>
      <div className="profile-container">
        {/* <h3>User Profile</h3> */}
        <form onSubmit={updateHandler} className="profile-form">
          <h3>{email}&apos;s profile</h3>
          <div className="avatar-container">
            {/* <img
              className={imageFile.name ? 'avatar-preview' : 'hidden'}
              src={result}
              ref={imageRef}
            /> */}
            {/* <img
              // className="avatar-preview"
              className={imageFile ? 'avatar-preview' : 'hidden'}
              key={imageSrc}
              src={imageSrc}
            /> */}
          </div>
          <label htmlFor="avatar">upload avatar</label>
          <input
            name="avatar"
            type="file"
            accept={'image/jpeg image/png'}
            onChange={(e) => setAvatar(e.target.files[0])}
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
          <label htmlFor="bio">bio</label>
          <input
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            name="bio"
            placeholder={bio}
          />
          <label htmlFor="city">city</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            name="city"
            placeholder={city}
          />
          {/* <label htmlFor="projects">projects</label>
          <input
            value={projects}
            onChange={(e) => setProjects(e.target.value)}
            name="projects"
            placeholder={projects}
          /> */}
          <button type="submit" className="profile-submit" onClick={updateHandler}>
            update profile
          </button>
        </form>
      </div>
    </>
  );
}

// import { useContext, useState } from 'react';
// import { UserContext } from '../../context/UserContext';
// import { updateProfile, uploadProfileImage } from '../../services/calls';
// import './UserProfile.css';
// import { useRef } from 'react';
// import useProfile from '../../hooks/useProfile';
// import useAvatar from '../../hooks/useAvatar';

// export default function UserProfile() {
//   // const user = authUser();
//   const { user } = useContext(UserContext);
//   const [username, setUsername] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [bio, setBio] = useState('');
//   const [city, setCity] = useState('');
//   const [projects, setProjects] = useState('');
//   const [imageFile, setImageFile] = useState('');

//   const imageRef = useRef(null);

//   const { setProfile, profile } = useProfile();

//   const { result, uploader } = useAvatar();

//   const handleProfile = async (e) => {
//     e.preventDefault();
// const profileForm = document.getElementById('profile-form');
// const data = new FormData(profileForm);
// const imageFile = data.get('image-file');

// if (imageFile) {
//   const randomFolder = Math.floor(Date.now() * Math.random());
//   const imagePath = `profile-images/${randomFolder}/${imageFile.name}`;

//   const url = await uploadProfileImage(imagePath, imageFile);
// response.image_file = url;

//   console.log('image path: ', imagePath);
//   console.log('image file: ', imageFile);
//   console.log('random folder: ', randomFolder);
//   console.log('uploadProfileImage: ', uploadProfileImage);
//   console.log('url: ', url);
//   console.log('imageFile.name: ', imageFile.name);
// }
// if (imageFile.name) {
//   const imagePath = `profile-images/${imageFile.name}`;
//   const url = await uploadProfileImage(imagePath, imageFile);
// }

// await updateProfile({
//   user_name: username,
//   first_name: firstName,
//   last_name: lastName,
//   email: email,
//   bio: bio,
//   city: city,
//   // extra: user.id,
//   // image_file: url,
// });

// const imageFile = data.get('image-file');

// if (imageFile) {
//   const path = `profile-images/${Math.floor(Math.random() * 1000000)}${imageFile.name}`;
//   console.log('path :', path);
//   const url = await uploadProfileImage('avatars', path, imageFile);
// response.image_file = url;
// }

// await updateProfile(profile);
// const prof = await getProfileById(user.id);
// setProfile(profile);
// console.log('profile: ', profile);
// profileForm.reset();
// };

//! we need to:
//*   - send image URLs to image_file column of profiles table
//*   - send image URLs to files-bucket

//   return (
//     <>
//       <div className="profile-container">
//         <h3>User Profile</h3>
//         <form onSubmit={handleProfile} className="profile-form" id="profile-form">
//           {/* <h3>User{user.email}&apos;s profile</h3> */}
//           <label htmlFor="avatar">upload avatar</label>
//           <input
//             id="avatar-input"
//             name="avatar-input"
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               setImageFile(e.target.value);
//               uploader(e);
//             }}
//           />
//           <div className="avatar-container">
//             <img
//               className={imageFile.name ? 'avatar-preview' : 'hidden'}
//               src={result}
//               ref={imageRef}
//             />
//             {/* <img className="avatar-preview" key={imageSrc} src={imageSrc} /> */}
//           </div>
//           <label htmlFor="username">username</label>
//           <input
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder={username}
//           />
//           <label htmlFor="first-name">first name</label>
//           <input
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             name="first-name"
//             placeholder={firstName}
//           />
//           <label htmlFor="last-name">last name</label>
//           <input
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             name="last-name"
//             placeholder={lastName}
//           />
//           <label htmlFor="email">email</label>
//           <input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             name="email"
//             placeholder={email}
//           />
//           <label htmlFor="city">city</label>
//           <input
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             name="city"
//             placeholder={city}
//           />
//           <label htmlFor="bio">bio</label>
//           <textarea
//             rows="2"
//             cols="20"
//             value={bio}
//             onChange={(e) => setBio(e.target.value)}
//             name="bio"
//             placeholder="what should people know about you?"
//           />
//           <label htmlFor="projects">projects</label>
//           <textarea
//             rows="2"
//             cols="20"
//             value={projects}
//             onChange={(e) => setProjects(e.target.value)}
//             name="projects"
//             placeholder="what have you been working on?"
//           />
//           <button
//             id="update-button"
//             type="submit"
//             className="profile-submit"
//             onClick={handleProfile}
//           >
//             update profile
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

/// /// ///

//                                                                FROM OG COLLABO

// const profileForm = document.getElementById('profile-form');
// const params = new URLSearchParams(location.search);

// profileForm.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const data = new FormData(profileForm);

//   const response = {
//     first_name: data.get('first-name-input'),
//     last_name: data.get('last-name-input'),
//     user_name: data.get('user-name'),
//     bio: data.get('bio'),
//   };

//   const imageFile = data.get('image-file');

//   if (imageFile.size) {
//     const path = `profile-images/${Math.floor(Math.random() * 1000000)}${imageFile.name}`;
//     console.log('path', path);
//     const url = await uploadProfileImage('files-bucket', path, imageFile);
//     response.image_file = url;
//   }

//   await updateProfile(response);

//   profileForm.reset();
// });

/// /// ///

//                                                                RYAN'S ORIGINAL METHOD

// const [avatar, setAvatar] = useState([]);
// const [avatarUrl, setAvatarUrl] = useState('');

// const updateHandler = async (e) => {
//   e.preventDefault();
//   await updateProfile({
//     user_name: username,
//     first_name: firstName,
//     last_name: lastName,
//     email: email,
//     bio: bio,
//     location: city,
//     extra: user.id,
//     image_file: imageSrc,
//     // projects: projects,
//   });
//   // await uploadAvatar();
// };

//                                                                METHOD FROM WEB SEARCH

// const [images, setImages] = useState([]);
// const [imageURLs, setImageURLs] = useState([]);

// useEffect(() => {
//   // const imageSrc = imageURLs.map((image) => image.imageSrc);

//   if (images.length < 1) return;
//   const newImageURLs = [];
//   images.forEach((image) => newImageURLs.push(URL.createObjectURL(image)));
//   setImageURLs(newImageURLs);
// }, [images]);

// function onImageChange(e) {
//   setImages([...e.target.files]);
// }
// const imageSrc = imageURLs.join('');
// console.log(imageSrc);

// console.log(imageURLs);

//                                                                   FROM CALLS.JS

// export async function uploadAvatar(bucketName, audioName, audioFile) {
//   const bucket = client.storage.from(bucketName);

//   const response = await bucket.upload(audioName, audioFile, {
//     cacheControl: '3600',

//     upsert: true,
//   });

//   if (response.error) {
//     console.log(response.error);
//     return null;
//   }

//   const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;

//   return url;
// }
