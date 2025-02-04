import axios from "axios";
import { handleAxiosError } from "./axios.error";

const data = {
  serverUrl: process.env.EXPO_PUBLIC_API_URL,
};

export const loginBackend = async (email, uid) => {
  try {
    const response = await axios.post(data.serverUrl + "/api/v1/auth/login", {
      email,
      uid,
    });
    const obj = JSON.parse(response.request._response);
    return obj;
  } catch (error) {
    handleAxiosError("login", error);
  }
};

export const signUpBackend = async (user) => {
  try {
    const response = await axios.post(data.serverUrl + "/api/v1/auth/signup", {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      userId: user.userId,
    });
    const obj = JSON.parse(response.request._response);
    return obj;
  } catch (error) {
    handleAxiosError("signup", error);
  }
};

export const getUserById = async (token, userId) => {
  try {
    const response = await axios.get(
      data.serverUrl + "/api/v1/user/" + userId,
      {
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const obj = JSON.parse(response.request._response);
    return obj;
  } catch (error) {
    handleAxiosError("getUserById", error);
  }
};

// export const createUser = async (user) => {
//   try {
//     const response = await axios.post(data.serverUrl + "/api/v1/user", user, {
//       timeout: 5000,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const obj = JSON.parse(response.request._response);
//     return obj;
//   } catch (error) {
//     handleAxiosError("ceateUser", error);
//   }
// };

// export const updateUser = async (user) => {
//   try {
//     const response = await axios.put(data.serverUrl + "/api/v1/user", user, {
//       timeout: 5000,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const obj = JSON.parse(response.request._response);
//     return obj;
//   } catch (error) {
//     handleAxiosError("updateUser", error);
//   }
// };

// export const deleteUser = async () => {
//   try {
//     const response = await axios.delete(data.serverUrl + "/api/v1/user", {
//       timeout: 5000,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const obj = JSON.parse(response.request._response);
//     return obj;
//   } catch (error) {
//     handleAxiosError("deleteUser", error);
//   }
// };

export const changeUserLanguage = async (token, userId, language) => {
  try {
    const response = await axios.put(
      data.serverUrl + "/api/v1/user/" + userId + "/language",
      { language },
      {
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const obj = JSON.parse(response.request._response);
    return obj;
  } catch (error) {
    handleAxiosError("changeLanguage", error);
  }
};

// export const getToken = async (userId) => {
//   try {
//     const response = await axios.get(
//       data.serverUrl + "/api/v1/user/" + userId + "/token",
//       {
//         timeout: 5000,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const obj = JSON.parse(response.request._response);
//     return obj;
//   } catch (error) {
//     handleAxiosError("getToken", error);
//   }
// };
