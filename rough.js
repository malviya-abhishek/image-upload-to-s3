// const fs = require("fs");
// const util = require("util");
// const unlinkFile = util.promisify(fs.unlink);

// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

// const {
//   uploadFile,
//   getFileStream,
//   deleteFile,
// } = require("./app/services/s3.service.js");

// app.get("/images/:key", (req, res) => {
//   console.log("image get", req.params);
//   const key = req.params.key;
//   const readStream = getFileStream(key);
//   readStream.pipe(res);
// });

// app.post("/images", upload.single("image"), async (req, res) => {
//   const file = req.file;
//   console.log("post", file);
//   const result = await uploadFile(file);
//   await unlinkFile(file.path);
//   console.log("file uploaded", result);
//   const description = req.body.description;
//   res.send({ imagePath: `/images/${result.Key}` });
// });

// app.delete("/images/:key", (req, res) => {
//   console.log("Delete", req.params);
//   const key = req.params.key;

//   deleteFile(key)
//     .then((data) => {
//       console.log("File deleted", data);
//       res.send("file deleted");
//     })
//     .catch((err) => {
//       console.log("File failed to delete", err);
//       res.send("File failed to delete");
//     });
// });
