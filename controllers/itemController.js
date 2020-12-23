let Metadata = require("../model/metadataSchema");

exports.getItemSummary = async (_req, res, next) => {
  try {
    let itemSummary = await Metadata.aggregate([
      { $match: { className: "barcode" } },
      { $group: { _id: "$code", count: { $sum: 1 } } },
    ]);
    res.json({ itemSummary });
  } catch (err) {
    next(err);
  }
};
