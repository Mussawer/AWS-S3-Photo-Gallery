import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuid } from "uuid";

const region = process.env.REGION;
const accessKey = process.env.AWS_ACCESS_KEY;
const secretkey = process.env.AWS_SECRET_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretkey,
    region: region,
  },
});
const Bucket = process.env.BUCKET_NAME;

export const uploadToS3 = async ({ file, userId }) => {
  try {
    const key = `${userId}/${uuid()}`;
    const command = new PutObjectCommand({
      Bucket: Bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await s3.send(command);
    return { key };
  } catch (error) {
    console.log("🚀 ~ file: s3.js:37 ~ uploadToS3 ~ error:", error)
    return { error };
  }
};

export const getImageKeysFromS3ByUserId = async ({ userId }) => {
  try {
    const key = `${userId}/`;
    const command = new ListObjectsV2Command({
      Bucket: Bucket,
      prefix: key,
    });
    const { Contents = [] } = await s3.send(command);
    return Contents.sort(
      (a, b) => new Date(b.LastModified) - new Date(a.LastModified)
    ).map((image) => image.Key);
  } catch (error) {
    console.log("🚀 ~ file: s3.js:49 ~ getImageFromS3 ~ error:", error);
    return { error };
  }
};

export const getUserPresignedUrls = async ({ userId }) => {
  try {
    const imageKeys = await getImageKeysFromS3ByUserId(userId);
    const presignedUrls = await Promise.allSettled(
      imageKeys.map((key) => {
        const command = new GetObjectCommand({
          Bucket: Bucket,
          Key: key,
        });
        return getSignedUrl(s3, command, { expiresIn: 900 });
      })
    );
    return {presignedUrls}
  } catch (error) {
    console.log("🚀 ~ file: s3.js:72 ~ getUserPresignedUrls ~ error:", error)
    return {error}
  }
};
