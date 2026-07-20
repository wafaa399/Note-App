const Storage_Key = "almdrasa_notes";

function saveNotes(notes) {
  localStorage.setItem(Storage_Key, JSON.stringify(notes));
}

export function getAllNotes() {
  return notes;
}
//pinned notes
export function getPinnedNotes() {
  return notes.filter((n) => n.pinned);
}

//regular notes
export function getUnpinnedNotes() {
  return notes.filter((n) => !n.pinned);
}
export function getNoteById(id) {
  return notes.find((n) => n.id === id);
}
