import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${BASE_URL}/process-image/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}
