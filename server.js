const express = require("express");
const next = require("next");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Chat API route for handling Gemini API interactions
  server.post("/api/chat", async (req, res) => {
    const { userMessage } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: userMessage }] },
      ],
    });

    let result = await chat.sendMessage(userMessage);
    const responseText = await result.response.text();

    res.json({ reply: responseText });
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
