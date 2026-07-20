import * as Model from "./model.js";
import { renderNotesList } from "./Views/notesView.js";
import { renderNoteDetail, renderAddNoteForm } from "./Views/detailsView.js";

let currentQuery = "";

function refreshList() {
  const source = currentQuery
    ? Model.searchNotes(currentQuery)
    : Model.getAllNotes();
  const pinned = source.filter((n) => n.pinned);
  const unpinned = source.filter((n) => !n.pinned);

  renderNotesList({
    pinned,
    unpinned,
    onSelect: (id) => {
      const note = Model.getNoteById(id);
      renderNoteDetail(note);
    },
    onDelete: (id) => {
      Model.deleteNote(id);
      refreshList();
      renderNoteDetail(null);
    },
  });
}

function showAddNoteForm() {
  renderAddNoteForm({
    onSubmit: ({ title, author, content, pinned }) => {
      const note = Model.addNote({ title, author, content, pinned });
      refreshList();
      renderNoteDetail(note);
    },
  });
}

function initSidebar() {
  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const view = btn.dataset.view;
      if (view === "add") {
        showAddNoteForm();
      } else {
        renderNoteDetail(null);
      }
    });
  });

  document
    .getElementById("addNoteFab")
    .addEventListener("click", showAddNoteForm);
}

function initSearch() {
  document
    .querySelector('input[placeholder="Search"]')
    .addEventListener("input", (e) => {
      currentQuery = e.target.value;
      refreshList();
    });
}

function initToggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleBtn");
  const toggleIcon = document.getElementById("toggleIcon");
  let collapsed = false;

  toggleBtn.addEventListener("click", () => {
    collapsed = !collapsed;
    sidebar.style.width = collapsed ? "0rem" : "16.125rem";
    sidebar.style.paddingLeft = collapsed ? "0" : "";
    toggleIcon.style.transform = collapsed ? "rotate(180deg)" : "rotate(0deg)";
  });
}

function init() {
  initSidebar();
  initSearch();
  initToggleSidebar();
  refreshList();
  renderNoteDetail(null);
}

document.addEventListener("DOMContentLoaded", init);
