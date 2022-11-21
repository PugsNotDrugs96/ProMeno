import axios from "./serverConnection";

export async function getPostsByCategory(categoryId) {
  const response = await axios.get(`/posts-by-category/${categoryId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export async function getPostById(id) {
  const response = await axios.get(`/post/${id}`, {
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

export async function changePassword(email, currentPassword, newPassword) {
  const response = await axios.post(
    "/change-password",
    { email, currentPassword, newPassword },
    {
      headers: {
        withCredentials: true,
      },
    }
  );
  return response;
}

export async function getResetPasswordLink(email) {
  const response = await axios.post("/reset-password-link", { email });
  return response;
}

export async function validateLink(email, token) {
  const response = await axios.post(
    "/validate-link",
    { email, token },
    {
      headers: {
        withCredentials: true,
      },
    }
  );
  return response;
}

export async function resetPassword(email, newPassword) {
  const response = await axios.post(
    "/reset-password",
    { email, newPassword },
    {
      headers: {
        withCredentials: true,
      },
    }
  );
  return response;
}

export async function deleteAccount(email, password) {
  const response = await axios.post(
    "/delete-account",
    { email, password },
    {
      headers: {
        withCredentials: true,
      },
    }
  );
  return response;
}
