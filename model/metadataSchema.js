let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let metadataSchema = new Schema(
  {
    className: {
      type: String,
    },
    score: {
      type: String,
    },
    imgSize: {
      type: [Number],
    },
    rect: {
      type: [[Number]],
    },
    code: {
      type: String,
    },
  },
  { timestamps: true }
);

metadataSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj._id;
  return obj;
};

let Metadata = mongoose.model("Metadata", metadataSchema);
module.exports = Metadata;
