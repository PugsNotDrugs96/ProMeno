import axios from "axios";

export async function getPosts() {
  const response = await axios("http://localhost:5000/posts");
  return response.data;
}

export async function getCategories() {
  const response = await axios("http://localhost:5000/categories");
  return response.data;
}
