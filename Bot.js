const mineflayer = require("mineflayer");
const config = require("./config.json");

function startBot() {
  const bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    version: config.version
  });

  bot.once("spawn", () => {
    console.log("✅ Bot joined the server!");
    bot.chat("Hello world!");
  });

  bot.on("chat", (username, message) => {
    if (username === bot.username) return;
    if (message === "hi") bot.chat("Hello!");
  });

  bot.on("kicked", reason => {
    console.log("❌ Kicked:", reason);
  });

  bot.on("end", () => {
    console.log("🔄 Reconnecting in 5 seconds...");
    setTimeout(startBot, 5000);
  });

  bot.on("error", err => {
    console.log("⚠️ Error:", err.message);
  });
}

startBot();
