const express = require("express");
const cors = require("cors");
const Sentiment = require("sentiment");

const app = express();
const sentiment = new Sentiment();

app.use(cors());
app.use(express.json());

app.post("/analyze", (req, res) => {
  const { text } = req.body;
  const result = sentiment.analyze(text);
  
  let sentimentType = "Neutral";
  if (result.score > 0) sentimentType = "Positive";
  else if (result.score < 0) sentimentType = "Negative";

  res.json({ score: result.score, sentiment: sentimentType });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
