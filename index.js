import express from "express";
import { MeiliSearch } from "meilisearch";

const app = express();
const port = 3100;
const gettoday = () => {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedDate = dateFormatter.format(new Date());
  return formattedDate;
};
const client = new MeiliSearch({ host: "http://127.0.0.1:7700" });
const index = client.index("jobs");

app.get("/", async (req, res) => {
  let query = req.query;
  let searchQuery = { limit: 10 };

  try {
    if (req.query.sortby) {
      searchQuery = { ...searchQuery, sort: [req.query.sortby] };
    }
    if (req.query.offset) {
      searchQuery = { ...searchQuery, offset: Number(req.query.offset) };
    }
    const searchResults = await index.search(query.sq, searchQuery);
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.json({
      request: query,
      searchQuery,
      respond: {
        estimatedTotalHits: searchResults.estimatedTotalHits,
        result: searchResults.hits,
      },
    });
  } catch (error) {
    console.error("Error searching with Meilisearch:", error);
    res.status(500).json({ error: error.message });
  }
});
app.get("/frontPagers", async (req, res) => {
  const query = req.query;
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    const searchResults = await index.search("a", {
      sort: ["unixDATE:asc"],
      limit:10,
      filter:"date = '"+gettoday()+"'",
    });
    res.json({
      todaysjob: { estimatedTotalHits:searchResults.estimatedTotalHits, count:searchResults.hits.length, items: searchResults.hits },
    });
  } catch (error) {
    console.error("Error searching with Meilisearch:", error);
    res.status(500).json({ error: error.message });
  }
  res;
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
