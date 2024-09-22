const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Buffer } = require("buffer");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.post("/bfhl", (req, res) => {
  try {
    const { data, file_b64 } = req.body;

    // Validate input data
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

    const highest_alphabet =
      alphabets
        .filter((item) => /^[a-z]$/.test(item))
        .sort()
        .pop() || null;

    // Handle file processing
    let file_valid = false;
    let file_mime_type = null;
    let file_size_kb = null;

    if (file_b64) {
      const fileBuffer = Buffer.from(file_b64, "base64");
      file_size_kb = (fileBuffer.length / 1024).toFixed(2); // Size in KB

      // Determine MIME type from the first bytes (this is basic, use 'mime' lib for better detection)
      if (file_b64.startsWith("/9j/")) {
        file_mime_type = "image/jpeg";
        file_valid = true;
      } else if (file_b64.startsWith("iVBORw0KGgo")) {
        file_mime_type = "image/png";
        file_valid = true;
      } 
      else if (file_b64.startsWith("JVBER") || file_b64.startsWith("0x25PDF")) {
        file_mime_type = "doc/pdf";
        file_valid = true;
      }
      else {
        file_valid = false;
      }
    }

    const response = {
      is_success: true,
      user_id: "aetesh_ch_16062004",
      email: "aetesh_c@srmap.edu.in",
      roll_number: "AP21110010079",
      numbers,
      alphabets,
      highest_alphabet: highest_alphabet
        ? [highest_alphabet]
        : [],
      file_valid,
      file_mime_type,
      file_size_kb,
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
app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
