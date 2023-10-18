require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bringerRoutes = require("./routes/bringer")

// server config
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());

// routes
app.use('/api/bringer', bringerRoutes)

app.get("/", (req, res) => {
  res.send('server up')
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
