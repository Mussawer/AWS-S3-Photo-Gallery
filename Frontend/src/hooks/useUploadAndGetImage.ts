import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getImageFromS3, uploadImageToS3 } from "../services/UploadAndGetImageFromS3";


export const useGetImage = () => {
  const {isLoading, data} = useQuery(['image-from-s3'],  () => getImageFromS3());
  console.log("🚀 ~ file: useUploadAndGetImage.ts:7 ~ useGetImage ~ isLoading:", isLoading)
  return {isLoading, data}
};

export const useUploadImage = () => {
  const queryClient = useQueryClient()
  return useMutation((args: [FormData]) => uploadImageToS3(...args),{
    onSuccess: () => {
      queryClient.invalidateQueries(['image-from-s3'])
    }
  });
};


