import { formatDate, truncate, clear } from "../helper.js";

function noteItemHTML(note) {
  return `
    <div class="w-[16.625rem] h-[6.625rem] note-item cursor-pointer px-2 py-8 rounded hover:bg-gray-50" data-id="${note.id}">
      <p class="font-medium text-[#303030] leading-6 text-[1rem] mb-11">${note.title}</p>
      <p class="w-[16.5625rem] h-[2.5rem] text-[#898989]  text-[.82rem] font-medium leading-5  mt-1">${truncate(note.content, 70)}</p>
      <div class=" w-[14.5625rem] flex justify-between items-center mt-1 ">
        <span class="text-[#898989] text-[.81rem]  leading-5  font-medium mt-2">${formatDate(note.date)}</span>
        <button class="delete-btn text-[#D82700] text-sm " data-id="${note.id}">Delete</button>
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
