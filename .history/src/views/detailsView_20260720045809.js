// import { formatDate } from "../helper.js";

// export function renderNoteDetail(note) {
//   const container = document.getElementById("detailView");
//   if (!note) {
//     container.innerHTML = `
//       <div class="flex flex-col items-center justify-center h-[70vh] text-center mx-auto">
//     <h2 class="text-[24px] font-semibold text-[#303030] mb-2">
//       No Note Selected
//     </h2>
//     <p class="text-[16px] text-[#898989]">
//       Select a note or create a new one to get started.
//     </p>
//     </div>`;
//     return;
//   }
//   container.innerHTML = `
//    <div class="w-[37.5rem] mx-auto">
//     <h2 class="text-2xl font-semibold text-[#303030] mb-1">${note.title}</h2>
//     <p class="text-gray-400 text-sm mb-6">${formatDate(note.date)} / By ${note.author}</p>
//     <p class="text-gray-600 leading-7 whitespace-pre-line">${note.content}</p>
//     </div>
//   `;
// }

// export function renderAddNoteForm({ onSubmit }) {
//   const container = document.getElementById("detailView");
//   container.innerHTML = `

//     <div class=" w-[37.5rem] h-[34.625rem] space-y-4 mx-auto">
//     <h2 class="text-[1.63rem] leading-8 font-semibold text-[#303030] mb-6">Add Note</h2>
//       <div class="w-[31.25rem] h-[4.4375rem]">
//         <label class="block text-gray-500 mb-1">Title*</label>
//         <input id="noteTitle" type="text" class=" w-[31.25rem] h-[2.8125rem] border border-gray-200 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-red-400" />
//       </div>
//       <div class="w-[31.25rem] h-[4.4375rem]">
//         <label class="block text-gray-500 mb-1">Author*</label>
//         <input id="noteAuthor" type="text" class=" w-[31.25rem] h-[2.8125rem] border border-gray-200 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-red-400" />
//       </div>
//       <div>
//         <label class="block text-gray-500 mb-1">Your Note*</label>
//         <textarea id="noteContent" rows="6" class="w-[31.25rem] h-[12rem] border border-gray-200 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-red-400"></textarea>
//       </div>
//       <div class="flex gap-3">
//         <button id="addNoteBtn" class="w-[9rem] h-[2.5rem] bg-[#EC7160] text-white px-5 py-2 rounded hover:bg-[#e05f4d]">Add Note</button>
//         <button id="addPinnedBtn" class="w-[8.625rem] h-[2.5rem] bg-[#EC7160] text-white  px-4 py-2 rounded hover:bg-[#e05f4d]">Add pinned note</button>
//       </div>
//     </div>
//   `;

//   function submitHandler(pinned) {
//     const title = document.getElementById("noteTitle").value.trim();
//     const author = document.getElementById("noteAuthor").value.trim();
//     const content = document.getElementById("noteContent").value.trim();
//     if (!title || !author || !content) {
//       alert("Please complete all required fields.");
//       return;
//     }
//     onSubmit({ title, author, content, pinned });
//   }

//   document
//     .getElementById("addNoteBtn")
//     .addEventListener("click", () => submitHandler(false));
//   document
//     .getElementById("addPinnedBtn")
//     .addEventListener("click", () => submitHandler(true));
// }

import { formatDate } from "../helper.js";

export function renderNoteDetail(note) {
  const container = document.getElementById("detailView");
  if (!note) {
    container.innerHTML = `
      <div class="flex flex-col items-center justify-center min-h-[50vh] md:h-[70vh] text-center mx-auto px-4">
        <h2 class="text-xl md:text-[24px] font-semibold text-[#303030] mb-2">
          No Note Selected
        </h2>
        <p class="text-sm md:text-[16px] text-[#898989]">
          Select a note or create a new one to get started.
        </p>
      </div>`;
    return;
  }
  container.innerHTML = `
    <div class="w-full max-w-[37.5rem] mx-auto px-2">
      <h2 class="text-xl md:text-2xl font-semibold text-[#303030] mb-1 break-words">${note.title}</h2>
      <p class="text-gray-400 text-xs md:text-sm mb-6">${formatDate(note.date)} / By ${note.author}</p>
      <p class="text-gray-600 leading-7 whitespace-pre-line break-words text-sm md:text-base">${note.content}</p>
    </div>
  `;
}

export function renderAddNoteForm({ onSubmit }) {
  const container = document.getElementById("detailView");
  container.innerHTML = `
    <div class="w-full max-w-[37.5rem] space-y-5 mx-auto px-2 pb-12">
      <h2 class="text-xl md:text-[1.63rem] font-semibold text-[#303030] mb-4">Add Note</h2>
      
      <div class="w-full">
        <label class="block text-gray-500 text-sm mb-1">Title*</label>
        <input id="noteTitle" type="text" class="w-full max-w-[31.25rem] h-[2.8125rem] border border-gray-200 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-red-400" />
      </div>
      
      <div class="w-full">
        <label class="block text-gray-500 text-sm mb-1">Author*</label>
        <input id="noteAuthor" type="text" class="w-full max-w-[31.25rem] h-[2.8125rem] border border-gray-200 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-red-400" />
      </div>
      
      <div class="w-full">
        <label class="block text-gray-500 text-sm mb-1">Your Note*</label>
        <textarea id="noteContent" rows="6" class="w-full max-w-[31.25rem] border border-gray-200 rounded px-3 py-2 outline-none focus:ring-1 focus:ring-red-400 min-h-[10rem]"></textarea>
      </div>
      
      <div class="flex flex-wrap gap-3 pt-2">
        <button id="addNoteBtn" class="px-5 h-[2.5rem] bg-[#EC7160] text-white rounded hover:bg-[#e05f4d] text-sm font-medium transition-colors">Add Note</button>
        <button id="addPinnedBtn" class="px-4 h-[2.5rem] bg-[#EC7160] text-white rounded hover:bg-[#e05f4d] text-sm font-medium transition-colors">Add pinned note</button>
      </div>
    </div>
  `;

  function submitHandler(pinned) {
    const title = document.getElementById("noteTitle").value.trim();
    const author = document.getElementById("noteAuthor").value.trim();
    const content = document.getElementById("noteContent").value.trim();
    if (!title || !author || !content) {
      alert("Please complete all required fields.");
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
