const axios = require('axios');
const path = require('path');
const fs = require('fs');

module.exports.config = {
    name: 'imagine',
    version: '1.0.0',
    role: 0,
    description: "This command allows to create images based on user prompts ",
    usage: "${prefix} [prompt]",
    credits: 'ArYAM',
    cooldown: 0,
	  hasPrefix: true,
};

  module.exports.run = async function({ message, args, event }) {
    const text = args.join(" ");
    if (!text) {
      return message.reply("⛔ Invalid Usage\n━━━━━━━━━━━━━━━\n\nPlease provide a prompt.");
    }

    let prompt = text;

    try {
      message.reply("✅| Creating your Imagination...").then((info) => { id = info.messageID });

      const API = `https://aryan-apis.onrender.com/api/midjourney?prompt=${encodeURIComponent(prompt)}&key=loveyou`;
      const imageStream = await global.utils.getStreamFromURL(API);

      return message.reply({
        body: `🖼️ 𝗠𝗶𝗱𝗷𝗼𝘂𝗿𝗻𝗲𝘆\n━━━━━━━━━━━━━━━\n\nHere is your created image.`,
        attachment: imageStream
      });
    } catch (error) {
      console.error(error);
      message.reply("Failed to generate your imagination.");
    }
  }
};
