import React, { FC, ChangeEvent, useState, MouseEvent } from "react";
import { useGetImage, useUploadImage } from "../hooks/useUploadAndGetImage";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface FileInputProps {}

type presignedUrl = {
  status: string;
  value: string;
};

const FileInput: FC<FileInputProps> = () => {
  const { mutate: uploadImageToS3 } = useUploadImage();
  const { isLoading, data } = useGetImage();

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = (event?.target.files as FileList)[0];
    const form = new FormData();
    form.append("image", file);
    uploadImageToS3([form]);
    event.target.value = "";
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col w-full">
        <Input
          id="picture"
          type="file"
          className="m-2 w-3/12"
          onChange={handleUpload}
        />
        <Button className="m-2 w-3/12">Upload</Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {data?.presignedUrls?.map((image: presignedUrl) => (
          <img src={image?.value} key={image?.value} height={"250px"} width={"250px"}/>
        ))}
      </div>
    </>
  );
};

export default FileInput;
