import express from "express";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const MODEL = process.env.OPENAI_MODEL || "gpt-5.6-luna";

app.post("/api/generate", async (req, res) => {
  try {
    const { mode = "AI Chat", prompt = "" } = req.body || {};
    if (!prompt.trim()) return res.status(400).json({ error: "Prompt is required." });

    const instructions = {
      "AI Chat": "Answer the user's question clearly. Prefer Hindi when the user writes Hindi.",
      "AI Writer": "Create polished, useful writing from the user's request.",
      "Video Prompt": "Turn the idea into a detailed cinematic AI video prompt. Include scene, camera, lighting, motion, realism and aspect ratio.",
      "Image Prompt": "Turn the idea into a detailed realistic AI image prompt. Include subject, composition, lighting, camera and aspect ratio.",
      "YouTube Tools": "Create an attractive YouTube title, description, tags and hashtags for the user's topic.",
      "Translator": "Translate the user's text accurately. If no target language is specified, translate Hindi to English or English to Hindi.",
      "Summarizer": "Summarize the user's text clearly in concise bullet points."
    }[mode] || "Help the user with the request.";

    const response = await client.responses.create({
      model: MODEL,
      instructions,
      input: prompt
    });

    res.json({ output: response.output_text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed. Check your API key, billing and model access." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Narayan AI running on port ${port}`));
