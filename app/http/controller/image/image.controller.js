const path = require("path");
const fs = require("fs-extra");
const ImageModel = require("../../../model/image/image.model");


exports.uploadImage = (req, res) => {
  const newImage = {};
  req.pipe(req.busboy);
  req.busboy.on("field", (fieldname, value) => {
    newImage[fieldname] = value;
  });
  req.busboy.on("file", (fieldname, file,  fileDetail) => {
      const uploadPath = path.join(__dirname, "../../../../public/images");
      const fileName = Date.now() + "-" + Math.round(Math.random() * 1e9) + "-" + fileDetail.filename;
      const fstream = fs.createWriteStream(path.join(uploadPath, fileName));
      file.pipe(fstream);

      fstream.on("close", () => {
        newImage.url = fileName;
        ImageModel.createImage(newImage)
          .then((result) => {
            res.sendStatus(202);
          })
          .catch((err) => {
            res.sendStatus(500);
          });;
      });

  });
};

exports.getImages = (req, res) =>{
    	let limit =
        req.query.limit && req.query.limit <= 100
          ? parseInt(req.query.limit)
          : 20;
      let page = 0;
      if (req.query) {
        if (req.query.page) {
          req.query.page = parseInt(req.query.page);
          page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
      }
      ImageModel.list(limit, page).then((result) => {
        res.status(200).send(result);
      });
}

exports.getImage = (req, res) =>{
    ImageModel.findById(req.params.id).then( (result)=>{
        res.status(200).send(result)
    } )
}

exports.deleteImage = (req, res) => {
    ImageModel.findById(req.params.id).then((result)=>{
        const uploadPath = path.join(__dirname, "../../../../public/images");
        const fileName = result.url;
        const filePath = path.join(uploadPath, fileName);
        fs.unlinkSync(filePath)
        
        ImageModel.deleteById(req.params.id).then((result) => {
            res.status(200).send(result);
        });
    })
};
