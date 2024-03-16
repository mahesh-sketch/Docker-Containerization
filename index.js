import express from "express";

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  return res.json({ message: "Hey I am nodejs in container" });
});

app.listen(PORT, () => {
  console.log(`Server is listen at : ${PORT}`);
});
