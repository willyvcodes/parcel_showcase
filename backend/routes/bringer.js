require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const cors = require("cors");

// Random key for login
const crypto = require("crypto");
const SECRET_KEY = crypto.randomBytes(32).toString("hex");

const BRINGER_API = "https://bps.bringer.io/public/api/v2/get/parcel/tracking.json?tracking_number=";
const BEARER_TOKEN = process.env.BEARER_TOKEN

router.use(cors());

router.post("/Generate_Token", (req, res) => {
  const { login, password } = req.body;

  const accessToken = jwt.sign({ login, password }, SECRET_KEY);
  res.json({ accessToken: accessToken });
});

router.get("/Tracking_Parcel", async (req, res) => {
  const { tracking_number } = req.query;

  console.log(`Looking For: ${tracking_number}`);

  try {
    const response = await fetch(`${BRINGER_API}${tracking_number}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      res.json(data);
    } else {
      res.status(response.status).json({ error: "Failed to fetch data" });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;