import axios from "axios";

export const uploadImageToS3 = async (image: FormData) => {
  console.log("🚀 ~ file: UploadAndGetImageFromS3.ts:4 ~ uploadImageToS3 ~ image:", image)
  const response = await axios.post("http://localhost:5000/api/upload/images", image);
  console.log("🚀 ~ file: UploadAndGetImageFromS3.ts:6 ~ uploadImageToS3 ~ response:", response)
  // return response.data
};

export const getImageFromS3 = async (url: string) => {
  console.log("🚀 ~ file: UploadAndGetImageFromS3.ts:12 ~ getImageFromS3 ~ url:", url)
  const response = await axios.get("http://localhost:5000/api/images");
  console.log("🚀 ~ file: useUploadAndGetImage.ts:10 ~ getImageFromS3 ~ response:", response)
  return response.data
};