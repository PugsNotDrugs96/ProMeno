import axios from "axios";

async function fetchPosts() {
  const response = await axios
    .get("https://promeno.se/wp-json/wp/v2/posts")
    .catch((err) => {
      console.log("Error: ", err.message);
    });
  return response.data;
}

export default fetchPosts;
