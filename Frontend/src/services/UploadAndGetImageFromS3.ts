import axios from "axios";

export const uploadImageToS3 = async (url: string, image: FormData) => {
  const response = await axios.post(url, image);
  return response.data
};

export const getImageFromS3 = async (url: string) => {
  const response = await axios.get(url);
  console.log("🚀 ~ file: useUploadAndGetImage.ts:10 ~ getImageFromS3 ~ response:", response)
  return response.data
};