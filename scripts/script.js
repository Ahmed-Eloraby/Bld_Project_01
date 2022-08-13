import { find, findAll } from "./json-server-api.js";
import { generateCourseTemplate } from "../templates/course-card.js";

const search_form = document.getElementById("search_form");
const courses_list = document.getElementById("courses_list");
let type = "python";

search_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const keyword = search_form["search_text"].value.trim();
  document.getElementById("search_text").value = "";

  const listOfCourses = await find(type, keyword);
  console.log(listOfCourses);
  const coursesListHTML = renderCourses(listOfCourses);
  courses_list.innerHTML = coursesListHTML;
});

const renderCourses = (listOfCourses) => {
  let coursesListHTML = "";
  listOfCourses.forEach((courseInfo) => {
    // console.log(courseInfo);
    coursesListHTML += generateCourseTemplate(courseInfo);

    // console.log(coursesListHTML);
  });
  return coursesListHTML;
};

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
