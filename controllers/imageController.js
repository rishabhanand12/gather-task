let Image = require("../model/imageSchema");
let Metadata = require("../model/metadataSchema");

exports.getImages = async (_req, res, next) => {
  try {
    let images = await Image.find({}, "name location");
    images = images.map((elem) => elem.toJSON());
    res.json({ images });
  } catch (err) {
    next(err);
  }
};

exports.getImageDataByName = async (req, res, next) => {   
  try {
    let { name } = req.params;
    let image = await Image.findOne({ name: name })   // image lookup in database using image name received along with the req url
      .populate("imageMetadata")
      .exec();
    image = image.toJSON();
    image.imageMetadata = image.imageMetadata.map((elem) => {
      delete elem._id;
      delete elem.createdAt;
      delete elem.updatedAt;
      delete elem.__v;
      return elem;
    });
    let codeTally = calcCodeTally(image.imageMetadata);
    res.json({ image, codeTally });     // responding with image data and the code count summary for that image
  } catch (err) {
    next(err);
  }
};

function calcCodeTally(metadata) {   // function to return the code count as an array
  let obj = metadata
    .filter((elem) => elem.className == "barcode")
    .map((elem) => elem.code)
    .reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});

  let codeTally = Object.keys(obj).map((key) => {
    return {
      _id: key,
      count: obj[key],
    };
  });
  return codeTally;
}
