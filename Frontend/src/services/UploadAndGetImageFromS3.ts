import axios from "axios";

export const uploadImageToS3 = async (image: FormData) => {
  const response = await axios.post("http://localhost:5000/api/upload/images", image);
  console.log("🚀 ~ file: UploadAndGetImageFromS3.ts:5 ~ uploadImageToS3 ~ response:", response)
  // return response.data
};

export const getImageFromS3 = async () => {
  const response = await axios.get("http://localhost:5000/api/images");
  console.log("🚀 ~ file: useUploadAndGetImage.ts:10 ~ getImageFromS3 ~ response:", response)
  return response.data
};