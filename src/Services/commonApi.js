import axios from "axios";

const api = async (method, url, data) => {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    if (method == "get") {
      const response = await axios.get(url);
      return response.data;
    } else if (method == "post") {
      const response = await axios.post(url, data, { headers });
      return response.data;
    } else if (method == "put") {
      const response = await axios.put(url, data);
      return response.data;
    } else if (method == "patch") {
      const response = await axios.patch(url, data);
      return response.data;
    }
  } catch (error) {
    console.log("something went wrong....");
  }
};
export default api;
