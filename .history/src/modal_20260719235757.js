const Storage_Key = "almdrasa_notes";

function saveNotes(notes) {
  localStorage.setItem(Storage_Key, JSON.stringify(notes));
}

export function getAllNotes() {
  return notes;
}

export function getPinnedNotes() {
  return notes.filter((n) => n.pinned);
}
