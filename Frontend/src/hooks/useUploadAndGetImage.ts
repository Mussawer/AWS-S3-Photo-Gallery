import { useMutation, useQuery } from "@tanstack/react-query";
import { getImageFromS3, uploadImageToS3 } from "../services/UploadAndGetImageFromS3";


export const useGetImage = () => {
  return useQuery(['image-from-s3'],  () => getImageFromS3, {
    onSuccess: (data) => {
      // Handle successful query result
      console.log("Image fetched successfully:", data);
    },
    onError: error => {
      // Handle query error
      console.error("Error fetching image:", error);
    },
  });
};

export const useUploadImage = () => {
  return useMutation((args: [string, FormData | null | undefined]) => uploadImageToS3(...args));
};
