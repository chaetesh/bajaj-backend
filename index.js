const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;
    if (!Array.isArray(data)) {
      throw new Error("Invalid input format");
    }
    const numbers = [];
    const alphabets = [];

    data.forEach((item) => {
      if (/^[a-zA-Z]$/.test(item)) {
        alphabets.push(item);
      } else if (!isNaN(item)) {
        numbers.push(item);
      }
    });

    const highest_alphabet = alphabets.length
      ? [
          alphabets
            .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
            .pop(),
        ]
      : [];

    const response = {
      is_success: true,
      user_id: "aetesh_ch_16062004",
      email: "aetesh_c@srmap.edu.in",
      roll_number: "AP21110010079",
      numbers,
      alphabets,
      highest_alphabet,
    };

    res.json(response);
  } catch (error) {
    res.json({
      is_success: false,
      user_id: "aetesh_ch_16062004",
      email: "aetesh_c@srmap.edu.in",
      roll_number: "AP21110010079",
      error: error.message,
    });
  }
});

// GET returning hardcoded JSON
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
