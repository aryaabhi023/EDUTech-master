import axios from "axios";
axios.defaults.withCredentials = true;

const backendUrl = "http://localhost:6004";

export const login = async ({ username, password }) => {
  try {
    const res = await axios.post(backendUrl + "/api/v1/user/login", {
      username,
      password,
    });
    return res;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const registerUser = async ({ fullName, email, username, password }) => {
  try {
    let res = await axios.post(backendUrl + "/api/v1/user/register", {
      fullname:fullName,
      email,
      username,
      password,
    });

    res = login({ username, password });
    return res;
  } catch (error) {
    if (error.response) {
      console.error("Error:", error.response.data);
      return { error: error.response.data };
    } else {
      console.error("Error:", error.message);
      return null;
    }
  }
};

export const logout = async () => {
  try {
    await axios.post(backendUrl + "/api/v1/user/logout");
  } catch (error) {
    console.log(error.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await axios.get(backendUrl + "/api/v1/user/current-user");
    return res;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const refreshAccessToken = async () => {
  try {
    const res = await axios.post(backendUrl + "/api/v1/user/refresh-token");
    return res;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const send = async (email) => {
  try {
    const res = await axios.post(backendUrl + "/api/v1/user/verify-email", {
      email,
    });
    return res;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const verifyEmail = async (email) => {
  try {
    const res = await axios.post(backendUrl + "/api/v1/user/email-exists", {
      email,
    });
    return res.data;
  } catch (error) {
    console.log("hey",error.message);
    return null;
  }
};

export const forgetPassword = async (email, newPassword) => {
  try {
    const res = await axios.post(backendUrl + "/api/v1/user/forget-password", {
      email,
      newPassword,
    });
    return res;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const updateAvatar = async (selectedFile) => {
  if (selectedFile) {
    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      const response = await axios.patch(
        backendUrl + "/api/v1/user/update-avatar",
        formData,
      );
      return response.data;
    } catch (error) {
      console.error("Upload failed:", error);
      return null;
    }
  } else {
    console.error("Please select an image to upload.");
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(backendUrl + "/api/v1/user/all-users");
    return res;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
