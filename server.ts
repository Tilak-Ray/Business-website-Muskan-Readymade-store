import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // AI Image Analysis Endpoint
  app.post("/api/ai/analyze-image", async (req, res) => {
    try {
      const { image } = req.body;
      if (!image) return res.status(400).json({ error: "Image data required" });

      const prompt = "Analyze this clothing product image for a boutique store named 'Muskan Readymade'. Extract: name, category (select from: Saree, Women Kurti, Lehenga, Men Shirt, Men Kurta, T-Shirt, Jackets), gender (Women, Men, Unisex), material, colors, and hashtags. Provide a professional description.";

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: {
          parts: [
            { inlineData: { mimeType: "image/jpeg", data: image } },
            { text: prompt }
          ]
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              category: { type: Type.STRING },
              gender: { type: Type.STRING },
              material: { type: Type.STRING },
              colors: { type: Type.ARRAY, items: { type: Type.STRING } },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } },
              description: { type: Type.STRING }
            },
            required: ["name", "category", "gender", "description"]
          }
        }
      });

      res.json(JSON.parse(response.text));
    } catch (error: any) {
      console.error("AI Image Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // AI Voice Description Endpoint
  app.post("/api/ai/analyze-audio", async (req, res) => {
    try {
      const { audio, image } = req.body;
      if (!audio) return res.status(400).json({ error: "Audio data required" });

      const prompt = "The user is describing a clothing product in Nepali or Hindi. Listen carefully and extract the product details. Combine this with the visual information if an image is provided. Return: name, category, gender, material, colors, hashtags, and a refined description in English.";

      const parts = [
        { inlineData: { mimeType: "audio/webm", data: audio } },
        { text: prompt }
      ];

      if (image) {
        parts.push({ inlineData: { mimeType: "image/jpeg", data: image } } as any);
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: { parts: parts as any },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              category: { type: Type.STRING },
              gender: { type: Type.STRING },
              material: { type: Type.STRING },
              colors: { type: Type.ARRAY, items: { type: Type.STRING } },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } },
              description: { type: Type.STRING }
            },
            required: ["name", "category", "description"]
          }
        }
      });

      res.json(JSON.parse(response.text));
    } catch (error: any) {
      console.error("AI Audio Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
