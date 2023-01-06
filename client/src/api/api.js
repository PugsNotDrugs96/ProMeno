import axios from "./serverConnection";
import { getToken } from "../tokenStorage";

export async function getPostsByCategory(slug) {
  const response = await axios.get(`/posts-by-category/${slug}`, {
    headers: {
      "Content-Type": "application/json",
      auth: getToken(),
    },
  });
  return response.data;
}

export async function getPostBySlug(slug) {
  const response = await axios
    .get(`/posts/${slug}`, {
      headers: {
        "Content-Type": "application/json",
        auth: getToken(),
      },
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response.data;
}

export async function getCategories() {
  const response = await axios
    .get("/categories", {
      headers: {
        withCredentials: true,
        auth: getToken(),
      },
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response.data;
}

export async function getCategoryBySlug(slug) {
  const response = await axios
    .get(`/categories/${slug}`, {
      headers: {
        "Content-Type": "application/json",
        auth: getToken(),
      },
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response.data;
}

export async function validateToken() {
  const response = await axios.post("/auth-token", {
    headers: {
      withCredentials: true,
      auth: getToken(),
    },
  });
  return response;
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

export async function registerUser(name, email, password) {
  const response = await axios.post(
    "/register",
    { name, email, password },
    {
      headers: {
        withCredentials: true,
      },
    }
  );
  return response;
}

export async function changePassword(user, currentPassword, newPassword) {
  const response = await axios.post(
    "/change-password",
    { user, currentPassword, newPassword },
    {
      headers: {
        withCredentials: true,
        auth: getToken(),
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

export async function validateCode(code) {
  const response = await axios.post(
    "/validate-code",
    { code },
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

export async function getNameByEmail(email) {
  const response = await axios.post(
    "/profile",
    { email },
    {
      headers: {
        withCredentials: true,
      },
    }
  );
  return response;
}
