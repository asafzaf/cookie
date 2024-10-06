export const handleAxiosError = (error) => {
  if (error.response) {
    // The server responded with a status code outside 2xx
    console.log("Error Response:", error.response.data);
    console.log("Status:", error.response.status);
  } else if (error.request) {
    // The request was made but no response received
    console.log("Request Error:", error.request);
  } else {
    // Something else happened while setting up the request
    console.log("Error Message:", error.message);
  }
};
