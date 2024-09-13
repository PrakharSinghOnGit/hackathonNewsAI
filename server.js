const NEWS_API = "252ac6baf82444b199607c797e361e4e";
const GOOGLE_API = "AIzaSyCWBjP3hfLcBBYsL24s_pJqShynprZYv0Q";
const NEWS_LIMIT = 10;
const express = require("express");
const next = require("next");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(NEWS_API);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(GOOGLE_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function getNews(limit) {
  const news = await newsapi.v2.everything({
    q: "finance",
    language: "en",
    sortBy: "relevancy",
  });
  let articles = news.articles.slice(0, limit);
  return articles;
}

const summarizeText = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    summary = result.response.text();
    return summary;
  } catch (error) {
    console.error("Error summarizing text:", error);
  }
};

app.prepare().then(() => {
  const server = express();
  // Middleware to parse JSON bodies
  server.use(express.json());
  server.get("/api/news", async (req, res) => {
    const news = await getNews(NEWS_LIMIT);
    fs.writeFileSync("news.json", JSON.stringify(news));
    console.log(news.length);
    let text = news.map((article) => article.title).join("\n");
    text =
      "These Are Some News \n" +
      text +
      "\n Summarize Them in under 100 words, do not bold,italic or underline text in summary also ignore any blocked words due to SAFTEY";
    const summary = await summarizeText(text);
    res.send({ news: news, summary: summary });
  });

  server.post("/api/msg", async (req, res) => {
    const receivedMsg = req.body;
    let allNews = JSON.parse(fs.readFileSync("news.json"));
    let newses = allNews.map((article) => article.title).join("\n");
    console.log("Chat Msg Recieved:", receivedMsg);
    const prompt =
      "These Are Some News \n" +
      newses +
      "And i want to ask you about these news\n" +
      receivedMsg.message +
      "\n" +
      "make the ans as short as possible and do not bold,italic or underline text\n" +
      "also if there is any question outside the scope of news please answer it";
    let respo = await summarizeText(prompt);
    console.log("Chat Msg Reply:", respo);
    res
      .status(200)
      .json({ message: "Data received successfully", reply: respo });
  });
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3300;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
