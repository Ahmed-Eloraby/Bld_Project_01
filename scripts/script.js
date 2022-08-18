import { find, findAll } from "./json-server-api.js";
import { generateCourseTemplate } from "../templates/course-card.js";

const search_form = document.getElementById("search_form");
const courses_list = document.getElementById("courses_list");
let category = "python";

search_form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const keyword = search_form["search_text"].value.trim();
  document.getElementById("search_text").value = "";
  await renderCourses(keyword);
});

const renderCourses_row_size_5 = (listOfCourses) => {
  const numberOfCourses = listOfCourses.length;
  console.log(category);
  const slider_5 = document.getElementById(`${category}_slider-5`);
  const slider_5_inner = document.getElementById(`${category}_slider_inner-5`);
  slider_5_inner.innerHTML = "";
  if (!numberOfCourses) slider_5.style.visibility = "hidden";
  else slider_5.style.visibility = "visible";
  let n = 5;
  for (let i = 0; i < numberOfCourses; i += n - 1) {
    let row_div = document.createElement("div");
    row_div.classList.add("carousel-item");
    if (!i) row_div.classList.add("active");

    let ul = document.createElement("ul");
    ul.classList.add("row", "row-cols-5");

    let coursesRowHTML = "";
    for (let j = i; j < i + n && j < numberOfCourses; j++) {
      let courseCard = generateCourseTemplate(listOfCourses[j]);
      coursesRowHTML += courseCard;
    }
    ul.innerHTML = coursesRowHTML;
    row_div.appendChild(ul);
    slider_5_inner.appendChild(row_div);
  }
};

const renderCourses_row_size_n = (listOfCourses, n) => {
  const numberOfCourses = listOfCourses.length;

  const slider_n = document.getElementById(`${category}_slider-${n}`);
  const slider_n_inner = document.getElementById(
    `${category}_slider_inner-${n}`
  );
  slider_n_inner.innerHTML = "";
  if (!numberOfCourses) slider_n.style.visibility = "hidden";
  else slider_n.style.visibility = "visible";
  for (let i = 0; i < numberOfCourses; i += n) {
    let row_div = document.createElement("div");
    row_div.classList.add("carousel-item");
    if (!i) row_div.classList.add("active");

    let ul = document.createElement("ul");
    ul.classList.add("row", `row-cols-${n}`);

    let coursesRowHTML = "";
    for (let j = i; j < i + n && j < numberOfCourses; j++) {
      let courseCard = generateCourseTemplate(listOfCourses[j]);
      coursesRowHTML += courseCard;
    }
    ul.innerHTML = coursesRowHTML;
    row_div.appendChild(ul);
    slider_n_inner.appendChild(row_div);
  }
};

const renderCourses = async (keyword) => {
  const listOfCourses = await find(category, keyword);
  renderCourses_row_size_5(listOfCourses);
  for (let i = 1; i <= 4; i++) renderCourses_row_size_n(listOfCourses, i);
};
window.onload = async () => {
  await renderCourses("");
  const all_tabs = document.querySelectorAll(".nav-item");
  //adding event listener for each tab to change 'category' variable

  all_tabs.forEach((x) =>
    x.addEventListener("click", async () => {
      category = x.getAttribute("role");
      await renderCourses("");
    })
  );
};

//Plz Work :(
// window.onload = function (e) {
//   document.forms["search_form"].submit();
// };
// search_form.submit();
// };

// document.addEventListener("DOMContentLoaded", (e) => {
//   // e.preventDefault;
//   search_form.submit();
//   e.preventDefault();
// });
