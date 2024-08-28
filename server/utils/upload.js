import multer from "multer";

let upload;
try {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `./uploads`);
    },
    filename: (req, file, cb) => {
      cb(null, `image-${Date.now()}.${file.originalname}`);
    },
  });
  upload = multer({
    storage,
  });
} catch (error) {
  console.log(error.message);
}
export default upload;
