import React, { FC, ChangeEvent } from 'react'
import { useUploadImage } from '../hooks/useUploadAndGetImage';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface FileInputProps {
  
}

const URL: string = 'url';

const FileInput: FC<FileInputProps> = () => {

  const {mutate: uploadImageToS3} = useUploadImage()

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = (event?.target.files as FileList)[0];
    console.log("🚀 ~ file: FileInput.tsx:13 ~ handleUpload ~ file:", file)
    const form = new FormData()
    form.append('image', file)
    uploadImageToS3([URL, form])
  }

  return (
    <div className='flex flex-col w-full'>
        <Input id="picture" type="file" hidden onChange={handleUpload}/>
        <Button className='m-2 w-3/12' >
            Upload
        </Button>
    </div>
  )
}

export default FileInput;