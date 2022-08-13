import { find, findAll } from "./json-server-api.js";
import { generateCourseTemplate } from "../templates/course-card.js";

const search_form = document.getElementById("search_form");
search_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const keyword = search_form["search_text"].value.trim();

  document.getElementById("search_text").value = "";
});

// document.addEventListener("DOMContentLoaded", () => {
//   console.log("Balabizo");
// });
