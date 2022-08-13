export const generateCourseTemplate = (courseInfo) => {
  `            <li class="no_style_list courses_representation_container_item">
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
  </li>`;
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Full star -> Star
//Half star -> star_half
//Empty star -> grade
function generateRatingInStars(n) {
  fullStar = `<span
            class="material-symbols-rounded courses_representation_container_item_rating_star"
            style="font-size: 1.75rem"
            >star</span
            >`;
  halfStar = `<span
            class="material-symbols-rounded courses_representation_container_item_rating_star"
            style="font-size: 1.75rem"
            >star_half</span
            >`;
  emptyStar = `<span
            class="material-symbols-rounded courses_representation_container_item_rating_star"
            style="font-size: 1.75rem"
            >grade</span
            >`;

  html_text = "";
  count = 5;
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
