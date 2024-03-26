// MediaRepository.js

import { db } from './firebase.js';
import { collection, getDocs } from "firebase/firestore";

const getMedia = async () => {
  try {
    const mediaRef = collection(db, 'media');
    const mediaSnapshot = await getDocs(mediaRef);
    const mediaData = mediaSnapshot.docs.map(doc => doc.data());
    return mediaData;
  } catch (error) {
    console.error('Error fetching media:', error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export { getMedia };