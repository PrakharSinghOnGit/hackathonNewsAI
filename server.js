const express = require("express");
const next = require("next");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("252ac6baf82444b199607c797e361e4e");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/api/news", async (req, res) => {
    const news = await newsapi.v2.topHeadlines({
      q: "a",
      language: "en",
      sortBy: "relevancy",
    });
    res.send(news.articles);
  });

  // Handle all other Next.js pages
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
