const generateCourseTemplate = (courseInfo) => {
  return `<li class="no_style_list courses_representation_container_item">
    <figure>
      <img
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

const find = async (type, key = "") => {
  let url = coursesUrl + `?type=${type}`;
  if (key) {
    url += `&title_like=${key}`;
  }
  const res = await getRequest(url);

  return res;
};

const search_form = document.getElementById("search_form");
const courses_list = document.getElementById("courses_list");
let type = "python";

search_form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const keyword = search_form["search_text"].value.trim();
  document.getElementById("search_text").value = "";
  await renderCourses(keyword);
});

const renderCourses = async (keyword) => {
  const listOfCourses = await find(type, keyword);

  let coursesListHTML = "";
  listOfCourses.forEach((courseInfo) => {
    coursesListHTML += generateCourseTemplate(courseInfo);
  });
  courses_list.innerHTML = coursesListHTML;
};
window.onload = async () => {
  await renderCourses("");
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
