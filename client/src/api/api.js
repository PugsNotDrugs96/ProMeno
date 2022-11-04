import axios from "./serverConnection";

export async function getPosts() {
  const response = await axios.get("/posts", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export async function getPostById(id) {
  const response = await axios.get(`/posts/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export async function getCategories() {
  const response = await axios.get("/categories");
  return response.data;
}

export async function loginUser(email, password) {
  const response = await axios.post(
    "/auth",
    { email, password },
    {
      headers: {
        withCredentials: true,
      },
    }
  );
  return response;
}

export async function changePassword(email, oldPassword, newPassword) {
  const response = await axios.post(
    "/password/change",
    { email, oldPassword, newPassword },
    {
      headers: {
        withCredentials: true,
      },
    }
  );
  return response;
}
