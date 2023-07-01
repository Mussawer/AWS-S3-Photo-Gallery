import axios from "axios";

export const uploadImageToS3 = async (url: string, image: FormData) => {
  console.log("🚀 ~ file: UploadAndGetImageFromS3.ts:4 ~ uploadImageToS3 ~ url:", url)
  const response = await axios.post(url, image);
  console.log("🚀 ~ file: UploadAndGetImageFromS3.ts:6 ~ uploadImageToS3 ~ response:", response)
  // return response.data
};

export const getImageFromS3 = async (url: string) => {
  const response = await axios.get(url);
  console.log("🚀 ~ file: useUploadAndGetImage.ts:10 ~ getImageFromS3 ~ response:", response)
  return response.data
};