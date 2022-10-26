import { client, checkError } from './client';
const REACT_APP_SUPABASE_URL = 'https://lhopwipdeoyzrdkhgnll.supabase.co';

export async function createProfile(firstName, lastName, username, url) {
  const response = await client
    .from('profiles')
    .insert({ first_name: firstName, last_name: lastName, user_name: username, avatar_url: url });

  return checkError(response);
}

export async function getProfileById(id) {
  const response = await client.from('profiles').select('*').match({ id }).single();

  return checkError(response);
}

export async function getProfiles() {
  const response = await client.from('profiles').select('*');

  return checkError(response);
}

export async function uploadProfileImage(imagePath, imageFile) {
  const bucket = client.storage.from('avatars');
  const response = await bucket.upload(imagePath, imageFile, {
    cacheControl: '3600',
    upsert: true,
  });

  if (response.error) {
    return null;
  }
  const url = `${REACT_APP_SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;

  return url;
}
