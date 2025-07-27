// // const express_deals = require("express");
// // const router_deals = express_deals.Router();
// // const auth_deals = require("../middleware/auth");
// // const Deal_deals = require("../models/Deal");
// // const Participation_deals = require("../models/Participation");
// // const User_deals = require("../models/User");

// // // @route   POST api/deals
// // // @desc    Create a new deal
// // // @access  Private (Vendors only)
// // router_deals.post("/", auth_deals, async (req, res) => {
// //   if (req.user.role !== "vendor") {
// //     return res
// //       .status(403)
// //       .json({ msg: "Access denied. Only vendors can create deals." });
// //   }

// //   const { itemName, targetQuantity, pricePerUnit, unit } = req.body;

// //   try {
// //     const newDeal = new Deal_deals({
// //       itemName,
// //       targetQuantity,
// //       pricePerUnit,
// //       unit,
// //       marketArea: req.user.marketArea,
// //       createdBy: req.user.id,
// //     });

// //     const deal = await newDeal.save();
// //     res.json(deal);
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).send("Server Error");
// //   }
// // });

// // // @route   GET api/deals
// // // @desc    Get all active deals for the user's market area
// // // @access  Private (Vendors)
// // router_deals.get("/", auth_deals, async (req, res) => {
// //   if (req.user.role !== "vendor") {
// //     return res.status(403).json({ msg: "Access denied." });
// //   }
// //   try {
// //     const deals = await Deal_deals.find({
// //       marketArea: req.user.marketArea,
// //       status: "active",
// //     }).sort({ createdAt: -1 });
// //     res.json(deals);
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).send("Server Error");
// //   }
// // });

// // // @route   POST api/deals/join/:dealId
// // // @desc    Join a deal
// // // @access  Private (Vendors only)
// // router_deals.post("/join/:dealId", auth_deals, async (req, res) => {
// //   if (req.user.role !== "vendor") {
// //     return res
// //       .status(403)
// //       .json({ msg: "Access denied. Only vendors can join deals." });
// //   }

// //   const { quantity } = req.body;
// //   if (!quantity || quantity <= 0) {
// //     return res.status(400).json({ msg: "Please provide a valid quantity." });
// //   }

// //   try {
// //     const deal = await Deal_deals.findById(req.params.dealId);
// //     if (!deal) {
// //       return res.status(404).json({ msg: "Deal not found" });
// //     }
// //     if (deal.status !== "active") {
// //       return res.status(400).json({ msg: "This deal is no longer active." });
// //     }

// //     // Check if user has already joined
// //     const existingParticipation = await Participation_deals.findOne({
// //       dealId: req.params.dealId,
// //       vendorId: req.user.id,
// //     });
// //     if (existingParticipation) {
// //       return res
// //         .status(400)
// //         .json({ msg: "You have already joined this deal." });
// //     }

// //     // Create new participation
// //     const participation = new Participation_deals({
// //       dealId: req.params.dealId,
// //       vendorId: req.user.id,
// //       quantity,
// //     });
// //     await participation.save();

// //     // Update the deal's current quantity
// //     deal.currentQuantity += quantity;

// //     // Check if the deal is now filled
// //     if (deal.currentQuantity >= deal.targetQuantity) {
// //       deal.status = "filled";
// //     }

// //     await deal.save();

// //     res.json(deal);
// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).send("Server Error");
// //   }
// // });

// // module.exports = router_deals;

// const express_deals = require("express");
// const router_deals = express_deals.Router();
// const auth_deals = require("../middleware/auth");
// const Deal_deals = require("../models/Deal");
// const Participation_deals = require("../models/Participation");
// const User_deals = require("../models/User");

// // @route   POST api/deals
// // @desc    Create a new deal
// // @access  Private (Vendors only)
// router_deals.post("/", auth_deals, async (req, res) => {
//   if (req.user.role !== "vendor") {
//     return res
//       .status(403)
//       .json({ msg: "Access denied. Only vendors can create deals." });
//   }

//   const { itemName, targetQuantity, pricePerUnit, unit } = req.body;

//   try {
//     const newDeal = new Deal_deals({
//       itemName,
//       targetQuantity,
//       pricePerUnit,
//       unit,
//       marketArea: req.user.marketArea,
//       createdBy: req.user.id,
//     });

//     const deal = await newDeal.save();
//     res.json(deal);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// // @route   GET api/deals
// // @desc    Get all active deals for the user's market area
// // @access  Private (Vendors)
// router_deals.get("/", auth_deals, async (req, res) => {
//   if (req.user.role !== "vendor") {
//     return res.status(403).json({ msg: "Access denied." });
//   }
//   try {
//     const deals = await Deal_deals.find({
//       marketArea: req.user.marketArea,
//       status: "active",
//     }).sort({ createdAt: -1 });
//     res.json(deals);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// // @route   POST api/deals/join/:dealId
// // @desc    Join a deal
// // @access  Private (Vendors only)
// router_deals.post("/join/:dealId", auth_deals, async (req, res) => {
//   if (req.user.role !== "vendor") {
//     return res
//       .status(403)
//       .json({ msg: "Access denied. Only vendors can join deals." });
//   }

//   const { quantity } = req.body;
//   if (!quantity || quantity <= 0) {
//     return res.status(400).json({ msg: "Please provide a valid quantity." });
//   }

//   try {
//     const deal = await Deal_deals.findById(req.params.dealId);
//     if (!deal) {
//       return res.status(404).json({ msg: "Deal not found" });
//     }
//     if (deal.status !== "active") {
//       return res.status(400).json({ msg: "This deal is no longer active." });
//     }

//     const existingParticipation = await Participation_deals.findOne({
//       dealId: req.params.dealId,
//       vendorId: req.user.id,
//     });
//     if (existingParticipation) {
//       return res
//         .status(400)
//         .json({ msg: "You have already joined this deal." });
//     }

//     const participation = new Participation_deals({
//       dealId: req.params.dealId,
//       vendorId: req.user.id,
//       quantity,
//     });
//     await participation.save();

//     deal.currentQuantity += quantity;

//     if (deal.currentQuantity >= deal.targetQuantity) {
//       deal.status = "filled";
//     }

//     await deal.save();

//     res.json(deal);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// // @route   GET api/deals/my-deals
// // @desc    Get all deals a vendor has participated in
// // @access  Private (Vendors only)
// router_deals.get("/my-deals", auth_deals, async (req, res) => {
//   if (req.user.role !== "vendor") {
//     return res.status(403).json({ msg: "Access denied." });
//   }
//   try {
//     // Find all participations by the current vendor
//     const participations = await Participation_deals.find({
//       vendorId: req.user.id,
//     });

//     // Get the deal IDs from the participations
//     const dealIds = participations.map((p) => p.dealId);

//     // Find all deals that match those IDs
//     const deals = await Deal_deals.find({ _id: { $in: dealIds } }).sort({
//       updatedAt: -1,
//     });

//     res.json(deals);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// module.exports = router_deals;

const express_deals = require("express");
const router_deals = express_deals.Router();
const auth_deals = require("../middleware/auth");
const Deal_deals = require("../models/Deal");
const Participation_deals = require("../models/Participation");

// ... (POST / and GET / remain the same)
router_deals.post("/", auth_deals, async (req, res) => {
  if (req.user.role !== "vendor") {
    return res.status(403).json({ msg: "Access denied." });
  }
  const { itemName, targetQuantity, pricePerUnit, unit } = req.body;
  try {
    const newDeal = new Deal_deals({
      itemName,
      targetQuantity,
      pricePerUnit,
      unit,
      marketArea: req.user.marketArea,
      createdBy: req.user.id,
    });
    const deal = await newDeal.save();
    res.json(deal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router_deals.get("/", auth_deals, async (req, res) => {
  if (req.user.role !== "vendor") {
    return res.status(403).json({ msg: "Access denied." });
  }
  try {
    const deals = await Deal_deals.find({
      marketArea: req.user.marketArea,
      status: "active",
    }).sort({ createdAt: -1 });
    res.json(deals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ... (POST /join/:dealId remains the same)
router_deals.post("/join/:dealId", auth_deals, async (req, res) => {
  if (req.user.role !== "vendor") {
    return res.status(403).json({ msg: "Access denied." });
  }
  const { quantity } = req.body;
  if (!quantity || quantity <= 0) {
    return res.status(400).json({ msg: "Please provide a valid quantity." });
  }
  try {
    const deal = await Deal_deals.findById(req.params.dealId);
    if (!deal) return res.status(404).json({ msg: "Deal not found" });
    if (deal.status !== "active")
      return res.status(400).json({ msg: "This deal is no longer active." });
    const existingParticipation = await Participation_deals.findOne({
      dealId: req.params.dealId,
      vendorId: req.user.id,
    });
    if (existingParticipation)
      return res
        .status(400)
        .json({ msg: "You have already joined this deal." });

    const participation = new Participation_deals({
      dealId: req.params.dealId,
      vendorId: req.user.id,
      quantity,
    });
    await participation.save();
    deal.currentQuantity += quantity;
    if (deal.currentQuantity >= deal.targetQuantity) {
      deal.status = "filled";
    }
    await deal.save();
    res.json(deal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/deals/my-deals
// @desc    Get all deals a vendor has participated in (and not archived)
// @access  Private (Vendors only)
router_deals.get("/my-deals", auth_deals, async (req, res) => {
  if (req.user.role !== "vendor") {
    return res.status(403).json({ msg: "Access denied." });
  }
  try {
    const participations = await Participation_deals.find({
      vendorId: req.user.id,
    });
    const dealIds = participations.map((p) => p.dealId);

    // *** UPDATED: Filter out deals that this user has archived ***
    const deals = await Deal_deals.find({
      _id: { $in: dealIds },
      archivedBy: { $ne: req.user.id }, // $ne means "not equal to"
    }).sort({ updatedAt: -1 });

    res.json(deals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/deals/archive/:dealId
// @desc    Archive a deal for the logged-in vendor
// @access  Private (Vendors only)
router_deals.put("/archive/:dealId", auth_deals, async (req, res) => {
  if (req.user.role !== "vendor") {
    return res.status(403).json({ msg: "Access denied." });
  }
  try {
    const deal = await Deal_deals.findById(req.params.dealId);
    if (!deal) {
      return res.status(404).json({ msg: "Deal not found" });
    }
    // Add the user's ID to the archivedBy array if it's not already there
    await Deal_deals.updateOne(
      { _id: req.params.dealId },
      { $addToSet: { archivedBy: req.user.id } } // $addToSet prevents duplicates
    );
    res.json({ msg: "Deal archived successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router_deals;
