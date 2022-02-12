const mongoose = require("../../services/mongoose.service").mongoose;
const Schema = mongoose.Schema;

const imageSchema = new Schema(
  {
    name: String,
    url: String,
  },
  { timestamps: true }
);

imageSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

imageSchema.set("toJSON", {
  virtuals: true,
});

imageSchema.findById = function (cb) {
  return this.model("Image").find({ id: this.id }, cb);
};

const Image = mongoose.model('Image', imageSchema);


exports.createImage = (imageData) =>{
  const image = new Image(imageData);
  return image.save();
}


exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Image.find({ })
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, images) {
        if (err) reject(err);
        else {
          const newImages = [];
            images.forEach((image) => {
            image = image.toJSON();
            delete image.__v;
            delete image._id;
            newImages.push(image);
          });
          resolve(newImages);
        }
      });
  });
};

exports.findById = (id) => {
  return Image.findById(id).then((result) => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  });
};

exports.deleteById = (id) => {
  return Image.deleteOne({id : id})
}