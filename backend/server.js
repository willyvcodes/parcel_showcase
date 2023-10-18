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
const BEARER_TOKEN =
  "BEARER_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2NzIzMjY1NTUsImV4cCI6MTcwMzg2MjU1NSwiYXVkIjoiaHR0cHM6Ly9icmluZ2VycGFyY2VsLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNTI1eXM2YWh4d3UyIiwianRpIjoiZDdlZGE3NDgtNzMxOS00YWIzLWI2MGEtMDEzMzI0NmVkNmY2In0.uJi6d6-E2zDWj24wryh2sVWKs4ceny4QllbrHrzK5L0";

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

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
