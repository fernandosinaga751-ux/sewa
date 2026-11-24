import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { DEFAULT_SETTINGS } from './utils';

export async function getSettings() {
  try {
    const s = await getDoc(doc(db, 'settings', 'site'));
    return { ...DEFAULT_SETTINGS, ...(s.exists() ? s.data() : {}) };
  } catch (e) { return DEFAULT_SETTINGS; }
}
export async function getCars() {
  try {
    const s = await getDocs(collection(db, 'cars'));
    return s.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => String(a.name).localeCompare(String(b.name)));
  } catch (e) { return []; }
}
export async function getPosts() {
  try {
    const s = await getDocs(collection(db, 'posts'));
    return s.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => String(b.date).localeCompare(String(a.date)));
  } catch (e) { return []; }
}
