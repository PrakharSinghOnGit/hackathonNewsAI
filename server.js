const express = require("express");
const next = require("next");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("252ac6baf82444b199607c797e361e4e");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
async function getNews() {
  const news = await newsapi.v2.topHeadlines({
    q: "a",
    language: "en",
    sortBy: "relevancy",
  });
  return news.articles;
}

app.prepare().then(() => {
  const server = express();

  server.get("/api/news", async (req, res) => {
    res.send(await getNews());
  });

  server.get("/api/summ", async (req, res) => {
    const news = await getNews();

    res.send(article);
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
