import { useContext, useEffect, useState } from 'react';
import { UserContext, useUserContext } from '../../context/UserContext';
import { authUser, getUser } from '../../services/auth';
import { updateProfile, uploadProfilePhoto } from '../../services/calls';
import './UserProfile.css';

export default function UserProfile() {
  const user = authUser();
  // const { user } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');
  const [projects, setProjects] = useState('');

  // const [avatar, setAvatar] = useState([]);
  // const [avatarUrl, setAvatarUrl] = useState('');

  const updateHandler = async (e) => {
    e.preventDefault();
    await updateProfile({
      user_name: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
      bio: bio,
      location: city,
      extra: user.id,
      image_file: imageSrc,
      // projects: projects,
    });
    // await uploadAvatar();
  };

  //! we need to:
  //*   - send image URLs to image_file column of profiles table
  //*   - send image URLs to files-bucket

  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    // const imageSrc = imageURLs.map((image) => image.imageSrc);

    if (images.length < 1) return;
    const newImageURLs = [];
    images.forEach((image) => newImageURLs.push(URL.createObjectURL(image)));
    setImageURLs(newImageURLs);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }
  const imageSrc = imageURLs.join('');
  console.log(imageSrc);

  console.log(imageURLs);

  return (
    <>
      <div className="profile-container">
        <h3>User Profile</h3>
        <form onSubmit={updateHandler} className="profile-form">
          <h3>User{user.email}&apos;s profile</h3>
          <label htmlFor="avatar">upload avatar</label>
          <input
            id="avatar-input"
            name="avatar-input"
            type="file"
            accept={'image/*'}
            onChange={onImageChange}
          />
          <div className="avatar-container">
            <img key={imageSrc} src={imageSrc} />
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
          <label htmlFor="projects">projects</label>
          <input
            value={projects}
            onChange={(e) => setProjects(e.target.value)}
            name="projects"
            placeholder={projects}
          />
          <button type="submit" className="profile-submit" onClick={updateHandler}>
            update profile
          </button>
        </form>
      </div>
    </>
  );
}

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
