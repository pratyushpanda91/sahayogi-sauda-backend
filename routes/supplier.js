// const express_supplier = require("express");
// const router_supplier = express_supplier.Router();
// const auth_supplier = require("../middleware/auth");
// const Deal_supplier = require("../models/Deal");

// // @route   GET api/supplier/filled-deals
// // @desc    Get all filled deals for the supplier's market area
// // @access  Private (Suppliers only)
// router_supplier.get("/filled-deals", auth_supplier, async (req, res) => {
//   if (req.user.role !== "supplier") {
//     return res
//       .status(403)
//       .json({ msg: "Access denied. Only suppliers can view this." });
//   }
//   try {
//     const deals = await Deal_supplier.find({
//       marketArea: req.user.marketArea,
//       status: "filled",
//     })
//       .populate("createdBy", "name phone")
//       .sort({ updatedAt: -1 }); // Sort by when it was filled
//     res.json(deals);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// // @route   PUT api/supplier/confirm/:dealId
// // @desc    Confirm a filled deal
// // @access  Private (Suppliers only)
// router_supplier.put("/confirm/:dealId", auth_supplier, async (req, res) => {
//   if (req.user.role !== "supplier") {
//     return res.status(403).json({ msg: "Access denied." });
//   }
//   try {
//     let deal = await Deal_supplier.findById(req.params.dealId);
//     if (!deal) {
//       return res.status(404).json({ msg: "Deal not found." });
//     }
//     if (deal.marketArea !== req.user.marketArea) {
//       return res
//         .status(403)
//         .json({ msg: "This deal is not in your market area." });
//     }
//     if (deal.status !== "filled") {
//       return res
//         .status(400)
//         .json({
//           msg: "This deal cannot be confirmed as it is not filled yet.",
//         });
//     }

//     deal.status = "confirmed";
//     await deal.save();
//     res.json(deal);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// module.exports = router_supplier;

const express_supplier = require("express");
const router_supplier = express_supplier.Router();
const auth_supplier = require("../middleware/auth");
const Deal_supplier = require("../models/Deal");

// @route   GET api/supplier/filled-deals
// @desc    Get all filled (but not yet confirmed) deals for the supplier's market area
// @access  Private (Suppliers only)
router_supplier.get("/filled-deals", auth_supplier, async (req, res) => {
  if (req.user.role !== "supplier") {
    return res.status(403).json({ msg: "Access denied." });
  }
  try {
    const deals = await Deal_supplier.find({
      marketArea: req.user.marketArea,
      status: "filled", // Only fetch deals that need action
    })
      .populate("createdBy", "name phone")
      .sort({ updatedAt: -1 });
    res.json(deals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/supplier/confirmed-deals
// @desc    Get all deals already confirmed by the supplier
// @access  Private (Suppliers only)
router_supplier.get("/confirmed-deals", auth_supplier, async (req, res) => {
  if (req.user.role !== "supplier") {
    return res.status(403).json({ msg: "Access denied." });
  }
  try {
    const deals = await Deal_supplier.find({
      marketArea: req.user.marketArea,
      status: "confirmed", // Only fetch deals that are already accepted
    })
      .populate("createdBy", "name phone")
      .sort({ updatedAt: -1 });
    res.json(deals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/supplier/confirm/:dealId
// @desc    Confirm a filled deal
// @access  Private (Suppliers only)
router_supplier.put("/confirm/:dealId", auth_supplier, async (req, res) => {
  if (req.user.role !== "supplier") {
    return res.status(403).json({ msg: "Access denied." });
  }
  try {
    let deal = await Deal_supplier.findById(req.params.dealId);
    if (!deal) return res.status(404).json({ msg: "Deal not found." });
    if (deal.marketArea !== req.user.marketArea)
      return res
        .status(403)
        .json({ msg: "This deal is not in your market area." });
    if (deal.status !== "filled")
      return res.status(400).json({ msg: "This deal cannot be confirmed." });

    deal.status = "confirmed";
    await deal.save();
    res.json(deal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router_supplier;
