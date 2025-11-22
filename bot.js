import TelegramBot from "node-telegram-bot-api";
import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const userText = msg.text;

  bot.sendChatAction(chatId, "typing");

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: userText,
        },
      ],
    });

    const answer = response.choices[0].message.content;
    bot.sendMessage(chatId, answer);
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, "Xatolik: AI server javob bermadi yoki API key noto‘g‘ri.");
  }
});
