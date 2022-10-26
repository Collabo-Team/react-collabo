import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { updateProfile, uploadProfileImage } from '../../services/calls';
import './UserProfile.css';
import { useRef } from 'react';
import useProfile from '../../hooks/useProfile';
import useAvatar from '../../hooks/useAvatar';

export default function UserProfile() {
  // const user = authUser();
  const { user } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');
  const [projects, setProjects] = useState('');
  const [imageFile, setImageFile] = useState('');

  const imageRef = useRef();

  const { setProfile, profile } = useProfile();

  const { result, uploader } = useAvatar();

  const handleProfile = async (e) => {
    // const profileForm = document.getElementById('profile-form');
    // const data = new FormData(profileForm);

    e.preventDefault();
    let url = '';
    // if (imageFile.name) {
    //   const randomFolder = Math.floor(Date.now() * Math.random());
    //   const imagePath = `profile-images/${randomFolder}/${imageFile.name}`;

    //   url = await uploadProfileImage(imagePath, imageFile);
    //   console.log('image path: ', imagePath);
    //   console.log('image file: ', imageFile);
    //   console.log('random folder: ', randomFolder);
    //   console.log('uploadProfileImage: ', uploadProfileImage);
    //   console.log('url: ', url);
    //   console.log('imageFile.name: ', imageFile.name);
    // }
    await updateProfile({
      user_name: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
      bio: bio,
      city: city,
      // extra: user.id,
      image_file: url,
    });

    // const imageFile = data.get('image-file');

    if (imageFile) {
      const path = `profile-images/${Math.floor(Math.random() * 1000000)}${imageFile.name}`;
      console.log('path :', path);
      const url = await uploadProfileImage('files-bucket', path, imageFile);
      // response.image_file = url;
    }

    await updateProfile(profile);
    // const prof = await getProfileById(user.id);
    // setProfile(profile);
    // console.log('profile: ', profile);
  };

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

  //! we need to:
  //*   - send image URLs to image_file column of profiles table
  //*   - send image URLs to files-bucket

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

  return (
    <>
      <div className="profile-container">
        <h3>User Profile</h3>
        <form onSubmit={handleProfile} className="profile-form" id="profile-form">
          {/* <h3>User{user.email}&apos;s profile</h3> */}
          <label htmlFor="avatar">upload avatar</label>
          <input
            id="avatar-input"
            name="avatar-input"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImageFile(e.target.imageFile.value);
              uploader(e);
            }}
          />
          <div className="avatar-container">
            <img
              className={imageFile.name ? 'avatar-preview' : 'hidden'}
              src={result}
              ref={imageRef}
            />
            {/* <img className="avatar-preview" key={imageSrc} src={imageSrc} /> */}
          </div>
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
