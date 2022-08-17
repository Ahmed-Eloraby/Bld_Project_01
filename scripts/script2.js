const generateCourseTemplate = (courseInfo) => {
  return `<li class="col no_style_list courses_representation_container_item">
    <figure>
      <img
        class="img-fluid"
        src=${courseInfo.image}
        alt="course_4"
        width="100%"
      />
    </figure>
    <h3>${courseInfo.title}</h3>
    <p>${courseInfo.author}</p>
    <div class="courses_representation_container_item_rating">
      <span
        class="courses_representation_container_item_rating_number"
      >
      ${courseInfo.rating}
      </span>

      ${generateRatingInStars(courseInfo.rating)}
      <p>(${numberWithCommas(courseInfo.numberOfRatings)})</p>
    </div>
    <div class="flex-center">
      <span class="current_price">E£${numberWithCommas(
        courseInfo.currentPrice
      )}</span>
      <span class="original_price">E£${numberWithCommas(
        courseInfo.oldPrice
      )}</span>
    </div>
    ${
      courseInfo.bestSeller
        ? `<div class="flex-center">
    <div class="courses_representation_container_item_bestseller">
      Bestseller
    </div>
  </div>`
        : ""
    }
  </li>`;
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Full star -> Star
//Half star -> star_half
//Empty star -> grade
function generateRatingInStars(n) {
  const fullStar = `<span
            class="material-symbols-rounded courses_representation_container_item_rating_star"
            style="font-size: 1.75rem"
            >star</span
            >`;
  const halfStar = `<span
            class="material-symbols-rounded courses_representation_container_item_rating_star"
            style="font-size: 1.75rem"
            >star_half</span
            >`;
  const emptyStar = `<span
            class="material-symbols-rounded courses_representation_container_item_rating_star"
            style="font-size: 1.75rem"
            >grade</span
            >`;

  let html_text = "";
  let count = 5;
  while (n >= 1.0) {
    html_text += fullStar;
    n--;
    count--;
  }
  if (n > 0) {
    html_text += halfStar;
    count--;
  }
  while (count-- > 0) {
    html_text += emptyStar;
  }
  return html_text;
}

const coursesUrl = "http://localhost:3000/courses";
const getRequest = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  return data;
};

//test

const findAll = async () => {
  const allCourses = await getRequest(coursesUrl);

  return allCourses;
};

const find = async (category, key = "") => {
  let url = coursesUrl + `?category=${category}`;
  if (key) {
    url += `&title_like=${key}`;
  }
  const res = await getRequest(url);

  return res;
};

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
