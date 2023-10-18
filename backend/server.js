require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

// random key for login
const crypto = require("crypto");
const SECRET_KEY = crypto.randomBytes(32).toString("hex");

// server config
const PORT = 8000;
const prefix = "/api/bringer";
const BRINGER_API =
  "https://bps.bringer.io/public/api/v2/get/parcel/tracking.json?tracking_number=";

const app = express();

app.use(express.json());
app.use(cors());

app.post(`${prefix}/Generate_Token`, (req, res) => {
  const { login, password } = req.body;

  const accessToken = jwt.sign({ login, password }, SECRET_KEY);
  res.json({ accessToken: accessToken });
});

app.get(`${prefix}/Tracking_Parcel`, async (req, res) => {
  const { tracking_number } = req.query;
  const bearer_token = process.env.BEARER_TOKEN;

  console.log(`Looking For: ${tracking_number}`);

  try {
    const response = await fetch(`${BRINGER_API}${tracking_number}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearer_token}`,
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

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
