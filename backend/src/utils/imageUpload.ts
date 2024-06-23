import multer, { memoryStorage } from "multer";
import { v2 } from "cloudinary";

// Configure Cloudinary
v2.config({
  cloud_name: process.env.CLOUDINARY_API_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = memoryStorage();
export const upload = multer({ storage });


export const imageUpload = async (req:any, res:any) => {
    try {
      const promises = req.files.map((file: any) => {
        const b64 = Buffer.from(file.buffer).toString("base64");
        let dataURI = "data:" + file.mimetype + ";base64," + b64;
        return handleUpload(dataURI);
      });
      const results = await Promise.all(promises);
      res.send(results);
    } catch (error) {
      res.status(500).send({ message: "Error uploading files" });
    }
  }
const handleUpload = async (file: any) => {
  try {
    const result = await v2.uploader.upload(file, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    throw error;
  }
};
