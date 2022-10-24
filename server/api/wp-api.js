import axios from "axios";

export async function fetchPosts() {
  const response = await axios
    .get("https://promeno.se/wp-json/wp/v2/posts")
    .catch((err) => {
      console.log("Error: ", err.message);
    });
  return response.data;
}

export async function fetchThemes() {
  const response = await axios
    .get("https://promeno.se/wp-json/wp/v2/themes")
    .catch((err) => {
      console.log("Error: ", err.message);
    });
  console.log("response!", response);
  return response.data;
}
