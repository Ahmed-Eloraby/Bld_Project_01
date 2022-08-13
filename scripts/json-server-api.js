const coursesUrl = "http://localhost:3000/courses";
const getRequest = async (url) => {
  const res = await fetch(url);
  //   console.log("ads" + res.body);
  const data = await res.json();

  return data;
};

const findAll = async () => {
  const allCourses = await getRequest(coursesUrl);
  allCourses.forEach((element) => {
    console.log({ ...element });
  });
  return allCourses;
};

const find = async (type, key = "") => {
  let url = coursesUrl + `?type=${type}`;
  if (key) {
    url += `&title_like=${key}`;
  }
  const res = await getRequest(url);
  console.log(res);
  console.log(res.length);
  return res;

  //   if (key) {
  //     // not an empty String
  //     let listOfCourses = [];
  //     allCourses.forEach((element) => {
  //       if (element.title.includes(key)) listOfCourses.push(element);
  //     });
  //     allCourses = listOfCourses;
  //   }
  //   return allCourses;
};

export { find, findAll };
