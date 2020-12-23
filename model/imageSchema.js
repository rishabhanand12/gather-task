let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let imageSchema = new Schema(
  {
    name: {
      type: String,
    },
    location: {
      type: String,
    },
    imageMetadata: [
      {
        type: Schema.Types.ObjectId,
        ref: "Metadata",
      },
    ],
  },
  { timestamps: true }
);

imageSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj._id;
  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.__v;
  return obj;
};

imageSchema.methods.updateMetadata = function (metadata) {
  this.imageMetadata = this.imageMetadata.concat(metadata);
  return this.save();
};

let Image = mongoose.model("Image", imageSchema);
module.exports = Image;
