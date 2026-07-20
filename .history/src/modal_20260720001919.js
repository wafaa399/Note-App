const Storage_Key = "almdrasa_notes";

//get data from local
function loadNotes(notes) {
  localStorage.setItem(Storage_Key, JSON.stringify(notes));
}

let notes = loadNotes();
//to get data of notes from localstorage
function storData() {
  const date = localStorage.getItem(Storage_Key);
  return data ? JSON.parse(data) : [];
}

export function getAllNotes() {
  return notes;
}

///status of notes
//1-pinned notes
export function getPinnedNotes() {
  return notes.filter((n) => n.pinned);
}

//2-regular notes
export function getUnpinnedNotes() {
  return notes.filter((n) => !n.pinned);
}
export function getNoteById(id) {
  return notes.find((n) => n.id === id);
}

export function addNote({ title, author, content, pinned = false }) {
  const newNote = {
    id: Date.now().toString(),
    title,
    author,
    content,
    date: new Date().toISOString(),
    pinned,
  };
  notes.unshift(newNote);
  saveNotes(notes);
  return newNote;
}

export function deleteNote(id) {
  notes = notes.filter((n) => n.id !== id);
  saveNotes(notes);
}

// export function togglePin(id) {
//   const note = getNoteById(id);
//   if (note) {
//     note.pinned = !note.pinned;
//     saveNotes(notes);
//   }
// }

export function searchNotes(query) {
  const q = query.trim().toLowerCase();
  if (!q) return notes;
  return notes.filter(
    (n) =>
      n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q),
  );
}
