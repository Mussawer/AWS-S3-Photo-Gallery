import React, { FC, ChangeEvent, useState, MouseEvent } from 'react'
import { useUploadImage } from '../hooks/useUploadAndGetImage';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface FileInputProps {
  
}

const FileInput: FC<FileInputProps> = () => {
  const {mutate: uploadImageToS3} = useUploadImage()

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = (event?.target.files as FileList)[0];
    console.log("🚀 ~ file: FileInput.tsx:13 ~ handleUpload ~ file:", file)
    const form = new FormData()
    form.append('image', file)
    uploadImageToS3([form])
    event.target.value = ''
  }

  return (
    <div className='flex flex-col w-full'>
        <Input id="picture" type="file" className='m-2 w-3/12' onChange={handleUpload}/>
        <Button className='m-2 w-3/12'>
            Upload
        </Button>
       
    </div>
  )
}

export default FileInput;