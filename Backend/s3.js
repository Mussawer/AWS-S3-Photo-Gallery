import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";

const region = process.env.REGION
const accessKey = process.env.AWS_ACCESS_KEY
const secretkey = process.env.AWS_SECRET_KEY

const s3 = new S3Client({
    credentials:{
        accessKeyId: accessKey,
        secretAccessKey: secretkey,
        region: region
    }
})
const Bucket = process.env.BUCKET_NAME

export const uploadToS3 = async ({file, userId}) => {
    const key = `${userId}/${uuid()}`
    const command = new PutObjectCommand({Bucket: Bucket, Key: key, Body: file.buffer, ContentType: file.mimetype})
    console.log("🚀 ~ file: s3.js:10 ~ uploadToS3 ~ key:", key)
    try {
        const result = await s3.send(command)
        console.log("🚀 ~ file: s3.js:13 ~ uploadToS3 ~ result:", result)
        return {key}
    } catch (error) {
        return {error}
    }
}