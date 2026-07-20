import { formatDate, truncate, clear } from "../helper.js";

function noteItemHTML(note) {
  return `
    <div class="w-[16.625rem] h-[6.625rem] note-item cursor-pointer px-2 py-2 rounded hover:bg-gray-50" data-id="${note.id}">
      <p class="font-medium text-[#303030] text-[1rem]">${note.title}</p>
      <p class="w-[16.5625rem] h-[2.5rem] text-gray-400 text-xs mt-1">${truncate(note.content, 70)}</p>
      <div class="flex justify-between items-center mt-1">
        <span class="text-gray-400 text-xs">${formatDate(note.date)}</span>
        <button class="delete-btn text-[#EC7160] text-xs" data-id="${note.id}">Delete</button>
      </div>
    </div>
  `;
}

export function renderNotesList({ pinned, unpinned, onSelect, onDelete }) {
  const pinnedContainer = document.getElementById("pinnedList");
  const notesContainer = document.getElementById("notesList");
  clear(pinnedContainer);
  clear(notesContainer);

  pinned.forEach((note) =>
    pinnedContainer.insertAdjacentHTML("beforeend", noteItemHTML(note)),
  );
  unpinned.forEach((note) =>
    notesContainer.insertAdjacentHTML("beforeend", noteItemHTML(note)),
  );

  document.querySelectorAll(".note-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) return;
      onSelect(item.dataset.id);
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      onDelete(btn.dataset.id);
    });
  });
}
