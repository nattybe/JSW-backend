// File: server.js
import express from "express";
import { MeiliSearch } from "meilisearch";
// import { Job } from "../db/models.js";

const app = express();
const port = 3100;

const client = new MeiliSearch({ host: "http://127.0.0.1:7700" });
const index = client.index("jobs");

app.get("/", async (req, res) => {
  const query = req.query.sq;
  try {
    const searchResults = await index.search(query);
    res.json({ request: "query",
      //  result: searchResults.hits 
      });
  } catch (error) {
    console.error("Error searching with Meilisearch:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
