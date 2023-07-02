import express from "express";
import upload from "../middlewares/upload.js";
import { getImageFromS3, uploadToS3 } from "../s3.js";

const router = express.Router();

router.get("/images/ping", async (req, res) => {
  res.status(200).send("server is accessible");
});

router.post("/upload/images", upload.single("image"), async (req, res) => {
  try {
    const { file } = req;
    console.log("🚀 ~ file: image.js:14 ~ router.post ~ file:", file);

    const { error, key, response } = uploadToS3({ file, userId: "123" });
    console.log("🚀 ~ file: image.js:17 ~ router.post ~ response:", response);
    console.log("🚀 ~ file: image.js:17 ~ router.post ~ key:", key);
    if (error) {
      return res.status(500).json({ message: error.message });
    }

    let result = {
      success: true,
      key,
      message: "Image Uploaded Successfully",
    };
    res.status(200).send(result);
  } catch (err) {
    let result = {
      success: false,
      message: `${err}    hint: ${err}`,
    };
    res.status(400).send(result);
  }
});

router.get("/images", async (req, res) => {
  try {
    const { error, key } = getImageFromS3({ userId: "123" });
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    let result = {
      success: true,
      key,
      message: "Image Uploaded Successfully",
    };
    res.status(200).send(result);
  } catch (err) {
    let result = {
      success: false,
      message: `${err}    hint: ${err}`,
    };
    res.status(400).send(result);
  }
});

export default router;
