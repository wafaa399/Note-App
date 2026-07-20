import { formatDate, truncate, clear } from "../helper.js";

function noteItemHTML(note) {
  return `
    <div class="w-full min-h-[6.625rem] note-item cursor-pointer px-3 py-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all" data-id="${note.id}">
      <p class="font-medium text-[#303030] leading-6 text-[1rem] break-words">${note.title}</p>
      <p class="w-full text-[#898989] text-[.82rem] font-medium leading-5 mt-1 break-words">${truncate(note.content, 70)}</p>
      <div class="w-full flex justify-between items-center mt-2 pt-1 border-t border-gray-100/60">
        <span class="text-[#898989] text-[.81rem] leading-5 font-medium">${formatDate(note.date)}</span>
        <button class="delete-btn text-[#D82700] text-sm hover:underline font-medium" data-id="${note.id}">Delete</button>
      </div>
    </div>
  `;
}

export function renderFlatList(container, notes, { onSelect, onDelete }) {
  clear(container);
  notes.forEach((note) =>
    container.insertAdjacentHTML("beforeend", noteItemHTML(note)),
  );
  container.querySelectorAll(".note-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) return;
      onSelect(item.dataset.id);
    });
  });
  container.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      onDelete(btn.dataset.id);
    });
  });
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
