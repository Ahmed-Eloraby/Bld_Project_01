//Imports
import { find } from "./json-server-api.js";
import { generateCourseTemplate } from "../templates/course-card.js";

//DOM Elements
const search_form = document.getElementById("search_form");
let category = "python";

//Event Listeners
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

search_form.addEventListener("submit", async (e) => {
  //prevent Reloading
  e.preventDefault();
  //Getting search keyword
  const keyword = search_form["search_text"].value.trim();
  document.getElementById("search_text").value = "";
  //Rendering the courses
  await renderCourses(keyword);
});

const renderCourses_row_size_5 = (listOfCourses) => {
  //Rendering row of size 5
  //Similar behavior to udemy's slider (last item of slide i is the first in slide i+1)
  const numberOfCourses = listOfCourses.length;
  const slider_5 = document.getElementById(`${category}_slider-5`);
  const slider_5_inner = document.getElementById(`${category}_slider_inner-5`);
  slider_5_inner.innerHTML = "";
  if (!numberOfCourses) slider_5.style.visibility = "hidden";
  else slider_5.style.visibility = "visible";
  for (let i = 0; i < numberOfCourses; i += 5 - 1) {
    let row_div = document.createElement("div");
    row_div.classList.add("carousel-item");
    if (!i) row_div.classList.add("active");

    let ul = document.createElement("ul");
    ul.classList.add("row", "row-cols-5");

    let coursesRowHTML = "";
    for (let j = i; j < i + 5 && j < numberOfCourses; j++) {
      let courseCard = generateCourseTemplate(listOfCourses[j]);
      coursesRowHTML += courseCard;
    }
    ul.innerHTML = coursesRowHTML;
    row_div.appendChild(ul);
    slider_5_inner.appendChild(row_div);
  }
};

const renderCourses_row_size_n = (listOfCourses, n) => {
  //Rendering row of size n
  //Each slide has different courses
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
  //Getting courses info
  const listOfCourses = await find(category, keyword);
  //Rendering courses (slides with 5 items)
  renderCourses_row_size_5(listOfCourses);
  //Rendering courses (slides with n items , 1<=n<=4)
  for (let i = 1; i <= 4; i++) renderCourses_row_size_n(listOfCourses, i);
};
