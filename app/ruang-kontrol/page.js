'use client';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { app, db } from '@/lib/firebase';
import { PRICE, DEFAULT_SETTINGS, slugify, minPrice, rp } from '@/lib/utils';

const iso = () => new Date().toISOString();

export default function Admin() {
  const [u, setU] = useState(undefined);
  const [tab, setTab] = useState('mobil');
  const [cars, setCars] = useState([]);
  const [posts, setPosts] = useState([]);
  const [s, setS] = useState(null);
  const [f, setF] = useState(null);
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');
  const [em, setEm] = useState('');
  const [pw, setPw] = useState('');

  useEffect(() => onAuthStateChanged(getAuth(app), setU), []);
  useEffect(() => { if (u) load(); }, [u]);

  async function load() {
    const g = async (c) => (await getDocs(collection(db, c))).docs.map((d) => ({ id: d.id, ...d.data() }));
    setCars((await g('cars')).sort((a, b) => a.name.localeCompare(b.name)));
    setPosts((await g('posts')).sort((a, b) => String(b.date).localeCompare(String(a.date))));
    const st = await getDoc(doc(db, 'settings', 'site'));
    const d = { ...DEFAULT_SETTINGS, ...(st.exists() ? st.data() : {}) };
    setS({ ...d, typesText: d.types.join(', ') });
  }
  async function run(fn, ok) {
    setMsg('Menyimpan…');
    try { await fn(); await load(); setF(null); setFile(null); setMsg(ok); }
    catch (e) { setMsg('Gagal: ' + (e.code || e.message)); }
  }
  async function upload() {
    if (!file) return f.img || '';
    const r = ref(getStorage(app), `uploads/${Date.now()}-${file.name.replace(/[^\w.]/g, '_')}`);
    await uploadBytes(r, file);
    return getDownloadURL(r);
  }
  const set = (k, v) => setF({ ...f, [k]: v });
  const remove = (col, id) => confirm('Hapus data ini?') && run(() => deleteDoc(doc(db, col, id)), 'Terhapus');

  const saveCar = () => run(async () => {
    if (!f.name?.trim()) throw new Error('Nama mobil wajib diisi');
    const id = f.id || slugify(f.name);
    const prices = {};
    PRICE.forEach(([k]) => { const v = Number(f.prices?.[k]); if (v > 0) prices[k] = v; });
    await setDoc(doc(db, 'cars', id), { name: f.name.trim(), type: f.type, seats: Number(f.seats) || 0, trans: f.trans, desc: f.desc || '', img: await upload(), prices });
  }, 'Mobil tersimpan');

  const savePost = () => run(async () => {
    if (!f.title?.trim()) throw new Error('Judul wajib diisi');
    const id = f.id || slugify(f.title);
    await setDoc(doc(db, 'posts', id), { title: f.title.trim(), desc: f.desc || '', body: f.body || '', img: await upload(), date: f.date || iso(), updated: iso() });
  }, 'Artikel tersimpan');

  const saveSet = () => run(async () => {
    const { typesText, ...rest } = s;
    await setDoc(doc(db, 'settings', 'site'), { ...rest, types: typesText.split(',').map((x) => x.trim()).filter(Boolean) });
  }, 'Pengaturan tersimpan');

  if (u === undefined) return <p className="w pg">Memuat…</p>;
  if (!u) return (
    <div className="w pg lg-box">
      <h1>Masuk</h1>
      <div className="fm">
        <input type="email" placeholder="Email" value={em} onChange={(e) => setEm(e.target.value)} autoComplete="username" />
        <input type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="current-password"
          onKeyDown={(e) => e.key === 'Enter' && signInWithEmailAndPassword(getAuth(app), em, pw).catch(() => setMsg('Email atau password salah'))} />
        <button className="btn" onClick={() => signInWithEmailAndPassword(getAuth(app), em, pw).catch(() => setMsg('Email atau password salah'))}>Masuk</button>
        <p className="m">{msg}</p>
      </div>
    </div>
  );

  const types = s?.types || DEFAULT_SETTINGS.types;
  const newCar = () => { setFile(null); setF({ name: '', type: types[0], seats: 7, trans: 'Manual/Matic', desc: '', img: '', prices: {} }); };
  const newPost = () => { setFile(null); setF({ title: '', desc: '', body: '', img: '' }); };
  const FileInput = () => <div><label>Foto (maks 5 MB)</label><input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />{f.img && !file && <p className="m">Foto saat ini tersimpan. Pilih file baru untuk mengganti.</p>}</div>;

  return (
    <div className="w pg">
      <div className="bar"><h1>Dashboard Admin</h1><button className="chip" onClick={() => signOut(getAuth(app))}>Keluar</button></div>
      <div className="tabs">{[['mobil', 'Mobil & Harga'], ['artikel', 'Artikel'], ['pengaturan', 'No HP, WA & Alamat']].map(([k, n]) =>
        <button key={k} className={'chip ' + (tab === k ? 'on' : '')} onClick={() => { setTab(k); setF(null); setMsg(''); }}>{n}</button>)}</div>
      {msg && <p className="note">{msg}</p>}

      {tab === 'mobil' && (f ? (
        <div className="fm">
          <h3>{f.id ? 'Edit' : 'Tambah'} Mobil</h3>
          <div><label>Nama mobil</label><input value={f.name} onChange={(e) => set('name', e.target.value)} /></div>
          <div className="r2">
            <div><label>Jenis</label><select value={f.type} onChange={(e) => set('type', e.target.value)}>{types.map((t) => <option key={t}>{t}</option>)}</select></div>
            <div><label>Jumlah kursi</label><input type="number" value={f.seats} onChange={(e) => set('seats', e.target.value)} /></div>
            <div><label>Transmisi</label><input value={f.trans} onChange={(e) => set('trans', e.target.value)} /></div>
          </div>
          <div><label>Deskripsi</label><textarea rows="3" value={f.desc} onChange={(e) => set('desc', e.target.value)} /></div>
          <h4>Harga per hari (kosongkan jika paket tidak tersedia)</h4>
          <div className="r2">{PRICE.map(([k, l]) => <div key={k}><label>{l} (Rp)</label><input type="number" value={f.prices?.[k] ?? ''} onChange={(e) => setF({ ...f, prices: { ...f.prices, [k]: e.target.value } })} /></div>)}</div>
          <FileInput />
          <div className="acts"><button className="btn" onClick={saveCar}>Simpan</button><button className="chip" onClick={() => setF(null)}>Batal</button></div>
        </div>
      ) : (<>
        <button className="btn" onClick={newCar}>+ Tambah Mobil</button>
        <div style={{ marginTop: 16 }}>{cars.map((c) => (
          <div className="row" key={c.id}><div className="i"><b>{c.name}</b><small>{c.type} · {minPrice(c) ? 'mulai ' + rp(minPrice(c)) : 'harga belum diisi'}</small></div>
            <button className="btn s" onClick={() => { setFile(null); setF({ ...c, prices: { ...c.prices } }); }}>Edit</button>
            <button className="btn s d" onClick={() => remove('cars', c.id)}>Hapus</button></div>))}</div>
      </>))}

      {tab === 'artikel' && (f ? (
        <div className="fm">
          <h3>{f.id ? 'Edit' : 'Tulis'} Artikel</h3>
          <div><label>Judul</label><input value={f.title} onChange={(e) => set('title', e.target.value)} /></div>
          <div><label>Deskripsi singkat untuk Google (maks 155 karakter)</label><input maxLength={160} value={f.desc} onChange={(e) => set('desc', e.target.value)} /></div>
          <div><label>Isi artikel (pisahkan paragraf dengan baris kosong; awali baris dengan ## untuk subjudul)</label><textarea rows="12" value={f.body} onChange={(e) => set('body', e.target.value)} /></div>
          <FileInput />
          <div className="acts"><button className="btn" onClick={savePost}>Terbitkan</button><button className="chip" onClick={() => setF(null)}>Batal</button></div>
        </div>
      ) : (<>
        <button className="btn" onClick={newPost}>+ Tulis Artikel</button>
        <div style={{ marginTop: 16 }}>{posts.map((p) => (
          <div className="row" key={p.id}><div className="i"><b>{p.title}</b><small>{String(p.date).slice(0, 10)}</small></div>
            <button className="btn s" onClick={() => { setFile(null); setF({ ...p }); }}>Edit</button>
            <button className="btn s d" onClick={() => remove('posts', p.id)}>Hapus</button></div>))}</div>
      </>))}

      {tab === 'pengaturan' && s && (
        <div className="fm">
          <div><label>Nama bisnis</label><input value={s.name} onChange={(e) => setS({ ...s, name: e.target.value })} /></div>
          <div className="r2">
            <div><label>No HP 1</label><input value={s.phone1} onChange={(e) => setS({ ...s, phone1: e.target.value })} /></div>
            <div><label>No HP 2</label><input value={s.phone2} onChange={(e) => setS({ ...s, phone2: e.target.value })} /></div>
            <div><label>No WhatsApp (tombol di halaman)</label><input value={s.wa} onChange={(e) => setS({ ...s, wa: e.target.value })} /></div>
          </div>
          <div><label>Alamat</label><textarea rows="2" value={s.address} onChange={(e) => setS({ ...s, address: e.target.value })} /></div>
          <div><label>Jenis mobil (pisahkan dengan koma)</label><input value={s.typesText} onChange={(e) => setS({ ...s, typesText: e.target.value })} /></div>
          <button className="btn" onClick={saveSet}>Simpan Pengaturan</button>
        </div>
      )}
    </div>
  );
}
