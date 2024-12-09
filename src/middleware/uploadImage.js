const supabase = require("../supabase");
const catchAsync = require("../utils/catchAsync");

const uploadImage = (bucketName) =>
  catchAsync(async (req, res, next) => {
    console.log(req.method);
    if (!req.file && req.method === "POST") {
      return res.status(400).json({ message: "No file uploaded" });
    }
    if (!req.file && req.method === "PUT") {
      console.log("puta gir");
      return next();
    }

    // Upload the file to Supabase storage
    const { data: fileData, error: fileError } = await supabase.storage
      .from(bucketName)
      .upload(`public/${req.file.originalname}`, req.file.buffer, {
        contentType: req.file.mimetype,
        cacheControl: "3600",
        upsert: false,
      });

    if (fileError) {
      return next(new Error(fileError.message));
    }

    // Generate signed URL
    const { data: signedUrlData, error: signedUrlError } =
      await supabase.storage
        .from(bucketName)
        .createSignedUrl(`public/${req.file.originalname}`, 500000 * 50000); // 1-hour expiration

    if (signedUrlError) {
      return res.status(400).json({ message: signedUrlError.message });
    }

    // Store signed URL in the request object
    req.signedUrl = signedUrlData.signedUrl;
    next();
  });

module.exports = uploadImage;
