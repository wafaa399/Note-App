import { formatDate } from "../helper.js";

export function renderNoteDetail(note) {
  const container = document.getElementById("detailView");
  if (!note) {
    container.innerHTML = `<p class="text-gray-400 text-center mt-20">اختار Note من القايمة عشان تتعرض هنا</p>`;
    return;
  }
  container.innerHTML = `
    <h2 class="text-2xl font-semibold text-[#303030] mb-1">${note.title}</h2>
    <p class="text-gray-400 text-sm mb-6">${formatDate(note.date)} / By ${note.author}</p>
    <p class="text-gray-600 leading-7 whitespace-pre-line">${note.content}</p>
  `;
}

export function renderAddNoteForm({ onSubmit }) {
  const container = document.getElementById("detailView");
  container.innerHTML = `
    
    <div class=" w-[37.5rem] h-[34.625rem] space-y-4 max-w-md">
    <h2 class="text-[1.63rem] leading-8 font-semibold text-[#303030] mb-6">Add Note</h2>
      <div class="w-[31.25rem] h-[4.4375rem]">
        <label class="block text-gray-500 mb-1">Title*</label>
        <input id="noteTitle" type="text" class=" w-[31.25rem] h-[2.8125rem] border border-gray-200 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-red-400" />
      </div>
      <div class="w-[31.25rem] h-[4.4375rem]">
        <label class="block text-gray-500 mb-1">Author*</label>
        <input id="noteAuthor" type="text" class=" w-[31.25rem] h-[2.8125rem] border border-gray-200 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-red-400" />
      </div>
      <div>
        <label class="block text-gray-500 mb-1">Your Note*</label>
        <textarea id="noteContent" rows="6" class="w-[31.25rem] h-[12rem] border border-gray-200 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-red-400"></textarea>
      </div>
      <div class="flex gap-3">
        <button id="addNoteBtn" class="[9rem] h-[2.8125rem] bg-[#EC7160] text-white px-5 py-2 rounded hover:bg-[#e05f4d]">Add Note</button>
        <button id="addPinnedBtn" class=" [8.625rem] h-[2.5rem] bg-[#EC7160] text-white  px-4 py-2 rounded hover:bg-[#e05f4d]">Add pinned note</button>
      </div>
    </div>
  `;

  function submitHandler(pinned) {
    const title = document.getElementById("noteTitle").value.trim();
    const author = document.getElementById("noteAuthor").value.trim();
    const content = document.getElementById("noteContent").value.trim();
    if (!title || !author || !content) {
      alert("من فضلك املأ كل الحقول");
      return;
    }
    onSubmit({ title, author, content, pinned });
  }

  document
    .getElementById("addNoteBtn")
    .addEventListener("click", () => submitHandler(false));
  document
    .getElementById("addPinnedBtn")
    .addEventListener("click", () => submitHandler(true));
}
