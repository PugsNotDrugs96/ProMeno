import axios from "axios";

export async function fetchPosts() {
  const response = await axios
    .get("https://data.promeno.se/wp-json/wp/v2/posts")
    .catch((err) => {
      console.log("Error: ", err.message);
    });
  return response.data;
}

export async function fetchPostById(id) {
  const response = await axios
    .get(`https://data.promeno.se/wp-json/wp/v2/posts/${id}`)
    .catch((err) => {
      console.log("Error: ", err.message);
    });
  return response.data;
}

export async function fetchThemes() {
  const response = await axios
    .get("https://data.promeno.se/wp-json/wp/v2/themes")
    .catch((err) => {
      console.log("Error: ", err.message);
    });
  return response.data;
}

export async function fetchCategories() {
  const response = await axios
    .get("https://data.promeno.se/wp-json/wp/v2/categories?per_page=100")
    .catch((err) => {
      console.log("Error: ", err.message);
    });
  return response.data;
}
