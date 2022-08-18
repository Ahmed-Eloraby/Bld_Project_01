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

export { find, findAll };
