import * as Model from "./model.js";
import { renderNotesList } from "./Views/notesView.js";
import { renderNoteDetail, renderAddNoteForm } from "./Views/detailsView.js";

let currentQuery = "";
const isMobile = () => window.matchMedia("(max-width: 767px)").matches;

function showListScreen() {
  if (!isMobile()) return;
  document.getElementById("notesSection").classList.remove("hidden");
  document.getElementById("detailSection").classList.add("hidden");
}

function showDetailScreen() {
  if (!isMobile()) return;
  document.getElementById("notesSection").classList.add("hidden");
  document.getElementById("detailSection").classList.remove("hidden");
}

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
      showDetailScreen();
    },
    onDelete: (id) => {
      Model.deleteNote(id);
      refreshList();
      renderNoteDetail(null);
      showListScreen();
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
  showDetailScreen();
}

function openMobileSidebar() {
  document.getElementById("sidebar").classList.remove("-translate-x-full");
  document.getElementById("sidebarBackdrop").classList.remove("hidden");
}

function closeMobileSidebar() {
  document.getElementById("sidebar").classList.add("-translate-x-full");
  document.getElementById("sidebarBackdrop").classList.add("hidden");
}

function initSidebar() {
  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const view = btn.dataset.view;
      if (view === "add") {
        showAddNoteForm();
      } else {
        renderNoteDetail(null);
        showListScreen();
      }
      closeMobileSidebar();
    });
  });

  document
    .getElementById("addNoteFab")
    .addEventListener("click", showAddNoteForm);

  document
    .getElementById("mobileMenuBtn")
    .addEventListener("click", openMobileSidebar);
  document
    .getElementById("closeSidebarBtn")
    .addEventListener("click", closeMobileSidebar);
  document
    .getElementById("sidebarBackdrop")
    .addEventListener("click", closeMobileSidebar);
}
document.getElementById("mobileSearchBtn").addEventListener("click", () => {
  overlay.classList.remove("hidden");
  overlay.classList.add("flex");
  input.value = "";
  renderResults();
  input.focus();
});

document.getElementById("closeSearchBtn").addEventListener("click", () => {
  overlay.classList.add("hidden");
  overlay.classList.remove("flex");
});

input.addEventListener("input", renderResults);

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

  showListScreen();
}

document.addEventListener("DOMContentLoaded", init);
