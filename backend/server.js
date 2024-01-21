const express = require('express')
const dotenv = require('dotenv').config()
const cors = require("cors");
const OpenAI = require('openai')
const port = process.env.PORT || 8000
const app = express()

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors());

app.get('/api/chatgpt/:prompt', async (req, res) => {
  console.log(req.params.prompt);
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: req.params.prompt }],
    model: "gpt-3.5-turbo",
  });
  
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: completion.choices[0].message.content,
    n: 1,
    size: "1024x1024",
  });
  console.log(response.data[0].url);
  
  res.status(200).json({message: response.data[0].url });
})

app.listen(port, () => console.log(`Server started on port ${port}`))
