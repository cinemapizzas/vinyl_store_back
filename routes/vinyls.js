const express = require("express");
const router = express.Router();
const { VinylModel, validVinyl } = require("../models/VinylModel");
const adminAuth = require ("../middleWears/authAdmin");


router.get("/", async (req, res) => {
  try {
    const vinyls = await VinylModel.find();
    res.json(vinyls);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const vinyl = await VinylModel.findById(req.params.id);
    if (!vinyl) {
      return res.status(404).json({ err: "Vinyl not found" });
    }
    res.json(vinyl);  
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
});


router.post("/add",adminAuth, async (req, res) => {
  const { error, value } = validVinyl(req.body);
  if (error) {
    return res.status(400).json({ err: "Invalid vinyl data", details: error.details });
  }

  try {
    const newVinyl = new VinylModel(value);
    await newVinyl.save();
    res.status(201).json({ success: "Vinyl added successfully", vinyl: newVinyl });
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
});

router.put("/edit/:id", adminAuth, async (req, res) => {
  const { error, value } = validVinyl(req.body);
  if (error) {
    return res.status(400).json({ err: "Invalid vinyl data", details: error.details });
  }

  try {
    const updatedVinyl = await VinylModel.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true, runValidators: true } 
    );

    if (!updatedVinyl) {
      return res.status(404).json({ err: "Vinyl not found" });
    }

    res.json({ success: "Vinyl updated successfully", vinyl: updatedVinyl });
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedVinyl = await VinylModel.findByIdAndDelete(req.params.id);
    if (!deletedVinyl) {
      return res.status(404).json({ err: "Vinyl not found" });
    }
    res.json({ success: "Vinyl deleted successfully", vinyl: deletedVinyl });
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
});



module.exports = router;
