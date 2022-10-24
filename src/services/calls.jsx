import { client } from './client';

/* Data functions */
export async function newProject(project) {
  return await client.from('projects').insert(project).single();
}

export async function updateTrack(track) {
  return await client.from('tracks').insert(track);
}

export async function uploadAudio(bucketName, audioName, audioFile) {
  const bucket = client.storage.from(bucketName);

  const response = await bucket.upload(audioName, audioFile, {
    cacheControl: '3600',

    upsert: true,
  });

  if (response.error) {
    /*eslint-disable-next-line*/
    console.log(response.error);
    return null;
  }

  const url = `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;

  return url;
}

export async function getTrack(folderName) {
  return await client.storage.from('files-bucket').download(folderName);
}

export async function getTracksByProject(project_id) {
  const response = await client.from('tracks').select('*').match({ project_id });
  return response.data;
}

export function updateTrackInRealtime(handleInsert, playlist, project_id) {
  client
    .from(`tracks:project_id=eq.${project_id}`)
    .on('INSERT', (e) => {
      playlist.load([{ src: e.new.url, name: e.new.instrument }]);
    })
    .subscribe();
}

export async function getProject(id) {
    // from the roster table, select a single player who has the matching id
  const response = await client.from('projects').select('*, tracks(*)').match({ id }).single();
    // and return the response
  if (response.error) {
    throw new Error(response.error.message);
  }
  return response.data;
}

export async function getProjects() {
  const response = await client.from('projects').select('*');
  return response.data;
}

// PROFILE FETCH FNS

// export async function createProfile(profile) {
//     return await client.from('profiles').insert(profile).single();
// }

export async function updateProfile(profile) {
  return await client.from('profiles').insert(profile).single();
}

export async function uploadProfilePhoto(bucketName, fileName, imageFile) {
  const bucket = client.storage.from(bucketName);

  const response = await bucket.upload(fileName, imageFile, {
    cacheControl: '3600',

    upsert: true,
  });

  if (response.error) {
    // eslint-disable-next-line no-console
    console.log(response.error);
    return null;
  }

  const url = `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;

  return url;
}