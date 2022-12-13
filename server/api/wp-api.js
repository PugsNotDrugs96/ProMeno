import axios from "axios";

export async function fetchPost(slug) {
  const response = await axios
    .get(`https://data.promeno.se/wp-json/wp/v2/posts?slug=${slug}`)
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

export async function fetchCategoryBySlug(slug) {
  const response = await axios
    .get(`https://data.promeno.se/wp-json/wp/v2/categories?slug=${slug}`)
    .catch((err) => {
      console.log("Error: ", err.message);
    });
  return response.data[0];
}

export async function fetchCategoryIdBySlug(slug) {
  const response = await axios
    .get(
      `https://data.promeno.se/wp-json/wp/v2/categories?slug=${slug}&_fields[]=id`
    )
    .catch((err) => {
      console.log("Error: ", err.message);
    });
  return response.data[0].id;
}

export async function fetchPostsByCategory(categoryId) {
  const response = await axios
    .get(`https://data.promeno.se/wp-json/wp/v2/posts?categories=${categoryId}`)
    .catch((err) => {
      console.log("Error: ", err.message);
    });
  return response.data;
}
