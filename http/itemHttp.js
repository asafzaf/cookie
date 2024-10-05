import data from "./server.json";
import axios from "axios";

export const getItems = async () => {
  try {
    const response = await axios.get(data.serverUrl+'/api/v1/item', {
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const obj = JSON.parse(response.request._response);
    return obj;
    
  } catch (error) {
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
  }
};
