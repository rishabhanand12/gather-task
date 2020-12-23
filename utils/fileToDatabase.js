// SCRIPT TO ADD IMAGES AND JSON FILES TO A DATABASE

let mongoose = require("mongoose");
let fs = require("fs");
let path = require("path");
let aws = require("aws-sdk");
require("dotenv").config();
let Image = require("./model/imageSchema");
let MetaData = require("./model/metadataSchema");

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    console.error(err);
  }
);

//  creating an AWS S3 bucket object
let s3bucket = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  Bucket: process.env.BUCKET_NAME,
});

imgArr = [
  "img0000.jpg",
  "img0001.jpg",
  "img0002.jpg",
  "img0003.jpg",
  "img0004.jpg",
  "img0005.jpg",
  "img0006.jpg",
  "img0007.jpg",
  "img0008.jpg",
  "img0009.jpg",
  "img0010.jpg",
  "img0011.jpg",
  "img0012.jpg",
  "img0013.jpg",
  "img0014.jpg",
  "img0015.jpg",
  "img0016.jpg",
  "img0017.jpg",
  "img0018.jpg",
  "img0019.jpg",
  "img0020.jpg",
  "img0021.jpg",
  "img0022.jpg",
  "img0023.jpg",
];

jsonArr = [
  "img0000.json",
  "img0001.json",
  "img0002.json",
  "img0003.json",
  "img0004.json",
  "img0005.json",
  "img0006.json",
  "img0007.json",
  "img0008.json",
  "img0009.json",
  "img0010.json",
  "img0011.json",
  "img0012.json",
  "img0013.json",
  "img0014.json",
  "img0015.json",
  "img0016.json",
  "img0017.json",
  "img0018.json",
  "img0019.json",
  "img0020.json",
  "img0021.json",
  "img0022.json",
  "img0023.json",
];

// iterating over the image array and uploading images to S3 bucket
imgArr.forEach(async (file) => {
  var filepath = path.resolve(path.dirname(__filename), "files", file);
  uploadToS3(filepath);
});

function uploadToS3(filepath) {
  var data = fs.readFileSync(filepath);
  var key = path.basename(filepath);
  var params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Body: data,
    ContentType: "image/jpg",
    ACL: "public-read",
  };
  s3bucket.upload(params, async (err, data) => {
    if (err) {
      console.log("Upload failed");
      console.log(err);
    }
    await updateDatabase(data); // add image path and metadata to database once AWS update is complete
  });
}

async function updateDatabase(uploadedData) {
  // function to update the database
  let imgName = uploadedData.key.split(".")[0];
  let newImage = await Image.create({
    name: imgName,
    location: uploadedData.Location,
  });
  updateImageMetadata(newImage);
}

async function updateImageMetadata(image) {
  let indexofJson = jsonArr.indexOf(`${image.name}.json`);
  let jsonFilePath = path.resolve(
    path.dirname(__filename),
    "files",
    jsonArr[indexofJson]
  );
  let jsonData = JSON.parse(fs.readFileSync(jsonFilePath).toString());
  console.log(jsonData.length);
  let data = await Promise.all(
    jsonData.map(async (elem) => {
      let newMetadata = await MetaData.create({
        className: elem.className,
        score: elem.score,
        imgSize: elem.imgSize,
        rect: elem.rect,
        code: elem.code,
      });
      return newMetadata.id;
    })
  );
  image.updateMetadata(data);
}
